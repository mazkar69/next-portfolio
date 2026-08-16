import { NextResponse } from "next/server"
import { z } from "zod"
import connectDB from "@/lib/db"
import Blog from "@/lib/models/Blog"
import Category from "@/lib/models/Category"
import { uniqueSlug } from "@/lib/slug"

export const dynamic = "force-dynamic"

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  keywords: z.array(z.string()).default([]),
  metaTitle: z.string().default(""),
  metaDescription: z.string().default(""),
  categories: z.array(z.string()).default([]),
  thumbnail: z
    .object({ url: z.string().default(""), publicId: z.string().default("") })
    .default({ url: "", publicId: "" }),
  shortDescription: z.string().default(""),
  longDescription: z.string().default(""),
  isActive: z.boolean().default(true),
})

// GET /api/admin/blogs — list all blogs (newest first)
export async function GET() {
  try {
    await connectDB()
    const blogs = await Blog.find({})
      .populate("categories", "name slug")
      .sort({ createdAt: -1 })
      .lean()
    return NextResponse.json({ blogs }, { status: 200 })
  } catch (error) {
    console.error("GET blogs error:", error)
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}

// POST /api/admin/blogs — create a blog
export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()
    const parsed = blogSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid data" },
        { status: 400 }
      )
    }

    const data = parsed.data

    const slug = data.slug
      ? await uniqueSlug(data.slug, async (s) => !!(await Blog.exists({ slug: s })))
      : await uniqueSlug(data.title, async (s) => !!(await Blog.exists({ slug: s })))

    const blog = await Blog.create({ ...data, slug })
    await blog.populate("categories", "name slug")

    return NextResponse.json({ blog }, { status: 201 })
  } catch (error) {
    console.error("POST blog error:", error)
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 })
  }
}
