"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar } from "lucide-react"

const experiences = [
  {
    company: "Tech Innovations Inc.",
    role: "Senior Full Stack Developer",
    duration: "2021 - Present",
    description:
      "Lead development of enterprise web applications using React, Node.js, and TypeScript. Implemented CI/CD pipelines and mentored junior developers.",
  },
  {
    company: "Digital Solutions Ltd.",
    role: "Frontend Developer",
    duration: "2019 - 2021",
    description:
      "Developed responsive web interfaces using React and Redux. Collaborated with UX designers to implement pixel-perfect designs and improve user experience.",
  },
  {
    company: "WebCraft Agency",
    role: "Web Developer",
    duration: "2017 - 2019",
    description:
      "Built and maintained client websites using JavaScript, HTML, and CSS. Worked with various CMS platforms and implemented custom solutions.",
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey in the tech industry, where I've contributed to various projects and teams.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-8 relative pl-8 border-l-2 border-gradient-to-b from-primary-500 via-secondary-500 to-accent-500/30 last:border-transparent"
            >
              <div className="absolute -left-[9px] top-0 h-5 w-5 rounded-full bg-primary-500" />
              <div className="bg-background rounded-lg p-6 shadow-sm border border-border">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <div className="flex items-center text-muted-foreground">
                      <Briefcase className="h-4 w-4 mr-2 text-primary-500" />
                      <span>{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 md:mt-0 text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2 text-primary-500" />
                    <span>{exp.duration}</span>
                  </div>
                </div>
                <p className="text-muted-foreground">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
