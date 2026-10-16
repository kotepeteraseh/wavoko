import { NextResponse } from "next/server";

const MAX_REQUEST_BYTES = 32_000;
const MAX_MESSAGES = 16;
const MAX_MESSAGE_LENGTH = 2_000;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) return false;
  const message = value as Record<string, unknown>;
  return (
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string" &&
    message.content.trim().length > 0 &&
    message.content.length <= MAX_MESSAGE_LENGTH
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Wavoko Assist is not configured yet. Please contact our team for help." },
      { status: 503 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ error: "This message is too large. Please shorten it and try again." }, { status: 413 });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ error: "The chat request could not be read." }, { status: 400 });
  }
  if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ error: "This message is too large. Please shorten it and try again." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "The chat request was not valid JSON." }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !Array.isArray((body as Record<string, unknown>).messages)
  ) {
    return NextResponse.json({ error: "Send a conversation message to continue." }, { status: 400 });
  }

  const messages: unknown[] = (body as { messages: unknown[] }).messages;
  if (
    messages.length === 0 ||
    messages.length > MAX_MESSAGES ||
    !messages.every(isChatMessage)
  ) {
    return NextResponse.json(
      { error: `Send between 1 and ${MAX_MESSAGES} messages, each no longer than ${MAX_MESSAGE_LENGTH} characters.` },
      { status: 400 },
    );
  }

  let upstream: Response;
  try {
    upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        max_tokens: 700,
        messages: [
          {
            role: "system",
            content: [
              "You are Wavoko Assist, the helpful website assistant for Wavoko.",
              "Answer clearly and concisely about Wavoko and its informational website.",
              "Wavoko Solutions includes WECOAPPLY career guidance and WeWork office spaces available to rent.",
              "Wavoko Talent provides employer-focused hiring information.",
              "Wavoko Finance shares information about cross-border transfers and saving; regulated financial services are provided by licensed partners.",
              "Wavoko's contact page lets visitors choose a service and send an enquiry.",
              "Do not invent company facts, client testimonials, user counts, prices, office locations, availability, guarantees, or financial outcomes.",
              "Do not give financial, legal, or employment guarantees. For specific or personal matters, suggest contacting Wavoko through the Contact page.",
              "Never claim you have taken an action, submitted a form, or contacted a person.",
            ].join(" "),
          },
          ...messages,
        ],
      }),
      signal: AbortSignal.timeout(30_000),
    });
  } catch (error) {
    console.error("Wavoko Assist provider request failed:", error);
    return NextResponse.json(
      { error: "Wavoko Assist couldn't connect right now. Please try again in a moment." },
      { status: 502 },
    );
  }

  if (!upstream.ok) {
    console.error(`Wavoko Assist provider returned HTTP ${upstream.status}.`);
    return NextResponse.json(
      { error: "Wavoko Assist is temporarily unavailable. Please try again later." },
      { status: 502 },
    );
  }

  let responseBody: unknown;
  try {
    responseBody = await upstream.json();
  } catch {
    console.error("Wavoko Assist provider returned an invalid response.");
    return NextResponse.json(
      { error: "Wavoko Assist received an unexpected response. Please try again." },
      { status: 502 },
    );
  }

  const reply = getReply(responseBody);

  if (!reply) {
    console.error("Wavoko Assist provider response did not include a chat message.");
    return NextResponse.json(
      { error: "Wavoko Assist couldn't prepare a reply. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ reply });
}

function getReply(value: unknown): string {
  if (typeof value !== "object" || value === null || !("choices" in value) || !Array.isArray(value.choices)) {
    return "";
  }
  const choice = value.choices[0];
  if (typeof choice !== "object" || choice === null || !("message" in choice)) return "";
  const message = choice.message;
  if (typeof message !== "object" || message === null || !("content" in message)) return "";
  return typeof message.content === "string" ? message.content.trim() : "";
}
