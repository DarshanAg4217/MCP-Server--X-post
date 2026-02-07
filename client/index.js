
import readline from "readline/promises";
import { GoogleGenAI } from "@google/genai"



// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    api_key: process.env.GEMINI_API_KEY,
});



const chatHistory = []

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


async function chatLoop() {

    const question = await rl.question("You: ");

    chatHistory.push({
        role: "user",
        parts: [{
            text: question,
            type: "text"
        }]
    });

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: chatHistory

    })

    const responseText = response.candidates[0].content.parts[0].text

    chatHistory.push({
        role: "assistant",
        parts: [{
            text: responseText,
            type: "text"
        }]
    })

    console.log(`AI : ${responseText}`)

    chatLoop();


}
chatLoop();