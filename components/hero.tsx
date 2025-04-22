"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"

export default function Hero() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Hi, I'm <span className="gradient-text">Mohd Azkar</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-foreground/80">Full Stack Developer</h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              I build exceptional and accessible digital experiences for the web. Specialized in creating modern,
              responsive web applications with cutting-edge technologies.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" onClick={scrollToContact} className="bg-primary-500 hover:bg-primary-600 text-white">
                Hire Me
              </Button>
              <Button size="lg" variant="outline" className="gradient-border">
                Download CV
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex-1 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20">
              <Image
                src="/images/azkar.jpg"
                alt="Mohd Azkar"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-500/20 via-secondary-500/20 to-accent-500/20 blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent -z-10" />
    </section>
  )
}
