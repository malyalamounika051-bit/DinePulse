import { NextResponse } from 'next/server';
import { generateAICopilotResponse, generateMenuRecommendations } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, prompt, context, preference, timeOfDay } = body;

    if (action === 'copilot') {
      const response = await generateAICopilotResponse(prompt || 'Give an operational overview', context);
      return NextResponse.json({ success: true, result: response });
    }

    if (action === 'recommendations') {
      const recs = await generateMenuRecommendations(preference || 'Chef Special', timeOfDay || 'Dinner');
      return NextResponse.json({ success: true, result: recs });
    }

    return NextResponse.json({ success: false, error: 'Unknown AI action' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'AI processing failed' }, { status: 500 });
  }
}
