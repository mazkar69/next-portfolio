"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Code2, Server, Wrench, Database, Palette, Cloud } from "lucide-react"

const techCategories = {
  frontend: {
    title: "Frontend",
    icon: Palette,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    techs: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "Framer Motion",
      "shadcn/ui",
      "Redux",
    ],
  },
  backend: {
    title: "Backend",
    icon: Server,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    techs: [
      "Node.js",
      "Express.js",
      "Django",
      "REST APIs",
      "GraphQL",
      "Socket.io",
      "JWT",
      "OAuth",
    ],
  },
  database: {
    title: "Database",
    icon: Database,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    techs: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"],
  },
  tools: {
    title: "Tools & DevOps",
    icon: Wrench,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    techs: [
      "Git",
      "GitHub",
      "Docker",
      "AWS",
      "Vercel",
      "Netlify",
      "CI/CD",
      "VS Code",
      "Postman",
    ],
  },
  languages: {
    title: "Languages",
    icon: Code2,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    techs: ["JavaScript", "TypeScript", "Python", "Java", "C++", "SQL"],
  },
  cloud: {
    title: "Cloud & Services",
    icon: Cloud,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    techs: ["AWS S3", "AWS EC2", "Vercel", "Netlify", "Razorpay", "Cloudinary"],
  },
}

type CategoryKey = keyof typeof techCategories

export default function TechStackInteractive() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("frontend")

  const activeCategoryData = techCategories[activeCategory]

  return (
    <section id="tech-stack" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Technology Stack
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the technologies and tools I work with to build modern web applications
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {Object.entries(techCategories).map(([key, category]) => {
            const Icon = category.icon
            const isActive = activeCategory === key
            
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key as CategoryKey)}
                className={`group relative px-6 py-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-primary-500 text-white shadow-lg scale-105"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${isActive ? "text-white" : category.color}`} />
                  <span className="font-medium">{category.title}</span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary-500 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            )
          })}
        </motion.div>

        {/* Tech Stack Display */}
        <Card className="max-w-5xl mx-auto gradient-border">
          <CardContent className="pt-8">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Category Header */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className={`p-3 rounded-lg ${activeCategoryData.bgColor}`}>
                  <activeCategoryData.icon className={`h-8 w-8 ${activeCategoryData.color}`} />
                </div>
                <h3 className="text-2xl font-bold">{activeCategoryData.title}</h3>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap justify-center gap-3">
                {activeCategoryData.techs.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Badge
                      variant="secondary"
                      className="text-base px-4 py-2 hover:scale-110 transition-transform cursor-default"
                    >
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>

              {/* Tech Count */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center mt-8"
              >
                <p className="text-sm text-muted-foreground">
                  {activeCategoryData.techs.length} technologies in this category
                </p>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12"
        >
          {Object.entries(techCategories).slice(0, 4).map(([key, category]) => (
            <Card
              key={key}
              className="text-center hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setActiveCategory(key as CategoryKey)}
            >
              <CardContent className="pt-6">
                <div className={`inline-flex p-2 rounded-lg ${category.bgColor} mb-2`}>
                  <category.icon className={`h-5 w-5 ${category.color}`} />
                </div>
                <p className="text-2xl font-bold mb-1">{category.techs.length}+</p>
                <p className="text-xs text-muted-foreground">{category.title}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
