import connectDB from "@/lib/db"
import Blog from "@/lib/models/Blog"
import Category from "@/lib/models/Category"

// Ensure Category model is registered for populate
void Category

export interface PublicBlog {
  _id: string
  title: string
  slug: string
  keywords: string[]
  metaTitle: string
  metaDescription: string
  categories: { _id: string; name: string; slug: string }[]
  thumbnail: { url: string; publicId: string }
  shortDescription: string
  longDescription: string
  isActive: boolean
  views: number
  readTime: string
  publishedAt: string
  createdAt: string
}

function serialize(blog: Record<string, unknown>): PublicBlog {
  return JSON.parse(JSON.stringify(blog))
}

export async function getPublishedBlogs({
  page = 1,
  limit = 9,
}: {
  page?: number
  limit?: number
}): Promise<{ blogs: PublicBlog[]; total: number; totalPages: number }> {
  try {
    await connectDB()
    const skip = (page - 1) * limit
    const [blogs, total] = await Promise.all([
      Blog.find({ isActive: true })
        .populate("categories", "name slug")
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Blog.countDocuments({ isActive: true }),
    ])
    return {
      blogs: blogs.map(serialize),
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    }
  } catch (error) {
    console.error("getPublishedBlogs error:", error)
    return { blogs: [], total: 0, totalPages: 1 }
  }
}

export async function getBlogBySlug(slug: string): Promise<PublicBlog | null> {
  try {
    await connectDB()
    const blog = await Blog.findOne({ slug, isActive: true })
      .populate("categories", "name slug")
      .lean()
    if (!blog) return null
    return serialize(blog)
  } catch (error) {
    console.error("getBlogBySlug error:", error)
    return null
  }
}

export async function getLatestBlogs(n = 4): Promise<PublicBlog[]> {
  try {
    await connectDB()
    const blogs = await Blog.find({ isActive: true })
      .populate("categories", "name slug")
      .sort({ publishedAt: -1 })
      .limit(n)
      .lean()
    return blogs.map(serialize)
  } catch (error) {
    console.error("getLatestBlogs error:", error)
    return []
  }
}

export async function incrementViews(slug: string): Promise<void> {
  try {
    await connectDB()
    await Blog.findOneAndUpdate({ slug }, { $inc: { views: 1 } })
  } catch (error) {
    console.error("incrementViews error:", error)
  }
}
