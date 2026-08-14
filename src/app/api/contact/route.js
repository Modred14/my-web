import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name and message are required." },
        { status: 400 },
      );
    }

    await resend.emails.send({
      from: "Modred.dev <onboarding@resend.dev>", // swap to your verified domain sender later
      to: "favourdomirin@gmail.com",
      replyTo: email?.trim() || undefined,
      subject: `New message from ${name}`,
      text: `From: ${name}${email ? ` <${email}>` : ""}\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}