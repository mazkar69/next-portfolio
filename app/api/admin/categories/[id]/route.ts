import { NextResponse } from "next/server"
import { z } from "zod"
import connectDB from "@/lib/db"
import Category from "@/lib/models/Category"
import Blog from "@/lib/models/Blog"
import { uniqueSlug } from "@/lib/slug"

export const dynamic = "force-dynamic"

const updateSchema = z.object({
  name: z.string().min(1),
})

type Params = { params: Promise<{ id: string }> }

// PUT /api/admin/categories/[id]
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

    const name = parsed.data.name.trim()
    const slug = await uniqueSlug(
      name,
      async (s) => !!(await Category.exists({ slug: s, _id: { $ne: id } }))
    )

    const category = await Category.findByIdAndUpdate(id, { name, slug }, { new: true })
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json({ category }, { status: 200 })
  } catch (error) {
    console.error("PUT category error:", error)
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}

// DELETE /api/admin/categories/[id] — also removes refs from blogs
export async function DELETE(_request: Request, { params }: Params) {
  try {
    await connectDB()
    const { id } = await params

    const category = await Category.findByIdAndDelete(id)
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    // Pull the category reference from all blogs
    await Blog.updateMany({ categories: id }, { $pull: { categories: id } })

    return NextResponse.json({ message: "Category deleted" }, { status: 200 })
  } catch (error) {
    console.error("DELETE category error:", error)
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}
