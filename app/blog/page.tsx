import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

// This would typically come from a database or CMS
const blogPosts = [
  {
    title: "Building Accessible React Applications",
    excerpt:
      "Learn how to create React applications that are accessible to all users, including those with disabilities.",
    image: "/placeholder.svg?height=400&width=600",
    date: "April 10, 2023",
    readTime: "5 min read",
    slug: "building-accessible-react-applications",
  },
  {
    title: "TypeScript Best Practices for 2023",
    excerpt:
      "Discover the latest TypeScript patterns and practices that will help you write cleaner, more maintainable code.",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 22, 2023",
    readTime: "7 min read",
    slug: "typescript-best-practices-2023",
  },
  {
    title: "Optimizing MongoDB for Performance",
    excerpt: "Tips and techniques for improving the performance of your MongoDB database in production environments.",
    image: "/placeholder.svg?height=400&width=600",
    date: "February 15, 2023",
    readTime: "6 min read",
    slug: "optimizing-mongodb-performance",
  },
  {
    title: "Modern CSS Techniques Every Developer Should Know",
    excerpt:
      "Explore modern CSS features like Grid, Flexbox, and Custom Properties that make styling web applications easier.",
    image: "/placeholder.svg?height=400&width=600",
    date: "January 30, 2023",
    readTime: "4 min read",
    slug: "modern-css-techniques",
  },
  {
    title: "Getting Started with Next.js 13",
    excerpt: "A comprehensive guide to building modern web applications with Next.js 13 and its new App Router.",
    image: "/placeholder.svg?height=400&width=600",
    date: "January 15, 2023",
    readTime: "8 min read",
    slug: "getting-started-nextjs-13",
  },
  {
    title: "The Future of Web Development",
    excerpt: "Exploring upcoming trends and technologies that will shape the future of web development.",
    image: "/placeholder.svg?height=400&width=600",
    date: "December 20, 2022",
    readTime: "6 min read",
    slug: "future-of-web-development",
  },
  {
    title: "Building a REST API with Node.js and Express",
    excerpt: "Learn how to create a robust REST API using Node.js, Express, and MongoDB.",
    image: "/placeholder.svg?height=400&width=600",
    date: "December 5, 2022",
    readTime: "7 min read",
    slug: "building-rest-api-nodejs-express",
  },
  {
    title: "Introduction to Web Accessibility",
    excerpt: "Understanding the importance of web accessibility and how to implement it in your projects.",
    image: "/placeholder.svg?height=400&width=600",
    date: "November 18, 2022",
    readTime: "5 min read",
    slug: "introduction-web-accessibility",
  },
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Thoughts, ideas, and insights on web development, programming, and technology.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card
            key={post.slug}
            className="h-full flex flex-col hover:shadow-md transition-shadow border-t-4 border-t-primary-500"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>
            <CardHeader>
              <div className="flex items-center text-sm text-primary-500 mb-2">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <Clock className="h-3 w-3 mr-1" />
                <span>{post.readTime}</span>
              </div>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full gradient-border">
                <Link href={`/blog/${post.slug}`}>Read Article</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
