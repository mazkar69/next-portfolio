"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform built with Next.js, TypeScript, and MongoDB. Includes user authentication, product management, and payment processing.",
    image: "/placeholder.svg?height=400&width=600",
    liveUrl: "#",
    githubUrl: "#",
    tags: ["Next.js", "TypeScript", "MongoDB", "Stripe"],
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates. Features include task assignment, progress tracking, and team collaboration tools.",
    image: "/placeholder.svg?height=400&width=600",
    liveUrl: "#",
    githubUrl: "#",
    tags: ["React", "Node.js", "Socket.io", "PostgreSQL"],
  },
  {
    title: "Personal Finance Dashboard",
    description:
      "An interactive dashboard for personal finance management. Visualize spending patterns, set budgets, and track financial goals.",
    image: "/placeholder.svg?height=400&width=600",
    liveUrl: "#",
    githubUrl: "#",
    tags: ["React", "D3.js", "Express", "MongoDB"],
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects. Each project is built with a focus on performance, accessibility, and
            user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-primary-500/10 text-primary-500 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{project.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild className="gradient-border">
                    <Link href={project.githubUrl} target="_blank">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Link>
                  </Button>
                  <Button size="sm" asChild className="bg-primary-500 hover:bg-primary-600">
                    <Link href={project.liveUrl} target="_blank">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
