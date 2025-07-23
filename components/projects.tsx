"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { title } from "process"

const projects = [
  {
    title: "Annekaa Heights",
    description:
      "A room booking website that allows users to find and book accommodations easily. Features include user authentication, booking management, and payment processing.",
    image: "/projects/annekaa.png",
    liveUrl: "https://annekaaheights.com",
    githubUrl: "#",
    tags: ["React.js", "TypeScript", "MongoDB", "Razorpay", "Tailwind CSS", "Express.js", "Node.js", "Channel Manager"],
  },
  {
    title: "Chaar Dham",
    description:
      "A website dedicated to the Chaar Dham pilgrimage, providing information about all the temples, puja booking, donation options, and yatra parchi services.",
    image: "/projects/chaardham.png",
    liveUrl: "https://chaardham.in",
    githubUrl: "#",
    tags: ["Next.js", "Node.js", "Socket.io", "MongoDB", "Express.js", "Tailwind CSS", "Razorpay"],
  },
  {
    title: "JC Chaudhry Numerology",
    description:
      "A numerology website that provides personalized numerology reports and consultations. Users can book appointments and make payments online.",
    image: "/projects/jcchaudhry.png",
    liveUrl: "https://jcchaudhry.com",
    githubUrl: "#",
    tags: ["React", "D3.js", "Express", "MongoDB", "Tailwind CSS", "Razorpay"],
  },
  {
    title: "Portfolio Website",
    description:
      "My personal portfolio website showcasing my projects, skills, and experience. Built with Next.js and Tailwind CSS for a responsive design.",
    image: "/projects/portfolio.png",
    liveUrl: "https://mohdazkar.com",
    githubUrl: "#",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
  },
  {
    title: "Shaadi Bazaar",
    description:
      "A platform for booking venues and vendors for events, providing a seamless experience for users.",
    image: "/projects/shaadibazaar.png",
    liveUrl: "https://shaadibazaar.in",
    githubUrl: "#",
    tags: ["Next.js", "MongoDB", "Express", "Styled Components",],
  },
  {
    title: "Wedding Banquets",
    description:
      "A wedding banquet booking website that allows users to find and book banquet halls for their events. Features include user authentication, booking management, and payment processing.",
    image: "/projects/weddingbanqquets.png",
    liveUrl: "https://weddingbanquets.in",
    githubUrl: "#",
    tags: ["Next.js", "Node.js", "MongoDB", "Express.js"],
  },
  {
    title: "Camdotify",
    description: "Digital Marketing Agency Website",
    image: "/projects/camdotify.png",
    liveUrl: "https://camdotify.com",
    githubUrl: "#",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Node.js", "Express.js", "MongoDB"],
  },
  {
    title: "Gammer Link",
    //can play the games through xbox steam playstation window using the crypto coin. spectator. solana
    description:
      "A gaming platform that allows users to play games using crypto coins. Features include user authentication, game management, and payment processing.",
    image: "/projects/gammerlink.png",
    liveUrl: "https://gamerlink.io/",
    githubUrl: "#",
    tags: ["React.js", "Node.js", "MongoDB", "Express.js", "Tailwind CSS", "Crypto", "Solana"],
  },
  {
    title: "URL Shortener",
    description:
      "A URL shortening service that allows users to create short links for their long URLs. Built with React, Node.js, and MongoDB.",
    image: "/projects/urlclipper.png",
    liveUrl: "https://infjc.com",
    githubUrl: "#",
    tags: ["React", "Node.js", "Socket.io"],
  },
  // {
  //   title: "TalkToLive",
  //   description:
  //     "A real-time chat application with user authentication and group chat features. Built with React, Node.js, and Socket.io.",
  //   image: "/placeholder.svg?height=400&width=600",
  //   liveUrl: "#",
  //   githubUrl: "#",
  //   tags: ["React", "Node.js", "Socket.io"],
  // },
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
