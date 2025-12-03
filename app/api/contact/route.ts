import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // Create reusable SMTP transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to YOU (admin)
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `📩 New Message from ${name}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr />
        <small>Sent from your portfolio website.</small>
      `,
    });

    // Auto-reply to USER
    await transporter.sendMail({
      from: `"Krunal Baldha" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thanks for reaching out, ${name}!`,
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for contacting me!</p>
        <p>I’ve received your message and will get back to you as soon as possible.</p>

        <h4>Your Message:</h4>
        <p>${message}</p>

        <br/>
        <p>Warm regards,</p>
        <strong>Krunal Baldha</strong>
        <br/>
        <small>Product Manager</small>
      `,
    });

    return NextResponse.json(
      { message: "Your message has been sent! Please check your inbox." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Email Error:", error);
    return NextResponse.json(
      {
        message: "Failed to send email.",
        error: error.message || error,
      },
      { status: 500 }
    );
  }
}
