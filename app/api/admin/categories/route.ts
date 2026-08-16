import { NextResponse } from "next/server"
import { z } from "zod"
import connectDB from "@/lib/db"
import Category from "@/lib/models/Category"
import { uniqueSlug } from "@/lib/slug"

export const dynamic = "force-dynamic"

const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
})

// GET /api/admin/categories
export async function GET() {
  try {
    await connectDB()
    const categories = await Category.find({}).sort({ name: 1 }).lean()
    return NextResponse.json({ categories }, { status: 200 })
  } catch (error) {
    console.error("GET categories error:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

// POST /api/admin/categories
export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()
    const parsed = categorySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid data" },
        { status: 400 }
      )
    }

    const name = parsed.data.name.trim()

    const existing = await Category.findOne({ name: new RegExp(`^${name}$`, "i") })
    if (existing) {
      return NextResponse.json({ category: existing }, { status: 200 })
    }

    const slug = await uniqueSlug(name, async (s) => !!(await Category.exists({ slug: s })))
    const category = await Category.create({ name, slug })

    return NextResponse.json({ category }, { status: 201 })
  } catch (error) {
    console.error("POST category error:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}
