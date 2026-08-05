import Inception from "inceptionai"
import { NextResponse } from "next/server"
import { SYSTEM_INSTRUCTION } from ".././lib/system_instruction"

// Initialize Inception client with API key from environment variables
// Note: i am using the openrouter api key here with openAI sdk.
const client = new Inception({
  apiKey: process.env.INCEPTION_API_KEY || "",
})

const MODEL = `mercury-2`

export async function POST(request: Request) {
  try {
    const body = await request.json()
    let { message, conversationHistory } = body
    // console.log("Received message:", message)
    // console.log("Received conversation history:", conversationHistory)

    // Validate input
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Check if API key is configured
    if (!process.env.INCEPTION_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured. Please add INCEPTION_API_KEY to your .env file" },
        { status: 500 },
      )
    }

    // Build conversation messages
    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      {
        role: "system",
        content: SYSTEM_INSTRUCTION,
      },
    ]

    if (conversationHistory && conversationHistory.length > 5) {
      //Keep last 5 messages only, This is to limit the token usage
      conversationHistory = conversationHistory.slice(-5);
    }

    // Add conversation history if provided
    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationHistory.forEach((msg: { role: string; content: string }) => {
        messages.push({
          role: msg.role === "user" ? "user" : "assistant",
          content: msg.content,
        })
      })
    }

    // Add current user message
    messages.push({
      role: "user",
      content: message,
    })

    // console.log("Messages sent to Inception:", messages)

    // Generate AI response using Inception
    const completion = await client.chat.completions.create({
      model: MODEL,
      messages: messages,
      reasoning_effort: "medium",
      temperature: 0.75,
      max_tokens: 8192,
    })

    const aiResponse = completion.choices[0]?.message?.content

    return NextResponse.json({ response: aiResponse }, { status: 200 })
  } catch (error) {
    console.error("Error in Inception API:", error)

    // Handle specific error types
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to generate response: ${error.message}` },
        { status: 500 },
      )
    }

    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
