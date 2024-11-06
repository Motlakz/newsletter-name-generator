import { NextResponse } from 'next/server';
import { generateNewsletterNames } from '@/lib/openai';
import { z } from 'zod';

export const runtime = 'edge';

const requestSchema = z.object({
  topic: z.string().min(2),
  tone: z.string(),
  industry: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { topic, tone, industry } = requestSchema.parse(body);

    const suggestions = await generateNewsletterNames(topic, tone, industry);

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate newsletter names' },
      { status: 500 }
    );
  }
}