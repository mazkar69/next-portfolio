import { NextResponse } from "next/server"
import { z } from "zod"
import connectDB from "@/lib/db"
import Blog from "@/lib/models/Blog"
import { deleteImage } from "@/lib/cloudinary"
import { uniqueSlug } from "@/lib/slug"

export const dynamic = "force-dynamic"

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  categories: z.array(z.string()).optional(),
  thumbnail: z
    .object({ url: z.string(), publicId: z.string() })
    .optional(),
  shortDescription: z.string().optional(),
  longDescription: z.string().optional(),
  isActive: z.boolean().optional(),
})

type Params = { params: Promise<{ id: string }> }

// GET /api/admin/blogs/[id]
export async function GET(_request: Request, { params }: Params) {
  try {
    await connectDB()
    const { id } = await params
    const blog = await Blog.findById(id).populate("categories", "name slug").lean()
    if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    return NextResponse.json({ blog }, { status: 200 })
  } catch (error) {
    console.error("GET blog error:", error)
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 })
  }
}

// PUT /api/admin/blogs/[id]
export async function PUT(request: Request, { params }: Params) {
  try {
    await connectDB()
    const { id } = await params
    const body = await request.json()
    const parsed = updateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid data" },
        { status: 400 }
      )
    }

    const existing = await Blog.findById(id)
    if (!existing) return NextResponse.json({ error: "Blog not found" }, { status: 404 })

    const data = parsed.data

    // Handle slug uniqueness if changed
    if (data.slug && data.slug !== existing.slug) {
      data.slug = await uniqueSlug(
        data.slug,
        async (s) => !!(await Blog.exists({ slug: s, _id: { $ne: id } }))
      )
    }

    // If thumbnail replaced, delete the old Cloudinary image
    if (
      data.thumbnail &&
      existing.thumbnail?.publicId &&
      data.thumbnail.publicId !== existing.thumbnail.publicId
    ) {
      await deleteImage(existing.thumbnail.publicId)
    }

    // Recompute readTime if long description changed
    if (data.longDescription) {
      const words = data.longDescription.trim().split(/\s+/).length
      const minutes = Math.max(1, Math.ceil(words / 200))
      ;(data as Record<string, unknown>).readTime = `${minutes} min read`
    }

    const blog = await Blog.findByIdAndUpdate(id, data, { new: true }).populate(
      "categories",
      "name slug"
    )

    return NextResponse.json({ blog }, { status: 200 })
  } catch (error) {
    console.error("PUT blog error:", error)
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 })
  }
}

// DELETE /api/admin/blogs/[id]
export async function DELETE(_request: Request, { params }: Params) {
  try {
    await connectDB()
    const { id } = await params
    const blog = await Blog.findByIdAndDelete(id)
    if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 })

    if (blog.thumbnail?.publicId) {
      await deleteImage(blog.thumbnail.publicId)
    }

    return NextResponse.json({ message: "Blog deleted" }, { status: 200 })
  } catch (error) {
    console.error("DELETE blog error:", error)
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 })
  }
}
