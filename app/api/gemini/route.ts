import { GoogleGenAI } from "@google/genai"
import { NextResponse } from "next/server"

// Initialize Gemini AI with API key from environment variables
// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" })
const ai = new GoogleGenAI({ apiKey: "AIzaSyBYiXEbU-DXXFPI3SeLF3TicPwzXVhw30o" })

// System instruction with comprehensive portfolio information
const SYSTEM_INSTRUCTION = `You are an AI assistant for Mohd Azkar's portfolio website. Don't act like you are Mohd Azkar, You are helpful, professional, and knowledgeable assitance of Mohd Azkar's profile. - Always try to answer in short and simple ways, don't make the answers to long. If asked about topics outside Mohd Azkar's portfolio, politely inform that you only have information related to his portfolio.


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
    const { message, conversationHistory } = body

    // Validate input
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured. Please add GEMINI_API_KEY to your .env file" },
        { status: 500 },
      )
    }

    // Build conversation contents
    const contents = conversationHistory && Array.isArray(conversationHistory) 
      ? conversationHistory.map((msg: { role: string; content: string }) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        }))
      : []

    // Add current message
    contents.push({
      role: "user",
      parts: [{ text: message }],
    })

    // Generate AI response
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1024,
      },
    })

    const aiResponse = response.text

    return NextResponse.json({ response: aiResponse }, { status: 200 })
  } catch (error) {
    console.error("Error in Gemini API:", error)
    
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