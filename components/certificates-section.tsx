"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Award, ExternalLink } from "lucide-react"
import Link from "next/link"

const certificates = [
  {
    title: "Advanced Web Development",
    issuer: "IIT Bombay",
    date: "2022",
    image: "/placeholder.svg?height=300&width=400",
    link: "#",
    description: "Full-stack web development with modern JavaScript frameworks and best practices.",
  },
  {
    title: "React & Next.js Masterclass",
    issuer: "Udemy",
    date: "2022",
    image: "/placeholder.svg?height=300&width=400",
    link: "#",
    description: "Comprehensive course on building scalable applications with React and Next.js.",
  },
  {
    title: "TypeScript for Professionals",
    issuer: "Coursera",
    date: "2021",
    image: "/placeholder.svg?height=300&width=400",
    link: "#",
    description: "Advanced TypeScript concepts for building type-safe applications.",
  },
  {
    title: "MongoDB Database Design",
    issuer: "MongoDB University",
    date: "2021",
    image: "/placeholder.svg?height=300&width=400",
    link: "#",
    description: "Database design principles and optimization techniques for MongoDB.",
  },
]

export default function CertificatesSection() {
  return (
    <section id="certificates" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Certificates & Achievements</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and achievements that have enhanced my skills and knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((certificate, index) => (
            <motion.div
              key={certificate.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden hover:shadow-md transition-shadow border-t-2 border-t-primary-500">
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <Image
                    src={certificate.image || "/placeholder.svg"}
                    alt={certificate.title}
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                    {certificate.date}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start mb-2">
                    <Award className="h-5 w-5 text-primary-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{certificate.title}</h3>
                      <p className="text-sm text-primary-500">{certificate.issuer}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{certificate.description}</p>
                  <Link
                    href={certificate.link}
                    className="inline-flex items-center text-xs text-primary-500 hover:underline"
                  >
                    View Certificate <ExternalLink className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
