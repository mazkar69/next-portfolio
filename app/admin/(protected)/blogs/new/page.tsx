import { BlogForm } from "@/components/admin/blog-form"

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Create <span className="gradient-text">Blog</span>
        </h1>
        <p className="text-sm text-muted-foreground">Write and publish a new blog post.</p>
      </div>
      <BlogForm />
    </div>
  )
}
