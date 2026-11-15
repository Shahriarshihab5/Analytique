import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { referenceId, name, email, company, serviceId, budget, timeline, description } = body;

    // Resend direct API call or Web3forms authenticated backup
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        apikey: "f725ce7a-5b65-4f4b-8a7e-128b5e2825c4",
        to: "analytique.team@gmail.com",
        from_name: "Analytique Platform Client Quote",
        subject: `New Lead: [${referenceId}] from ${name}`,
        name: name,
        email: email,
        company: company || "N/A",
        service: serviceId,
        budget: budget,
        timeline: timeline,
        message: description,
      }),
    });

    const data = await res.json();
    return NextResponse.json({ success: true, result: data });
  } catch (error: any) {
    console.error("API quote error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
