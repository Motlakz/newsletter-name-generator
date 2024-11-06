import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateNewsletterNames(topic: string, tone: string, industry: string) {
  const prompt = `Generate 5 creative newsletter names for a ${tone} newsletter about ${topic} in the ${industry} industry.

For each suggestion, provide the following in a structured format:
1. Name: [newsletter name]
2. Description: [brief description]
3. Score: [relevance score between 0.1 and 1.0]
4. Keywords: [three relevant keywords]

Please ensure each suggestion is clearly separated and follows this exact format.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a creative assistant specialized in generating engaging newsletter names. Return exactly 5 suggestions in a clear, structured format with name, description, score, and keywords for each suggestion.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.8,
    max_tokens: 1000,
  });

  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error('No content received from OpenAI');
  }

  // Parse the response into structured data
  const suggestions = content.split(/\n\s*\n/).filter(Boolean).map((suggestion) => {
    const nameMatch = suggestion.match(/Name:\s*(.+)/i);
    const descMatch = suggestion.match(/Description:\s*(.+)/i);
    const scoreMatch = suggestion.match(/Score:\s*(0\.\d+)/i);
    const keywordsMatch = suggestion.match(/Keywords:\s*(.+)/i);

    if (!nameMatch || !descMatch || !scoreMatch || !keywordsMatch) {
      throw new Error('Invalid response format from OpenAI');
    }

    return {
      name: nameMatch[1].trim(),
      description: descMatch[1].trim(),
      score: parseFloat(scoreMatch[1]),
      keywords: keywordsMatch[1].split(',').map(k => k.trim()),
    };
  });

  if (suggestions.length !== 5) {
    throw new Error('Expected exactly 5 suggestions from OpenAI');
  }

  return suggestions;
}