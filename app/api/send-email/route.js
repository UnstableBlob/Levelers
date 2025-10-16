import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { userEmail, userName, projectName, serviceType } = await request.json();

    // Configure nodemailer with Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail App Password
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Levelers" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: 'Thank You for Your Request - Levelers',
      html: generateEmailHTML(userName, projectName, serviceType),
      text: generateEmailText(userName, projectName, serviceType),
    });

    console.log('Email sent successfully to:', userEmail);

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

function generateEmailHTML(userName, projectName, serviceType) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You - Levelers</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table role="presentation" style="width: 600px; max-width: 90%; background-color: #ffffff; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <tr>
                <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #3B82F6 0%, #A855F7 100%); border-radius: 20px 20px 0 0;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">
                    🎉 Thank You!
                  </h1>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding: 40px;">
                  <h2 style="color: #1f2937; font-size: 24px; margin: 0 0 20px;">
                    Hi ${userName || 'there'}! 👋
                  </h2>
                  
                  <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                    Thank you for choosing <strong style="color: #3B82F6;">Levelers</strong> for your project! We're excited to help bring your vision to life.
                  </p>

                  <div style="background: linear-gradient(135deg, #EEF2FF 0%, #F3E8FF 100%); border-left: 4px solid #3B82F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin: 0 0 10px; color: #1f2937; font-size: 18px;">Request Details</h3>
                    <p style="margin: 5px 0; color: #4b5563;">
                      <strong>Project:</strong> ${projectName}
                    </p>
                    <p style="margin: 5px 0; color: #4b5563;">
                      <strong>Service:</strong> ${serviceType}
                    </p>
                  </div>

                  <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 20px 0;">
                    Your request has been successfully submitted and stored in our database. Our team will review your project details and get in touch with you shortly.
                  </p>

                  <h3 style="color: #1f2937; font-size: 20px; margin: 30px 0 15px;">
                    What happens next? 🚀
                  </h3>

                  <ul style="color: #4b5563; font-size: 15px; line-height: 1.8; padding-left: 20px;">
                    <li>Our team will review your requirements within 24 hours</li>
                    <li>We'll schedule an initial consultation to discuss your project</li>
                    <li>You'll receive a detailed proposal with timeline and pricing</li>
                    <li>We'll work together to bring your ideas to reality!</li>
                  </ul>

                  <div style="text-align: center; margin: 40px 0 20px;">
                    <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://levelers.com'}" 
                       style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #3B82F6 0%, #A855F7 100%); color: #ffffff; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);">
                      Visit Our Website
                    </a>
                  </div>

                  <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 30px 0 0; border-top: 1px solid #e5e7eb; padding-top: 20px;">
                    If you have any questions in the meantime, feel free to reply to this email or contact us directly.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 30px 40px; background-color: #f9fafb; text-align: center; border-radius: 0 0 20px 20px;">
                  <p style="margin: 0 0 10px; color: #1f2937; font-weight: bold; font-size: 18px;">
                    Levelers
                  </p>
                  <p style="margin: 0; color: #6b7280; font-size: 14px;">
                    Turning inspiration into seamless, brilliant execution.
                  </p>
                  <p style="margin: 15px 0 0; color: #9ca3af; font-size: 12px;">
                    © ${new Date().getFullYear()} Levelers. All rights reserved.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

function generateEmailText(userName, projectName, serviceType) {
  return `
Hi ${userName || 'there'}!

Thank you for choosing Levelers for your project!

REQUEST DETAILS
---------------
Project: ${projectName}
Service: ${serviceType}

Your request has been successfully submitted. Our team will review your project details and get in touch with you shortly.

WHAT HAPPENS NEXT
-----------------
- Our team will review your requirements within 24 hours
- We'll schedule an initial consultation to discuss your project
- You'll receive a detailed proposal with timeline and pricing
- We'll work together to bring your ideas to reality!

If you have any questions, feel free to reply to this email.

Best regards,
The Levelers Team

---
Levelers - Turning inspiration into seamless, brilliant execution.
© ${new Date().getFullYear()} Levelers. All rights reserved.
  `;
}
