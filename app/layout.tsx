import type React from "react"
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://mdazkaar.site"),
  title: {
    default: "Mohd Azkar | Full Stack Developer Portfolio",
    template: "%s | Mohd Azkar"
  },
  description: "Professional portfolio of Mohd Azkar, a Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Showcasing innovative projects and technical expertise.",
  keywords: ["Mohd Azkar", "Full Stack Developer", "React Developer", "Next.js", "Node.js", "Web Development", "Portfolio", "Software Engineer"],
  authors: [{ name: "Mohd Azkar", url: "https://mdazkaar.site" }],
  creator: "Mohd Azkar",
  publisher: "Mohd Azkar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mdazkaar.site",
    title: "Mohd Azkar | Full Stack Developer Portfolio",
    description: "Building exceptional web experiences with React, Next.js, Node.js, and modern technologies. Explore my projects and expertise.",
    siteName: "Mohd Azkar Portfolio",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mohd Azkar - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohd Azkar | Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, and Node.js. Building innovative web solutions.",
    images: ["/images/og-image.png"],
    creator: "@yourtwitterhandle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mohd Azkar",
    url: "https://mdazkaar.site",
    image: "https://mdazkaar.site/images/profile.jpg",
    jobTitle: "Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies",
    sameAs: [
      "https://github.com/mazkar69",
      "https://linkedin.com/in/yourprofile",
      "https://twitter.com/yourhandle",
    ],
    knowsAbout: [
      "React.js",
      "Next.js",
      "Node.js",
      "TypeScript",
      "JavaScript",
      "MongoDB",
      "Express.js",
      "Tailwind CSS",
      "Web Development",
      "Full Stack Development"
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
