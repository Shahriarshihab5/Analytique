import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { referenceId, name, email, company, serviceId, budget, timeline, description } = body;

    // Send instant email via free Web3Forms API to analytique.team@gmail.com
    // Using standard free endpoint with zero API key requirement
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "3c3ef940-0257-46e3-85bb-bb8bb4129df4", // Free Web3forms public access key
        subject: `New Project Quote [${referenceId}] from ${name}`,
        from_name: "Analytique Platform",
        email: email,
        message: `
NEW CLIENT QUOTE RECEIVED:
------------------------------------
Reference ID: ${referenceId}
Client Name: ${name}
Client Email: ${email}
Company: ${company || "Not specified"}
Service: ${serviceId}
Budget: ${budget}
Timeline: ${timeline}

Project Brief & Details:
${description}
------------------------------------
Sent automatically to analytique.team@gmail.com
        `,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Email dispatch note:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

