import Link from "next/link"
import { FileText, Eye, CheckCircle2, PlusCircle } from "lucide-react"
import connectDB from "@/lib/db"
import Blog from "@/lib/models/Blog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

async function getStats() {
  try {
    await connectDB()
    const [total, active, viewsAgg] = await Promise.all([
      Blog.countDocuments({}),
      Blog.countDocuments({ isActive: true }),
      Blog.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]),
    ])
    return { total, active, views: viewsAgg[0]?.total ?? 0 }
  } catch {
    return { total: 0, active: 0, views: 0 }
  }
}

export default async function AdminDashboardPage() {
  const stats = await getStats()

  const cards = [
    { title: "Total Blogs", value: stats.total, icon: FileText, color: "text-primary-500" },
    { title: "Active Blogs", value: stats.active, icon: CheckCircle2, color: "text-green-500" },
    { title: "Total Views", value: stats.views, icon: Eye, color: "text-secondary-500" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Dashboard <span className="gradient-text">Overview</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Welcome back. Here&apos;s what&apos;s happening with your content.
          </p>
        </div>
        <Button asChild className="bg-primary-500 hover:bg-primary-600">
          <Link href="/admin/blogs/new">
            <PlusCircle className="mr-2 h-4 w-4" /> New Blog
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.title} className="border-t-4 border-t-primary-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href="/admin/blogs">Manage Blogs</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/blogs/new">Create Blog</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/blog" target="_blank">
              View Public Blog
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
