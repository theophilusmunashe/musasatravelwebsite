"use server";

import { Resend } from "resend";
import { validateString, getErrorMessage } from "../lib/utils";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");
  const firstName = formData.get("firstName");
  const phoneNumber = formData.get("phoneNumber");

  if (!validateString(senderEmail, 500)) {
    return { error: "Invalid sender email" };
  }
  if (!validateString(message, 5000)) {
    return { error: "Invalid message" };
  }
  if (!validateString(firstName, 500)) {
    return { error: "Invalid name" };
  }
  if (!validateString(phoneNumber, 500)) {
    return { error: "Invalid phone number" };
  }

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:32px;border-radius:8px;">
      <div style="background:#1a1a1a;padding:24px;border-radius:8px;margin-bottom:24px;">
        <h1 style="color:#f59e0b;margin:0;font-size:22px;">Musasa Travel & Tours</h1>
        <p style="color:#ffffff80;margin:4px 0 0;font-size:13px;">New Contact Form Enquiry</p>
      </div>
      <div style="background:#ffffff;padding:24px;border-radius:8px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;font-size:13px;width:130px;">Name</td>
            <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;font-weight:600;">${firstName}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;font-size:13px;">Email</td>
            <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;">${senderEmail}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;font-size:13px;">Phone</td>
            <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;">${phoneNumber}</td>
          </tr>
        </table>
        <div style="margin-top:20px;">
          <p style="color:#666;font-size:13px;margin-bottom:8px;">Message</p>
          <p style="font-size:14px;line-height:1.6;color:#111;background:#f5f5f5;padding:16px;border-radius:6px;margin:0;">${message}</p>
        </div>
      </div>
      <p style="text-align:center;color:#999;font-size:12px;margin-top:24px;">
        This message was sent from the contact form on musasatravelandtours.com
      </p>
    </div>
  `;

  let data;
  try {
    data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "info@musasatravel.com",
      subject: `New enquiry from ${firstName}`,
      reply_to: senderEmail as string,
      html,
    });
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }

  return { data };
};
