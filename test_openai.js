const fs = require('fs');
async function test() {
  const openAiKey = process.env.OPENAI_API_KEY;
  if (!openAiKey) return console.log('NO KEY');
  
  const imageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  const mimeType = 'image/png';
  
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + openAiKey,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Return {\"test\":\"ok\"}' },
            {
              type: 'image_url',
              image_url: { url: 'data:' + (mimeType || 'image/jpeg') + ';base64,' + imageBase64, detail: 'high' },
            },
          ],
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.1,
      max_tokens: 1200,
    }),
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}
test();
