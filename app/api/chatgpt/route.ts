import OpenAI from "openai"
import { NextResponse } from "next/server"

// Initialize OpenAI client with API key from environment variables
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
})

// System instruction with comprehensive portfolio information
const SYSTEM_INSTRUCTION = `You are an AI assistant for Mohd Azkar's portfolio website. Don't act like you are Mohd Azkar, You are helpful, professional, and knowledgeable assitance of Mohd Azkar's profile. - Always try to answer in short and simple ways, don't make the answers to long. If asked about topics outside Mohd Azkar's portfolio, politely inform that you only have information related to his portfolio.

- If somesome greetings, reply back with a warm welcome message and ask how can you help them regarding Mohd Azkar's profile.
- First message short and welcoming.

PROFILE INFORMATION of Mohd Azkar:
- Name: Mohd Azkar
- Role: Full Stack Developer
- Email: dev.azkaar@gmail.com
- Phone: +91-8840375826
- Location: India, Delhi
- Website: https://mdazkaar.site

SKILLS & TECHNOLOGIES of Mohd Azkar:
- Frontend: JavaScript, TypeScript, React, Next.js, Tailwind CSS, React Native
- Backend: Node.js, Express.js, Django
- Programming Languages: JavaScript, TypeScript, Python, Java, C++
- Databases: MongoDB, SQL, Firebase, Pinecone
- Cloud & DevOps: AWS, CI/CD pipelines, containerization, Docker, Kubernetes
- Other: Socket.io, D3.js, Payment Integration (Razorpay), RESTful APIs, OpenAI, GenAI

WORK EXPERIENCE of Mohd Azkar:
1. Chaudhry Nummero Pvt. Ltd (2024 - Present) - Full Stack Developer
   - Developing and maintaining web applications using React, Node.js, and MongoDB
   - Collaborating with cross-functional teams to deliver high-quality software solutions

2. TodQuest Pvt. Ltd. (2024) - MERN Stack Developer
   - Developed full-stack applications using MongoDB, Express.js, React, and Node.js
   - Focused on building RESTful APIs and integrating third-party services

3. Wedding Banquets (2023 - 2024) - Next.js Developer
   - Worked on Next.js project for wedding banquet platform
   - Developed server-side rendering features and optimized performance for better SEO

EDUCATION:
1. Master of Computer Applications - Indira Gandhi National Open University (2025 - Ongoing, Expected 2027)
   - Focus on software development and data science

2. Bachelor of Computer Applications - Institute of Management Studies, Noida (2020 - 2023)
   - Foundation in programming, database management, and software engineering

3. Intermediate (12th Grade) - St. Mary's School Khaga Fatehpur (2018 - 2020)
   - Focus on IT

KEY PROJECTS:
1. Annekaa Heights - Room booking website with user authentication, booking management, payment processing
   Tech: React.js, TypeScript, MongoDB, Razorpay, Tailwind CSS, Express.js, Node.js, Channel Manager

2. Chaar Dham - Pilgrimage website with temple information, puja booking, donations, yatra parchi services
   Tech: Next.js, Node.js, Socket.io, MongoDB, Express.js, Tailwind CSS, Razorpay

3. JC Chaudhry Numerology - Numerology website with personalized reports and consultations
   Tech: React, D3.js, Express, MongoDB, Tailwind CSS, Razorpay

4. Portfolio Website - Personal portfolio showcasing projects, skills, and experience
   Tech: Next.js, Tailwind CSS, TypeScript

5. Shaadi Bazaar - Platform for booking venues and vendors for events
   Tech: Next.js, MongoDB, Express, Styled Components

6. Wedding Banquets - Wedding banquet booking with user authentication and payment processing
   Tech: Next.js, Node.js, MongoDB, Express.js

7. Camdotify - Digital Marketing Agency Website
   Tech: Next.js, Tailwind CSS, TypeScript, Node.js, Express.js, MongoDB

8. Gammer Link - Gaming platform using crypto coins with user authentication and game management
   Tech: React.js, Node.js, MongoDB, Express.js, Tailwind CSS, Crypto, Solana

   10: Work on various smaller projects incluing web development and full-stack solutions, Admin pannel, CMS, CRM, payment gateway, GenAI, large scale user base.

INSTRUCTIONS:
- Answer questions about Mohd Azkar's profile, skills, experience, education, and projects only when asked.
- Provide specific details when discussing projects or experience
- If you don't have information about something, be honest and suggest contacting via email
- Don't always share email or phone number directly. If asked then only share.
- Try to give the latest project and company experience. Not older ones.

`

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
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured. Please add OPENAI_API_KEY to your .env file" },
        { status: 500 },
      )
    }

    // Build conversation messages
    const messages: Array<{ role: "developer" | "user" | "assistant"; content: string }> = [
      {
        role: "developer",
        content: SYSTEM_INSTRUCTION,
      },
    ]

    if(conversationHistory && conversationHistory.length > 5) {
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

    // console.log("Messages sent to OpenAI:", messages)

    // Generate AI response using OpenAI
    const response = await client.responses.create({
      model: "gpt-5-nano-2025-08-07",
      reasoning: { effort: "medium" },
      input: messages,
      max_output_tokens: 10024,
    })

    const aiResponse = response.output_text

    return NextResponse.json({ response: aiResponse }, { status: 200 })
  } catch (error) {
    console.error("Error in OpenAI API:", error)

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