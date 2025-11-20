import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({apiKey: process.env.GROQ_API!});


export const callAI = async (prompt: string): Promise<string> => {
    const response = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        model: "openai/gpt-oss-120b"
    })

    return response.choices[0].message.content!;
}