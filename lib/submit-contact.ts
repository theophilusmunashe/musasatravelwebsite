export type ContactPayload = {
  firstName: string;
  senderEmail: string;
  phoneNumber: string;
  message: string;
};

export async function submitContact(
  payload: ContactPayload
): Promise<{ error?: string }> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    let json: { ok?: boolean; error?: string } = {};
    try {
      json = await res.json();
    } catch {
      json = {};
    }
    if (!res.ok || json.ok === false) {
      return { error: json.error || "Failed to send message" };
    }
    return {};
  } catch {
    return { error: "Network error while sending message" };
  }
}
