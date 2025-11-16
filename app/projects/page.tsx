"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, ArrowRight, ArrowLeft } from "lucide-react"
import { allProjects } from "@/components/projects"
import type { Metadata } from "next"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <Link href="/#projects">
            <Button variant="ghost" className="mb-6 group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              All Projects
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A comprehensive collection of my work. Each project demonstrates my expertise in modern web development,
              from full-stack applications to specialized solutions.
            </p>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow group">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105 duration-500"
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
                <CardFooter className="flex gap-2">
                  {project.githubUrl !== "#" && (
                    <Button variant="outline" size="sm" asChild className="gradient-border flex-1">
                      <Link href={project.githubUrl} target="_blank">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Link>
                    </Button>
                  )}
                  <Button size="sm" asChild className="bg-primary-500 hover:bg-primary-600 flex-1">
                    <Link href={project.liveUrl} target="_blank">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Link>
                  </Button>
                  {/* {('slug' in project && project.slug) ? (
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/projects/${project.slug}`}>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  ) : null} */}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16 py-12 px-6 bg-muted/50 rounded-xl"
        >
          <h3 className="text-2xl font-bold mb-4">Have a project in mind?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            I'm always excited to take on new challenges and collaborate on innovative projects.
            Let's build something amazing together!
          </p>
          <Link href="/#contact">
            <Button size="lg" className="gap-2">
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
