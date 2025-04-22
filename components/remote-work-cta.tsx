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
          backgroundImage: "url('/images/3.jpg')",
          backgroundAttachment: "fixed",
        }}
      >
        
        {/* Add a overlay of opacity .5 */}
        <div className="absolute inset-0 bg-black opacity-50" />

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
            className="bg-primary-500 hover:bg-primary-600 text-white"
          >
            Hire Me
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
