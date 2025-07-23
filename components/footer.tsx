import Link from "next/link"
import { Github, Linkedin, Mail, Twitter, Phone, MapPin, Instagram } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-xl font-bold">
              <Image src={"/images/sig.png"} alt="Logo" width={200} height={50} />
            </Link>
            <p className="text-muted-foreground mt-2 max-w-md">
              I am always excited to work on some awesome projects, message me and let&apos;s discuss over coffee.
            </p>

            {/* Contact Information */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-primary-500" />
                <span>+91 8840375826</span>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-primary-500" />
                <span>mohdazkar@yahoo.com</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-primary-500" />
                <span>Delhi, India</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <Link
                href="https://github.com/mazkar69/"
                className="p-2 rounded-full bg-background text-foreground hover:text-primary-500 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://infjc.com/agvTIi"
                className="p-2 rounded-full bg-background text-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/md.azkaar/profilecard/?igsh=eDJxOXFxNWt3M2tr"
                className="p-2 rounded-full bg-background text-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:mohdazkar@yahoo.com"
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
              <p>No © copyright issues,  Made by AzKaR with ❤️</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
