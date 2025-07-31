import "dotenv/config";

const apiKey = process.env.OPENAI_API_KEY;

console.log('API_KEY:', process.env.OPENAI_API_KEY);
console.log('VERCEL_ENV:', process.env.VERCEL_ENV);

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only handle GET requests to /token
  if (req.method === 'GET') {
    if (!apiKey) {
      console.error('OPENAI_API_KEY is not set');
      res.status(500).json({ error: "API key not configured" });
      return;
    }
    
    try {
      const response = await fetch(
        "https://api.openai.com/v1/realtime/sessions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o-realtime-preview-2025-06-03",
            voice: "verse",
          }),
        },
      );

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Token generation error:", error);
      res.status(500).json({ error: "Failed to generate token" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}