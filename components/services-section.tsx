"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Monitor, Smartphone, Link2, Palette, PenToolIcon as Tool } from "lucide-react"

const services = [
  {
    icon: <Monitor className="h-10 w-10" />,
    title: "Website Development (MERN)",
    description: "Modern, scalable web apps using MongoDB, Express, React, and Node.js.",
  },
  {
    icon: <Smartphone className="h-10 w-10" />,
    title: "App Development (React Native)",
    description: "Cross-platform mobile apps with a native feel.",
  },
  {
    icon: <Link2 className="h-10 w-10" />,
    title: "API Integration",
    description: "Seamless third-party service integrations for your applications.",
  },
  {
    icon: <Palette className="h-10 w-10" />,
    title: "UI/UX Optimization",
    description: "Improving user experience through clean and modern interfaces.",
  },
  {
    icon: <Tool className="h-10 w-10" />,
    title: "Maintenance & Support",
    description: "Ongoing support to keep your product running smoothly.",
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional services I offer to help businesses and individuals achieve their digital goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-md transition-shadow border-t-4 border-t-primary-500">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full text-primary-500 mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
