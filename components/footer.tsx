import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-xl font-bold">
              Mohd Azkar
            </Link>
            <p className="text-muted-foreground mt-2 max-w-md">
              Full Stack Developer specializing in building exceptional digital experiences.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <Link
                href="#"
                className="p-2 rounded-full bg-background text-foreground hover:text-primary-500 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full bg-background text-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full bg-background text-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:contact@mohdazkar.com"
                className="p-2 rounded-full bg-background text-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              <nav className="flex space-x-4 mb-2">
                <Link href="#home" className="hover:text-primary-500 transition-colors">
                  Home
                </Link>
                <Link href="#projects" className="hover:text-primary transition-colors">
                  Projects
                </Link>
                <Link href="#blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
                <Link href="#contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </nav>
              <p>© {new Date().getFullYear()} Mohd Azkar. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
