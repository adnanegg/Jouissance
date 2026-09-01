import { NextResponse } from "next/server";
import { sendLeadNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, city, category, description, locale, hp } = body;

    // Honeypot check: if honeypot field is filled, pretend success without doing anything
    if (hp) {
      return NextResponse.json({ success: true, message: "Request received" });
    }

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Phone number is required" },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: name.trim().slice(0, 100),
      phone: phone.trim().slice(0, 30),
      email: email ? String(email).trim().slice(0, 100) : "",
      city: city ? String(city).trim().slice(0, 50) : "",
      category: category ? String(category).trim().slice(0, 50) : "",
      description: description ? String(description).trim().slice(0, 1000) : "",
      locale: locale || "fr",
      timestamp: new Date().toISOString(),
    };

    // Send notification email
    await sendLeadNotification(sanitizedData);

    return NextResponse.json({
      success: true,
      message: "Quote request received successfully",
    });
  } catch (error) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
