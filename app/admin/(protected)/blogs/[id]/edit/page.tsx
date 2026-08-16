import { notFound } from "next/navigation"
import connectDB from "@/lib/db"
import Blog from "@/lib/models/Blog"
import { BlogForm } from "@/components/admin/blog-form"

export const dynamic = "force-dynamic"

async function getBlog(id: string) {
  try {
    await connectDB()
    const blog = await Blog.findById(id).lean()
    if (!blog) return null
    return JSON.parse(JSON.stringify(blog))
  } catch {
    return null
  }
}

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const blog = await getBlog(id)

  if (!blog) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Edit <span className="gradient-text">Blog</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Update &quot;{blog.title}&quot;
        </p>
      </div>
      <BlogForm initialData={blog} />
    </div>
  )
}
