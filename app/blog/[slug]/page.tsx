import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, ArrowLeft, Eye } from "lucide-react"
import { getBlogBySlug, incrementViews } from "@/lib/blog-service"
import { MarkdownRenderer } from "@/components/markdown-renderer"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) {
    return { title: "Blog Not Found" }
  }

  const title = blog.metaTitle || blog.title
  const description = blog.metaDescription || blog.shortDescription

  return {
    title,
    description,
    keywords: blog.keywords.length > 0 ? blog.keywords : undefined,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: blog.publishedAt,
      images: blog.thumbnail?.url ? [{ url: blog.thumbnail.url }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: blog.thumbnail?.url ? [blog.thumbnail.url] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) notFound()

  // Increment views (fire and forget)
  incrementViews(slug)

  return (
    <div className="container mx-auto px-4 py-24 md:py-32 max-w-4xl">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
        </Link>
      </Button>

      {blog.thumbnail?.url && (
        <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden rounded-xl mb-8">
          <Image
            src={blog.thumbnail.url}
            alt={blog.title}
            fill
            priority
            className="object-cover"
            unoptimized
          />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-primary-500 mb-4">
        <span className="inline-flex items-center">
          <Calendar className="mr-1 h-4 w-4" />
          {new Date(blog.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <span className="inline-flex items-center">
          <Clock className="mr-1 h-4 w-4" />
          {blog.readTime}
        </span>
        <span className="inline-flex items-center">
          <Eye className="mr-1 h-4 w-4" />
          {blog.views} views
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{blog.title}</h1>

      {blog.categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.categories.map((cat) => (
            <Badge key={cat._id} variant="secondary">
              {cat.name}
            </Badge>
          ))}
        </div>
      )}

      {blog.shortDescription && (
        <p className="text-lg text-muted-foreground mb-8 border-l-4 border-primary-500 pl-4">
          {blog.shortDescription}
        </p>
      )}

      <article className="prose prose-lg dark:prose-invert max-w-none">
        <MarkdownRenderer content={blog.longDescription} />
      </article>
    </div>
  )
}
