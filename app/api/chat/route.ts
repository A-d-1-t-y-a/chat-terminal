import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { userInput } = req.body;

  const response = await fetch(
    "https://api.openai.com/v1/engines/text-davinci-003/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: userInput,
        max_tokens: 150,
      }),
    }
  );

  const data = await response.json();

  return new Response(JSON.stringify({ answer: data.choices[0].text }), {
    status: 200,
  });
}
