import { NextRequest, NextResponse } from "next/server";

/**
 * Optional API route for contact form submission.
 * Enable by setting env: EMAIL_SERVER_HOST, EMAIL_SERVER_USER, EMAIL_SERVER_PASS (or use a transactional email provider).
 * If not configured, the form uses mailto: by default.
 */
export async function POST(request: NextRequest) {
  const host = process.env.EMAIL_SERVER_HOST;
  const user = process.env.EMAIL_SERVER_USER;
  const pass = process.env.EMAIL_SERVER_PASS;

  if (!host || !user || !pass) {
    return NextResponse.json(
      { error: "Contact form is not configured; use mailto." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { name, phone, message } = body as { name?: string; phone?: string; message?: string };

    if (!name?.trim() || !phone?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Missing required fields: name, phone, message" },
        { status: 400 }
      );
    }

    // Template: integrate nodemailer or your provider here.
    // Example with nodemailer (add "nodemailer" to package.json if using):
    // const transporter = nodemailer.createTransport({ host, port: 587, secure: false, auth: { user, pass } });
    // await transporter.sendMail({ from: user, to: process.env.CONTACT_EMAIL ?? user, subject: `פניה מאתר – ${name}`, text: `שם: ${name}\nטלפון: ${phone}\n\n${message}` });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
