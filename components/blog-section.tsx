"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import type { PublicBlog } from "@/lib/blog-service"

interface BlogSectionProps {
  posts: PublicBlog[]
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [width, setWidth] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (posts.length === 0) return null

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === posts.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? posts.length - 1 : prevIndex - 1))
  }

  const visiblePosts = () => {
    const itemsPerPage = width > 1024 ? 3 : width > 768 ? 2 : 1
    const result = []

    for (let i = 0; i < itemsPerPage; i++) {
      const index = (currentIndex + i) % posts.length
      result.push(posts[index])
    }

    return result
  }

  return (
    <section id="blog" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Blog Posts</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I write about web development, programming, and technology. Check out my latest articles.
          </p>
        </div>

        <div className="relative">
          <div className="flex justify-between absolute -top-16 right-0">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="mr-2 text-primary-500"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="text-primary-500"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div ref={carouselRef} className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: -currentIndex * (100 / (width > 1024 ? 3 : width > 768 ? 2 : 1)) + "%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {visiblePosts().map((post, index) => (
                <motion.div
                  key={post._id}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full flex flex-col hover:shadow-md transition-shadow border-t-4 border-t-primary-500">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={post.thumbnail?.url || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform hover:scale-105 duration-500"
                        unoptimized
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center text-sm text-primary-500 mb-2">
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <span className="mx-2">•</span>
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="line-clamp-3">
                        {post.shortDescription}
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" asChild className="w-full gradient-border">
                        <Link href={`/blog/${post.slug}`}>Read Article</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Button asChild className="bg-primary-500 hover:bg-primary-600">
            <Link href="/blog">Show All Blogs</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
