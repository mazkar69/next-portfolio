"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Code, Coffee, Users, FolderCheck } from "lucide-react"

interface CounterProps {
  end: number
  duration: number
  suffix?: string
  prefix?: string
}

const Counter = ({ end, duration, suffix = "", prefix = "" }: CounterProps) => {
  const [count, setCount] = useState(0)
  const nodeRef = useRef<HTMLSpanElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (nodeRef.current) {
      observer.observe(nodeRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const startAnimation = (timestamp: number) => {
      startTime = timestamp
      animate(timestamp)
    }

    const animate = (timestamp: number) => {
      const runtime = timestamp - startTime
      const relativeProgress = runtime / duration

      if (relativeProgress < 1) {
        const currentCount = Math.floor(end * relativeProgress)
        setCount(currentCount)
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
        cancelAnimationFrame(animationFrame)
      }
    }

    animationFrame = requestAnimationFrame(startAnimation)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [end, duration, isInView])

  return (
    <span ref={nodeRef} className="tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

const stats = [
  {
    icon: <Code className="h-8 w-8" />,
    value: 85000,
    suffix: "+",
    label: "Lines of Code",
    duration: 2500,
  },
  {
    icon: <Users className="h-8 w-8" />,
    value: 12,
    suffix: "+",
    label: "Happy Clients",
    duration: 1500,
  },
  {
    icon: <Coffee className="h-8 w-8" />,
    value: 1520,
    suffix: "+",
    label: "Cups of Coffee",
    duration: 2000,
  },
  {
    icon: <FolderCheck className="h-8 w-8" />,
    value: 22,
    suffix: "+",
    label: "Projects Completed",
    duration: 1800,
  },
]

export default function CounterSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-primary-500/5 via-secondary-500/5 to-accent-500/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">By the Numbers</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A quantitative look at my journey as a developer and the work I've accomplished.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="p-4 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full text-primary-500 mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                <Counter end={stat.value} duration={stat.duration} suffix={stat.suffix} />
              </h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
