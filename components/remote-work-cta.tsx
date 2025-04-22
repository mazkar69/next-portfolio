"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function RemoteWorkCTA() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/90 via-secondary-500/90 to-accent-500/90 backdrop-blur-sm"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center text-white"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">I am available for Remote Work</h2>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Hire me for remote work — I'm open to working from home opportunities. Let's collaborate to bring your
            vision to life, no matter where you're located.
          </p>
          <Button
            onClick={scrollToContact}
            size="lg"
            className="bg-white text-primary-500 hover:bg-white/90 hover:text-primary-600 text-lg px-8 py-6 h-auto"
          >
            Hire Me
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
