import { Construction } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const labels: Record<string, string> = {
  projects: "Projects",
  skills: "Skills",
  experience: "Experience",
  certificates: "Certificates",
  messages: "Messages",
}

export default async function ComingSoonPage({
  params,
}: {
  params: Promise<{ section: string }>
}) {
  const { section } = await params
  const label = labels[section] ?? "This section"

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="w-full max-w-md border-t-4 border-t-accent-500">
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-500/10">
            <Construction className="h-8 w-8 text-accent-500" />
          </div>
          <h1 className="text-2xl font-bold">
            {label} <span className="gradient-text">Coming Soon</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            The {label.toLowerCase()} management section is under development and will be
            available soon.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
