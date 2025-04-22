"use client"

import { motion } from "framer-motion"
import { Code2, Database, FileJson, Globe, LayoutGrid, Layers } from "lucide-react"

const skills = [
  {
    name: "React",
    icon: <LayoutGrid className="h-8 w-8" />,
    description: "Building interactive UIs with React and Next.js",
  },
  {
    name: "JavaScript",
    icon: <FileJson className="h-8 w-8" />,
    description: "Modern JavaScript for dynamic web applications",
  },
  {
    name: "TypeScript",
    icon: <Code2 className="h-8 w-8" />,
    description: "Type-safe code with TypeScript",
  },
  {
    name: "SQL",
    icon: <Database className="h-8 w-8" />,
    description: "Database design and optimization with SQL",
  },
  {
    name: "MongoDB",
    icon: <Layers className="h-8 w-8" />,
    description: "NoSQL database solutions with MongoDB",
  },
  {
    name: "Web Development",
    icon: <Globe className="h-8 w-8" />,
    description: "Full-stack web development with modern technologies",
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I've worked with a range of technologies in the web development world, from front-end to back-end.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-background rounded-lg p-6 shadow-sm border border-border hover:border-primary-500/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-lg text-primary-500">
                  {skill.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                  <p className="text-muted-foreground text-sm">{skill.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
