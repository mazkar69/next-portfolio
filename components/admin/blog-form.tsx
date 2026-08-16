"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useTheme } from "next-themes"
import { Loader2, Upload, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { slugify } from "@/lib/slug"
import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

const blogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  keywords: z.array(z.string()).default([]),
  metaTitle: z.string().default(""),
  metaDescription: z.string().default(""),
  categories: z.array(z.string()).default([]),
  shortDescription: z.string().default(""),
  longDescription: z.string().default(""),
  isActive: z.boolean().default(true),
})

type BlogFormValues = z.infer<typeof blogFormSchema>

interface Category {
  _id: string
  name: string
  slug: string
}

interface Thumbnail {
  url: string
  publicId: string
}

interface BlogFormProps {
  initialData?: {
    _id: string
    title: string
    slug: string
    keywords: string[]
    metaTitle: string
    metaDescription: string
    categories: string[] | Category[]
    shortDescription: string
    longDescription: string
    isActive: boolean
    thumbnail: Thumbnail
  }
}

export function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter()
  const { resolvedTheme } = useTheme()
  const isEditing = !!initialData

  const [categories, setCategories] = useState<Category[]>([])
  const [newCategory, setNewCategory] = useState("")
  const [addingCategory, setAddingCategory] = useState(false)
  const [keywordInput, setKeywordInput] = useState("")
  const [thumbnail, setThumbnail] = useState<Thumbnail>(
    initialData?.thumbnail ?? { url: "", publicId: "" }
  )
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [slugEdited, setSlugEdited] = useState(isEditing)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      slug: initialData?.slug ?? "",
      keywords: initialData?.keywords ?? [],
      metaTitle: initialData?.metaTitle ?? "",
      metaDescription: initialData?.metaDescription ?? "",
      categories: Array.isArray(initialData?.categories)
        ? initialData!.categories.map((c: string | Category) =>
            typeof c === "string" ? c : c._id
          )
        : [],
      shortDescription: initialData?.shortDescription ?? "",
      longDescription: initialData?.longDescription ?? "",
      isActive: initialData?.isActive ?? true,
    },
  })

  const title = form.watch("title")
  const metaTitle = form.watch("metaTitle")
  const metaDescription = form.watch("metaDescription")
  const keywords = form.watch("keywords")

  // Auto-generate slug from title unless manually edited
  useEffect(() => {
    if (!slugEdited) {
      form.setValue("slug", slugify(title))
    }
  }, [title, slugEdited, form])

  // Fetch categories
  useEffect(() => {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then((d) => setCategories(d.categories ?? []))
      .catch(() => toast.error("Failed to load categories"))
  }, [])

  async function handleAddCategory() {
    const name = newCategory.trim()
    if (!name) return
    setAddingCategory(true)
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setCategories((prev) =>
        [...prev, data.category].sort((a, b) => a.name.localeCompare(b.name))
      )
      // Auto-select the new category
      const current = form.getValues("categories")
      if (!current.includes(data.category._id)) {
        form.setValue("categories", [...current, data.category._id])
      }
      setNewCategory("")
      toast.success(`Category "${data.category.name}" added`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add category")
    } finally {
      setAddingCategory(false)
    }
  }

  function addKeyword() {
    const kw = keywordInput.trim()
    if (!kw) return
    if (!keywords.includes(kw)) {
      form.setValue("keywords", [...keywords, kw])
    }
    setKeywordInput("")
  }

  function removeKeyword(kw: string) {
    form.setValue(
      "keywords",
      keywords.filter((k) => k !== kw)
    )
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setThumbnail({ url: data.url, publicId: data.publicId })
      toast.success("Image uploaded")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  async function onSubmit(values: BlogFormValues) {
    setSubmitting(true)
    try {
      const payload = { ...values, thumbnail }

      const res = await fetch(
        isEditing ? `/api/admin/blogs/${initialData!._id}` : "/api/admin/blogs",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      toast.success(isEditing ? "Blog updated" : "Blog created")
      router.push("/admin/blogs")
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save blog")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main content — 2 cols */}
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="My awesome blog post" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="my-awesome-blog-post"
                          {...field}
                          onChange={(e) => {
                            setSlugEdited(true)
                            field.onChange(e)
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        URL-friendly identifier. Auto-generated from title.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A brief summary shown in blog cards..."
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="longDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Long Description (Markdown)</FormLabel>
                      <FormControl>
                        <div data-color-mode={resolvedTheme === "dark" ? "dark" : "light"}>
                          <MDEditor
                            value={field.value}
                            onChange={(val) => field.onChange(val ?? "")}
                            height={450}
                            preview="live"
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Write your blog content in Markdown. Use the toolbar for formatting.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* SEO Card */}
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="metaTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Title</FormLabel>
                      <FormControl>
                        <Input placeholder="SEO title (defaults to blog title)" {...field} />
                      </FormControl>
                      <FormDescription>{metaTitle.length}/60 characters</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metaDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="SEO description for search engines..."
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {metaDescription.length}/160 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>Keywords</FormLabel>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a keyword and press Enter"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addKeyword()
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={addKeyword}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {keywords.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {keywords.map((kw) => (
                        <Badge key={kw} variant="secondary" className="gap-1">
                          {kw}
                          <button
                            type="button"
                            onClick={() => removeKeyword(kw)}
                            className="ml-1 rounded-full hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </FormItem>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar — 1 col */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publish</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <FormLabel className="text-base">Active</FormLabel>
                        <FormDescription>Visible on the public site</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-primary-500 hover:bg-primary-600"
                  disabled={submitting || uploading}
                >
                  {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isEditing ? "Update Blog" : "Publish Blog"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push("/admin/blogs")}
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thumbnail</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {thumbnail.url ? (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                    <Image
                      src={thumbnail.url}
                      alt="Thumbnail"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={() => setThumbnail({ url: "", publicId: "" })}
                      className="absolute right-2 top-2 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 text-muted-foreground transition-colors hover:border-primary-500 hover:text-primary-500"
                  >
                    {uploading ? (
                      <Loader2 className="h-8 w-8 animate-spin" />
                    ) : (
                      <Upload className="h-8 w-8" />
                    )}
                    <span className="text-sm">
                      {uploading ? "Uploading..." : "Click to upload"}
                    </span>
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <p className="text-xs text-muted-foreground">
                  Uploaded to Cloudinary. Max 5MB.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <FormField
                  control={form.control}
                  name="categories"
                  render={() => (
                    <div className="space-y-2">
                      {categories.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                          No categories yet. Add one below.
                        </p>
                      )}
                      {categories.map((cat) => (
                        <FormField
                          key={cat._id}
                          control={form.control}
                          name="categories"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(cat._id)}
                                  onCheckedChange={(checked) => {
                                    const current = field.value ?? []
                                    field.onChange(
                                      checked
                                        ? [...current, cat._id]
                                        : current.filter((id) => id !== cat._id)
                                    )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{cat.name}</FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  )}
                />
                <Separator />
                <div className="flex gap-2">
                  <Input
                    placeholder="New category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddCategory()
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleAddCategory}
                    disabled={addingCategory}
                  >
                    {addingCategory ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  )
}
