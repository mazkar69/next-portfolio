import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Eye } from "lucide-react"
import { getPublishedBlogs } from "@/lib/blog-service"
import { BlogPagination } from "@/components/blog-pagination"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts, ideas, and insights on web development, programming, and technology.",
}

const PAGE_SIZE = 9

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page: pageParam } = await searchParams
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1)

  const { blogs, totalPages, total } = await getPublishedBlogs({
    page,
    limit: PAGE_SIZE,
  })

  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Thoughts, ideas, and insights on web development, programming, and technology.
        </p>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">
            No blog posts yet. Check back soon!
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <Card
                key={post.slug}
                className="h-full flex flex-col hover:shadow-md transition-shadow border-t-4 border-t-primary-500"
              >
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
                    <span className="mx-2">•</span>
                    <Eye className="h-3 w-3 mr-1" />
                    <span>{post.views}</span>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  {post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-2">
                      {post.categories.map((cat) => (
                        <Badge key={cat._id} variant="secondary" className="text-xs">
                          {cat.name}
                        </Badge>
                      ))}
                    </div>
                  )}
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
            ))}
          </div>

          <BlogPagination currentPage={page} totalPages={totalPages} />
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Showing {blogs.length} of {total} posts
          </p>
        </>
      )}
    </div>
  )
}
