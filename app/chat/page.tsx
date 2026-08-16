"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Send, Bot, User } from "lucide-react"
import Link from "next/link"

type ChatProvider = "chatgpt" | "gemini" | "inception"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [provider, setProvider] = useState<ChatProvider>("inception") // Default provider is Inception

  // Load messages from session storage on initial render
  useEffect(() => {
    const storedMessages = sessionStorage.getItem("chatMessages")
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages)
        // Convert timestamp strings back to Date objects
        const messagesWithDates = parsedMessages.map((msg: Message) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
        setMessages(messagesWithDates)
      } catch (error) {
        console.error("Error loading messages from session storage:", error)
        // If error, set default welcome message
        setMessages([
          {
            id: "1",
            content:
              "You can ask me anything about Mohd Azkar's profile, projects, experience, education, or certificates.",
            sender: "ai",
            timestamp: new Date(),
          },
        ])
      }
    } else {
      // No stored messages, set default welcome message
      setMessages([
        {
          id: "1",
          content:
            "You can ask me anything about Mohd Azkar's profile, projects, experience, education, or certificates.",
          sender: "ai",
          timestamp: new Date(),
        },
      ])
    }
    setIsLoaded(true)
  }, [])

  // Save messages to session storage whenever they change
  useEffect(() => {
    if (isLoaded && messages.length > 0) {
      sessionStorage.setItem("chatMessages", JSON.stringify(messages))
    }
  }, [messages, isLoaded])

  useEffect(() => {
    // Scroll to bottom when new messages arrive or when typing
    if (isLoaded) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messages, isTyping, isLoaded])

  // Keep focus on the input after the AI finishes responding
  useEffect(() => {
    if (!isTyping && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isTyping])

  const handleSend = async () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage]) // User message will added but not in API call, this is because setState is async
    const currentInput = inputValue
    setInputValue("")
    setIsTyping(true)

    try {
      // Prepare conversation history for context
      const conversationHistory = messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.content,
      }))

      // Call AI API
      const response = await fetch(`/api/${provider}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput, // Passing this because setState is async, so messages won't have the latest user message yet
          conversationHistory: conversationHistory,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.response,
          sender: "ai",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiMessage])
      } else {
        throw new Error(data.error || "Failed to get response")
      }
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          error instanceof Error
            ? `Sorry, I encountered an error: ${error.message}`
            : "Sorry, I couldn't process your message. Please try again.",
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-20" // Padding to account for the global navbar
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/">
            <Button variant="ghost" className="mb-4 -ml-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
          </Link>

          {/* Restored Header Content for better UI */}
          {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-lg">
                <Bot className="h-6 w-6 text-primary-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Chat with AI</h1>
                <p className="text-muted-foreground">Ask me anything about Mohd Azkar</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Model:</span>
              <Select value={provider} onValueChange={(value) => setProvider(value as ChatProvider)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chatgpt">ChatGPT (OpenRouter)</SelectItem>
                  <SelectItem value="gemini">Gemini</SelectItem>
                  <SelectItem value="inception">Inception (Mercury)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div> */}
        </div>
      </motion.div>

      {/* Messages Area (Native Scrolling) */}
      <main className="flex-1 w-full container mx-auto px-4 max-w-4xl pb-32 pt-6">
        <div className="space-y-6">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-start gap-2 sm:gap-3 max-w-[100%] sm:max-w-[80%] ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${message.sender === "user"
                      ? "bg-gradient-to-r from-primary-500 to-secondary-500"
                      : "bg-gradient-to-r from-secondary-500/10 to-primary-500/10"
                    }`}
                >
                  {message.sender === "user" ? (
                    <User className="h-5 w-5 text-white" />
                  ) : (
                    <Bot className="h-5 w-5 text-primary-500" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl px-4 py-3 shadow-sm ${message.sender === "user"
                      ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
                      : "bg-muted"
                    }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${message.sender === "user" ? "text-white/70" : "text-muted-foreground"
                      }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex gap-3 max-w-[80%]">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-secondary-500/10 to-primary-500/10">
                  <Bot className="h-5 w-5 text-primary-500" />
                </div>
                <div className="rounded-2xl px-4 py-3 bg-muted shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Sticky Input Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="sticky bottom-0 z-20 bg-background/80 backdrop-blur-md border-t"
      >
        <div className="container mx-auto px-4 max-w-4xl py-4">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              size="icon"
              className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send
          </p>
        </div>
      </motion.div>
    </div>
  )
}