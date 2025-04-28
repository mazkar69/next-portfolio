"use client"

import { motion } from "framer-motion"
import { GraduationCap, Calendar } from "lucide-react"

const education = [
  {
    institute: "Indira Gandhi National Open University",
    degree: "Master of Computer Applications",
    duration: "2025 - Ongoing",
    description:
      "Pursuing a Master's degree in Computer Applications with a focus on software development and data science. Expected graduation in 2027.",
  },
  {
    institute: "Institute of Management Studies (Noida)",
    degree: "Bachelor of Computer Applications",
    duration: "2020 - 2023",
    description:
      "Completed a Bachelor's degree in Computer Applications, gaining a solid foundation in programming, database management, and software engineering principles.",
  },
  {
    institute: "St. Mary's School Khaga Fatehpur",
    degree: "Intermediate (12th Grade)",
    duration: "2018 - 2020",
    description: "Completed my intermediate education with a focus on IT.",
  },
]

export default function EducationSection() {
  return (
    <section id="education" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My academic journey and the educational foundations that have shaped my professional skills.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
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
                    <h3 className="text-xl font-bold">{edu.degree}</h3>
                    <div className="flex items-center text-muted-foreground">
                      <GraduationCap className="h-4 w-4 mr-2 text-primary-500" />
                      <span>{edu.institute}</span>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 md:mt-0 text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2 text-primary-500" />
                    <span>{edu.duration}</span>
                  </div>
                </div>
                <p className="text-muted-foreground">{edu.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
