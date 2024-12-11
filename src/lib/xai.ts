const API_URL = 'https://api.x.ai/v1/chat/completions';

export async function sendMessage(content: string, apiKey: string) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'system',
          content: 'You are Grok, a helpful AI assistant.',
        },
        {
          role: 'user',
          content,
        },
      ],
      model: 'grok-beta',
      stream: true,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to send message to xAI');
  }

  return response;
}