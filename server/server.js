import express from 'express';
import cors from 'cors';
import OpenAI from "openai";
import "dotenv/config";

const app = express();
app.use(cors()); 
app.use(express.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/analyze', async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: "No text provided" });
        }

        const prompt = `
You detect cyberbully and harmful online behavior in text shown on a user's screen.

Return ONLY valid JSON in this exact schema:
{
  "is_harmful": boolean,
  "behavior_type": string | null,
  "severity": number | null,
  "targets_user": boolean,
  "explanation": string,
  "recommend_intervention": boolean,
  "suggested_bot_opening": string | null
}

Severity must be an integer between 1 and 5.

SCREEN_TEXT:
<<<
${text}
>>>
`;

        const resp = await client.chat.completions.create({ 
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant that outputs only valid JSON." },
                { role: "user", content: prompt }
            ],
            temperature: 0,
            response_format: { type: "json_object" } 
        });

        const rawContent = resp.choices[0].message.content;
        
        const result = JSON.parse(rawContent);
        res.json(result);

    } catch (error) {
        console.error("!!! Server Error !!!", error.message);
        
        res.status(500).json({ 
            is_harmful: false, 
            error: "Failed to process request",
            details: error.message 
        });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});