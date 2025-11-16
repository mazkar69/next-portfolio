import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create a transporter (replace with your actual SMTP credentials later)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Replace with your SMTP host
      // port: 587,
      // secure: false, // true for 465, false for other ports
      auth: {
        user: "dev.azkaar@gmail.com", // Replace with your email
        pass: "nlet fnht amfb yvid", // Replace with your password or app password
      },
    })

    // Email to site owner
    await transporter.sendMail({
      from: '"Portfolio Contact" <dev.azkaar@gmail.com>',
      to: "dev.azkaar@gmail.com",
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    // Confirmation email to user
    await transporter.sendMail({
      from: '"Mohd Azkar" <your-email@gmail.com>',
      to: email,
      subject: "Thank you for contacting me",
      html: `
      <h1>Thank you for reaching out!</h1>
      <p>Hello ${name},</p>
      <p>Thanks for reaching out! I'll get in touch with you shortly.</p>
      <p>Here's a summary of your message:</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <p>Best regards,</p>
      <p>Mohd Azkar<br>Full Stack Developer<br>Delhi<br>Phone: +91 8840375826</p>
      `,
    })

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
