import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, city, category, description, hp } = body;

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
      city: city ? String(city).trim().slice(0, 50) : "",
      category: category ? String(category).trim().slice(0, 50) : "",
      description: description ? String(description).trim().slice(0, 1000) : "",
      timestamp: new Date().toISOString(),
    };

    // Log the request to server console (placeholder until email service like Resend/SendGrid is attached)
    console.log("----------------------------------------");
    console.log("NEW QUOTE REQUEST RECEIVED:");
    console.log(JSON.stringify(sanitizedData, null, 2));
    console.log("----------------------------------------");

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
