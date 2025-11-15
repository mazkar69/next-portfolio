"use client"

import { motion } from "framer-motion"
import { MessageCircle, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ChatIcon() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href="/chat">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
        className="fixed bottom-6 right-6 z-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-foreground text-background px-3 py-2 rounded-lg text-sm font-medium shadow-lg pointer-events-none"
          >
            Chat with AI
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-foreground" />
          </motion.div>

          {/* Main Button */}
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center cursor-pointer group">
            <MessageCircle className="h-6 w-6 text-white" />
            
            {/* Pulse Animation */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 animate-ping opacity-20" />
            
            {/* Notification Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 1.5 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md"
            >
              1
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  )
}
