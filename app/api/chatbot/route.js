import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.NEXT_GROQ_KEY });

// Chatbot features
const FEATURES = [
  {
    name: "Service Guidance & FAQs",
    description:
      "Provide immediate, automated answers to common questions about your services, pricing, and process, so visitors don’t get lost or leave the site without finding answers.",
  },
  {
    name: "Lead Capture & Booking",
    description:
      "Collect basic details from interested businesses, qualify leads, and let them request consultations, quotes, or demo bookings directly through the chatbot, integrating these with your CRM or email notifications.",
  },
  {
    name: "Instant Support",
    description:
      "Offer friendly real-time help for onboarding questions, payment/process issues, or tech support; escalate to a human if the question is complex.",
  },
  {
    name: "Payment & Checkout Assistance",
    description:
      "Guide clients through payment steps, Razorpay checkout links, and explain payment statuses directly in the chat, reducing cart abandonment or confusion.",
  },
  {
    name: "Follow-ups & Feedback",
    description:
      "After a project/service, automatically collect feedback, reviews, and follow-up requests for continued engagement.",
  },
];

export async function POST(req) {
  try {
    const { messages, feature } = await req.json();
  let systemPrompt = "You are a helpful business chatbot. Reply in only 2-3 lines, extremely concise, and keep your answers short and to the point.";
    if (feature) {
      const selected = FEATURES.find(f => f.name === feature);
      if (selected) {
        systemPrompt += ` Focus on: ${selected.description}`;
      }
    }
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      model: "openai/gpt-oss-20b",
    });
    return new Response(
      JSON.stringify({
        content: chatCompletion.choices[0]?.message?.content || "",
        feature,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export function GET() {
  return new Response(
    JSON.stringify({ features: FEATURES }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
