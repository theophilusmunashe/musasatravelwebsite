<?php

function musasa_config()
{
    static $config = null;
    if ($config !== null) {
        return $config;
    }
    $path = __DIR__ . "/mail-config.php";
    if (!is_file($path)) {
        musasa_json(503, ["ok" => false, "error" => "Mail is not configured on this server."]);
    }
    $config = require $path;
    return $config;
}

function musasa_json($status, $payload)
{
    http_response_code($status);
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode($payload);
    exit;
}

function musasa_read_json()
{
    if (($_SERVER["REQUEST_METHOD"] ?? "") !== "POST") {
        musasa_json(405, ["ok" => false, "error" => "Method not allowed"]);
    }
    $raw = file_get_contents("php://input");
    $body = json_decode($raw ?: "null", true);
    if (!is_array($body)) {
        musasa_json(400, ["ok" => false, "error" => "Invalid JSON"]);
    }
    return $body;
}

function musasa_h($value)
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
}

function musasa_send_resend($to, $subject, $html, $replyTo = null)
{
    $config = musasa_config();
    $key = $config["resend_key"] ?? "";
    if ($key === "") {
        musasa_json(503, ["ok" => false, "error" => "Email is not configured (missing RESEND_API_KEY)."]);
    }
    $from = $config["resend_from"] ?? "Musasa Travel <onboarding@resend.dev>";
    $payload = [
        "from" => $from,
        "to" => [$to],
        "subject" => $subject,
        "html" => $html,
    ];
    if ($replyTo) {
        $payload["reply_to"] = $replyTo;
    }

    $ch = curl_init("https://api.resend.com/emails");
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => [
            "Authorization: Bearer " . $key,
            "Content-Type: application/json",
        ],
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 20,
    ]);
    $response = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err = curl_error($ch);
    curl_close($ch);

    if ($response === false) {
        musasa_json(502, ["ok" => false, "error" => "Could not reach Resend: " . $err]);
    }
    $json = json_decode($response, true);
    if ($code < 200 || $code >= 300) {
        $msg = is_array($json) && isset($json["message"]) ? $json["message"] : "Resend rejected the send.";
        musasa_json(502, ["ok" => false, "error" => $msg]);
    }
    return $json["id"] ?? "ok";
}

function musasa_handle_contact()
{
    $body = musasa_read_json();
    $firstName = trim((string) ($body["firstName"] ?? ""));
    $senderEmail = trim((string) ($body["senderEmail"] ?? ""));
    $phoneNumber = trim((string) ($body["phoneNumber"] ?? ""));
    $message = trim((string) ($body["message"] ?? ""));
    if ($firstName === "" || $senderEmail === "" || $phoneNumber === "" || $message === "") {
        musasa_json(400, ["ok" => false, "error" => "Please fill in all fields."]);
    }
    $config = musasa_config();
    $to = $config["contact_to"] ?? "info@musasatravel.com";
    $html =
        '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px">' .
        "<h1>New contact enquiry</h1>" .
        "<p><strong>Name:</strong> " . musasa_h($firstName) . "</p>" .
        "<p><strong>Email:</strong> " . musasa_h($senderEmail) . "</p>" .
        "<p><strong>Phone:</strong> " . musasa_h($phoneNumber) . "</p>" .
        "<p><strong>Message:</strong><br>" . nl2br(musasa_h($message)) . "</p>" .
        "</div>";
    musasa_send_resend($to, "New enquiry from " . $firstName, $html, $senderEmail);
    musasa_json(200, ["ok" => true]);
}

function musasa_kv_table($rows)
{
    $html = '<table style="width:100%;border-collapse:collapse">';
    foreach ($rows as $label => $value) {
        if ($value === "" || $value === null) {
            continue;
        }
        $html .=
            '<tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#666;width:160px">' .
            musasa_h($label) .
            '</td><td style="padding:8px 0;border-bottom:1px solid #eee">' .
            musasa_h(is_array($value) ? implode(", ", $value) : $value) .
            "</td></tr>";
    }
    return $html . "</table>";
}

function musasa_handle_enquiry()
{
    $body = musasa_read_json();
    $form = is_array($body["formData"] ?? null) ? $body["formData"] : [];
    $cart = is_array($body["cartItems"] ?? null) ? $body["cartItems"] : [];
    $name = trim(($form["firstName"] ?? "") . " " . ($form["lastName"] ?? ""));
    $email = trim((string) ($form["email"] ?? ""));
    $lines = [];
    foreach ($cart as $item) {
        if (!is_array($item)) {
            continue;
        }
        $lines[] =
            ($item["name"] ?? "Item") .
            " × " .
            ($item["quantity"] ?? 1) .
            " (" .
            ($item["price"] ?? "") .
            ")";
    }
    $html =
        '<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:24px">' .
        "<h1>New booking enquiry</h1>" .
        musasa_kv_table([
            "Name" => $name,
            "Email" => $email,
            "Phone" => $form["phone"] ?? "",
            "Dates" => trim(($form["startDate"] ?? "") . " to " . ($form["endDate"] ?? "")),
            "Travelers" => $form["travelers"] ?? "",
            "Cart" => $lines ? implode("; ", $lines) : "None",
            "Requests" => $form["specialRequests"] ?? "",
        ]) .
        "</div>";
    $config = musasa_config();
    $to = $config["bookings_to"] ?? "bookings@musasatravel.com";
    $id = musasa_send_resend(
        $to,
        "New booking enquiry" . ($name !== "" ? " — " . $name : ""),
        $html,
        $email ?: null
    );
    musasa_json(200, ["ok" => true, "provider" => "resend", "id" => $id]);
}

function musasa_handle_quick_book()
{
    $body = musasa_read_json();
    $name = trim(($body["firstName"] ?? "") . " " . ($body["lastName"] ?? ""));
    $email = trim((string) ($body["email"] ?? ""));
    $html =
        '<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;padding:24px">' .
        "<h1>Accommodation booking request</h1>" .
        musasa_kv_table([
            "Accommodation" => $body["accommodation"] ?? "",
            "Price" => $body["price"] ?? "",
            "Check-in" => $body["checkIn"] ?? "",
            "Check-out" => $body["checkOut"] ?? "",
            "Guests" => $body["guests"] ?? "",
            "Name" => $name,
            "Email" => $email,
            "Phone" => $body["phone"] ?? "",
        ]) .
        "</div>";
    $config = musasa_config();
    $to = $config["enquiries_to"] ?? "enquiries@musasatravel.com";
    musasa_send_resend(
        $to,
        "New booking request" . ($name !== "" ? " — " . $name : ""),
        $html,
        $email ?: null
    );
    musasa_json(200, ["ok" => true, "success" => true]);
}
