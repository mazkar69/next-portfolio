"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])



  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-background/80 backdrop-blur-md  sm:bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold flex items-center gap-2">
            <img src="/images/logo.png" alt="Logo" className="w-[200px]" />
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href={"/#home"}
              className="text-foreground/80 hover:text-primary-500 transition-colors"
            >
              Home
            </Link>
            <Link
              href={"/#services"}
              className="text-foreground/80 hover:text-primary-500 transition-colors"
            >
              Services
            </Link>
            <Link
              href={"/#projects"}
              className="text-foreground/80 hover:text-primary-500 transition-colors"
            >
              Projects
            </Link>
            {/* <Link
              href={"/#blog"}
              className="text-foreground/80 hover:text-primary-500 transition-colors"
            >
              Blog
            </Link> */}
            <Link 
              href={"/#contact" }
              className="text-foreground/80 hover:text-primary-500 transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-primary-500"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

          </div>
        </div>

        {/* Mobile Navigation Slider */}
        <div 
          className={cn(
            "md:hidden fixed top-0 right-0 h-screen w-80 bg-background/95 backdrop-blur-md shadow-lg z-40 transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground/80 hover:text-foreground"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="px-6">
            <div className="flex flex-col space-y-4">
              <Link
                href={"/#home"}
                className="py-2 text-foreground/80 hover:text-foreground transition-colors text-left"
              >
                Home
              </Link>
              <Link
                href={"/#services"}
                className="py-2 text-foreground/80 hover:text-foreground transition-colors text-left"
              >
                Services
              </Link>
              <Link
                href={"/#projects"}
                className="py-2 text-foreground/80 hover:text-foreground transition-colors text-left"
              >
                Projects
              </Link>
              {/* <Link
                href={"/#blog"}
                className="py-2 text-foreground/80 hover:text-foreground transition-colors text-left"
              >
                Blog
              </Link> */}
              <Link
                href={"/#contact"}
                className="py-2 text-foreground/80 hover:text-foreground transition-colors text-left"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Overlay - Click outside to close */}
        {isOpen && (
          <div 
            className="md:hidden fixed w-full h-screen inset-0 bg-black/50 backdrop-blur-sm z-30 cursor-pointer"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu overlay"
          />
        )}
      </div>
    </header>
  )
}
