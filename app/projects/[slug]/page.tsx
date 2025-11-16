import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Target, Lightbulb, TrendingUp } from "lucide-react"
import { projectsData } from "@/lib/projects-data"
import type { Metadata } from "next"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = projectsData.find((p) => p.slug === params.slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} - Project Case Study`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} - Project Case Study`,
      description: project.shortDescription,
      images: [project.image],
    },
  }
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }))
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projectsData.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <Link href="/#projects">
          <Button variant="ghost" className="mb-8 group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Button>
        </Link>

        {/* Project Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">{project.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{project.shortDescription}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="px-3 py-1">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex gap-4">
            {project.liveUrl !== "#" && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <Button className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View Live Site
                </Button>
              </a>
            )}
            {project.githubUrl !== "#" && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <Github className="h-4 w-4" />
                  View Code
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-12 shadow-2xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Project Overview */}
        <Card className="mb-12 gradient-border">
          <CardHeader>
            <CardTitle className="text-2xl">Project Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {project.description}
            </p>
          </CardContent>
        </Card>

        {/* Challenge & Solution */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="gradient-border">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <Target className="h-6 w-6 text-red-500" />
                </div>
                <CardTitle className="text-2xl">The Challenge</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
            </CardContent>
          </Card>

          <Card className="gradient-border">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Lightbulb className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle className="text-2xl">The Solution</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <Card className="mb-12 gradient-border">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-green-500/10">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <CardTitle className="text-2xl">Results & Impact</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {project.results.map((result, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">{result}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Features */}
        <Card className="mb-12 gradient-border">
          <CardHeader>
            <CardTitle className="text-2xl">Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary-500 mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground">{feature}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="mb-12 gradient-border">
          <CardHeader>
            <CardTitle className="text-2xl">Technology Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(project.technologies).map(([category, techs]) => (
                <div key={category}>
                  <h4 className="font-semibold mb-3 capitalize">
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {techs.map((tech: string) => (
                      <Badge key={tech} variant="outline" className="px-3 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {category !== Object.keys(project.technologies).pop() && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Images Gallery */}
        {project.images && project.images.length > 1 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">Project Gallery</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {project.images.slice(1).map((img, index) => (
                <div
                  key={index}
                  className="relative h-[300px] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Image src={img} alt={`${project.title} screenshot ${index + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center py-12 px-6 bg-muted/50 rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Interested in similar work?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            I'm always open to discussing new projects and opportunities. Let's create something amazing together!
          </p>
          <Link href="/#contact">
            <Button size="lg" className="gap-2">
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
