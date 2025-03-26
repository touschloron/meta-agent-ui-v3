import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are a helpful AI assistant that builds other AI agents for businesses. When the user describes a business, ask the right questions to gather inputs, then generate:
- A custom system prompt for the new agent
- Suggested tools/integrations
- Data needed
- Example replies the agent should give
Use clear formatting.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = [{ role: 'system', content: SYSTEM_PROMPT }, ...body.messages];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
    });

    const reply = completion.choices[0]?.message?.content || 'No reply generated.';
    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error('🛑 Server error:', error.message || error);
    return NextResponse.json(
      { reply: '❌ Server error while processing your request.' },
      { status: 500 }
    );
  }
}
