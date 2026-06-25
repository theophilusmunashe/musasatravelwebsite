import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import type { Transporter, SentMessageInfo } from 'nodemailer';
import { SITE_ENQUIRIES_EMAIL, SITE_NAME, SITE_URL } from '@/lib/site';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const activitiesList = Array.isArray(formData.activities)
      ? formData.activities.filter(Boolean).join(", ")
      : formData.activities || "None";
    const intentLine = formData.intent
      ? `<div class="field"><span class="label">Intent:</span><span class="value">${formData.intent}</span></div>`
      : "";
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Booking Request - ${SITE_NAME}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #F59E0B; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #1f2937; }
          .value { color: #4b5563; margin-left: 10px; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🏡 New Booking Request - ${SITE_NAME}</h1>
          <p>Private Estate Enquiry</p>
        </div>
        
        <div class="content">
          ${intentLine}
          <div class="field">
            <span class="label">🎯 Service:</span>
            <span class="value">${formData.service || "—"}</span>
          </div>
          
          <div class="field">
            <span class="label">🏨 Space / accommodation:</span>
            <span class="value">${formData.accommodation || "—"}</span>
          </div>
          
          <div class="field">
            <span class="label">🎪 Event / activities:</span>
            <span class="value">${activitiesList}</span>
          </div>
          
          <div class="field">
            <span class="label">👥 Tour Guide:</span>
            <span class="value">${formData.tourGuide}</span>
          </div>
          
          <div class="field">
            <span class="label">🚗 Transfers:</span>
            <span class="value">${formData.transfers}</span>
          </div>
          
          <div class="field">
            <span class="label">📅 Travel Dates:</span>
            <span class="value">${formData.startDate} to ${formData.endDate}</span>
          </div>
          
          <div class="field">
            <span class="label">👤 Number of Travelers:</span>
            <span class="value">${formData.travelers}</span>
          </div>
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <h3 style="color: #1f2937; margin-bottom: 15px;">📞 Contact Information</h3>
          
          <div class="field">
            <span class="label">Name:</span>
            <span class="value">${formData.firstName} ${formData.lastName}</span>
          </div>
          
          <div class="field">
            <span class="label">Email:</span>
            <span class="value">${formData.email}</span>
          </div>
          
          <div class="field">
            <span class="label">Phone:</span>
            <span class="value">${formData.phone}</span>
          </div>
          
          <div class="field">
            <span class="label">Special Requests:</span>
            <span class="value">${formData.specialRequests || 'None'}</span>
          </div>
        </div>
        
        <div class="footer">
          <p>This booking request was submitted on ${new Date().toLocaleString()}</p>
          <p>📍 Private Estate | 🌍 ${SITE_URL.replace(/^https?:\/\//, "")}</p>
        </div>
      </body>
      </html>
    `;

    // Plain text version for email clients that don't support HTML
    const textContent = `
      NEW BOOKING REQUEST - ${SITE_NAME.toUpperCase()}
      
      Service: ${formData.service || "—"}
      Space: ${formData.accommodation || "—"}
      Event / activities: ${activitiesList}
      Tour Guide: ${formData.tourGuide}
      Transfers: ${formData.transfers}
      
      Travel Dates: ${formData.startDate} to ${formData.endDate}
      Number of Travelers: ${formData.travelers}
      
      Contact Information:
      Name: ${formData.firstName} ${formData.lastName}
      Email: ${formData.email}
      Phone: ${formData.phone}
      
      Special Requests:
      ${formData.specialRequests || 'None'}
      
      ---
      This booking request was submitted on ${new Date().toLocaleString()}
      📍 Private Estate | 🌍 ${SITE_URL.replace(/^https?:\/\//, "")}
    `;

    // Configure nodemailer transporter with enhanced settings
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || 'your-email@gmail.com',
        pass: process.env.SMTP_PASS || 'your-app-password',
      },
      // Add these settings for better deliverability
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 60000,
      greetingTimeout: 30000,
      socketTimeout: 60000,
    });

    // Enhanced email options with proper headers
    const mailOptions: nodemailer.SendMailOptions = {
      from: {
        name: SITE_NAME,
        address: process.env.SMTP_FROM || SITE_ENQUIRIES_EMAIL
      },
      to: SITE_ENQUIRIES_EMAIL,
      subject: `New Booking Request - ${formData.firstName} ${formData.lastName}`,
      text: textContent,
      html: htmlContent,
      // Add headers to improve deliverability
      headers: {
        'X-Priority': '3',
        'X-Mailer': `${SITE_NAME} Booking System`,
        'Reply-To': formData.email,
        'List-Unsubscribe': `<mailto:unsubscribe@${SITE_ENQUIRIES_EMAIL.split('@')[1]}>`,
        'Organization': SITE_NAME,
        'Content-Type': 'text/html; charset=UTF-8'
      }
    };

    // Send email
    const result = await transporter.sendMail(mailOptions);

    console.log(`Booking email sent successfully to ${SITE_ENQUIRIES_EMAIL}`);
    console.log('Message ID:', result.messageId);
    console.log('Form data:', formData);

    return NextResponse.json({ 
      success: true, 
      message: 'Booking request received successfully',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Error sending booking:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process booking request' },
      { status: 500 }
    );
  }
}
