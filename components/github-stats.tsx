"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GitBranch, Star, Users, GitFork, TrendingUp } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface GitHubStats {
  public_repos: number
  followers: number
  following: number
  total_stars?: number
  total_forks?: number
}

interface Repository {
  stargazers_count: number
  forks_count: number
}

export default function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch("https://api.github.com/users/mazkar69")
        if (!userResponse.ok) throw new Error("Failed to fetch user data")
        const userData = await userResponse.json()

        // Fetch repositories to calculate total stars and forks
        const reposResponse = await fetch("https://api.github.com/users/mazkar69/repos?per_page=100")
        if (!reposResponse.ok) throw new Error("Failed to fetch repos")
        const repos: Repository[] = await reposResponse.json()

        const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)
        const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0)

        setStats({
          public_repos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          total_stars: totalStars,
          total_forks: totalForks,
        })
        setLoading(false)
      } catch (err) {
        console.error("Error fetching GitHub data:", err)
        setError(true)
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  if (error) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Unable to load GitHub stats at the moment.</p>
      </div>
    )
  }

  const statCards = [
    {
      title: "Public Repositories",
      value: stats?.public_repos || 0,
      icon: GitBranch,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Stars",
      value: stats?.total_stars || 0,
      icon: Star,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Followers",
      value: stats?.followers || 0,
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Total Forks",
      value: stats?.total_forks || 0,
      icon: GitFork,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            GitHub Activity
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time stats from my GitHub profile
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="gradient-border hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className="h-8 w-16" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="text-3xl font-bold">{stat.value}</div>
                      <TrendingUp className={`h-4 w-4 ${stat.color}`} />
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href="https://github.com/mazkar69"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 transition-colors"
          >
            <GitBranch className="h-4 w-4" />
            View GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  )
}
