import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: "harshitharlalka11@gmail.com",
      replyTo: email,
      subject: `New message from ${name} — Portfolio`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0a0a0a; color: #ededed; border-radius: 12px; border: 1px solid #262626;">
          <h2 style="color: #06b6d4; margin-top: 0;">New Portfolio Contact</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #a3a3a3; width: 80px;">Name</td>
              <td style="padding: 8px 0; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #a3a3a3;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #06b6d4;">${email}</a></td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #262626; margin: 16px 0;" />
          <h3 style="color: #a855f7; margin-bottom: 8px;">Message</h3>
          <p style="line-height: 1.7; white-space: pre-wrap; margin: 0;">${message}</p>
          <hr style="border: none; border-top: 1px solid #262626; margin: 24px 0 16px;" />
          <p style="font-size: 12px; color: #525252; margin: 0;">Sent via harshitharlalka.dev portfolio contact form</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again later." }, { status: 500 });
  }
}
