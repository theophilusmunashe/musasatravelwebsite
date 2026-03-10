import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import type { Transporter, SentMessageInfo } from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Create HTML email content for better deliverability
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Booking Request - Musasa Travel</title>
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
          <h1>🦁 New Booking Request - Musasa Travel</h1>
          <p>African Adventure Under Our Canopy</p>
        </div>
        
        <div class="content">
          <div class="field">
            <span class="label">🎯 Service:</span>
            <span class="value">${formData.service}</span>
          </div>
          
          <div class="field">
            <span class="label">🏨 Accommodation:</span>
            <span class="value">${formData.accommodation}</span>
          </div>
          
          <div class="field">
            <span class="label">🎪 Activities:</span>
            <span class="value">${formData.activities.join(', ')}</span>
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
          <p>📍 Victoria Falls, Zimbabwe | 🌍 musasatravel.com</p>
        </div>
      </body>
      </html>
    `;

    // Plain text version for email clients that don't support HTML
    const textContent = `
      NEW BOOKING REQUEST - MUSASA TRAVEL
      
      Service: ${formData.service}
      Accommodation: ${formData.accommodation}
      Activities: ${formData.activities.join(', ')}
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
      📍 Victoria Falls, Zimbabwe | 🌍 musasatravel.com
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
        name: 'Musasa Travel',
        address: process.env.SMTP_FROM || 'enquiries@musasatravel.com'
      },
      to: 'enquiries@musasatravel.com',
      subject: `New Booking Request - ${formData.firstName} ${formData.lastName}`,
      text: textContent,
      html: htmlContent,
      // Add headers to improve deliverability
      headers: {
        'X-Priority': '3',
        'X-Mailer': 'Musasa Travel Booking System',
        'Reply-To': formData.email,
        'List-Unsubscribe': '<mailto:unsubscribe@musasatravel.com>',
        'Organization': 'Musasa Travel',
        'Content-Type': 'text/html; charset=UTF-8'
      }
    };

    // Send email
    const result = await transporter.sendMail(mailOptions);

    console.log('Booking email sent successfully to enquiries@musasatravel.com');
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
