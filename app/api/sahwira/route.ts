import { NextRequest, NextResponse } from "next/server";
import { runSahwiraFlow } from "@/lib/sahwira-flow";
import {
  SAHWIRA_NAME,
  SAHWIRA_SYSTEM_PROMPT,
  type SahwiraCollected,
  type SahwiraMessage,
} from "@/lib/sahwira";

async function askOpenAI(
  messages: SahwiraMessage[],
  collected: SahwiraCollected
): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const context = collected.intent
    ? `\n\nInformation collected so far: ${JSON.stringify(collected)}`
    : "";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 280,
      messages: [
        { role: "system", content: SAHWIRA_SYSTEM_PROMPT + context },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    }),
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messages: SahwiraMessage[] = Array.isArray(body.messages) ? body.messages : [];
    const collected: SahwiraCollected = body.collected ?? {};

    const aiReply = await askOpenAI(messages, collected);
    if (aiReply) {
      const { collected: merged, readyToSubmit } = runSahwiraFlow(messages, collected);
      return NextResponse.json({
        reply: aiReply,
        collected: merged,
        readyToSubmit,
        source: "openai",
      });
    }

    const result = runSahwiraFlow(messages, collected);
    return NextResponse.json({ ...result, source: "flow" });
  } catch {
    return NextResponse.json({ error: `${SAHWIRA_NAME} is unavailable right now.` }, { status: 500 });
  }
}
