import Hero from "@/components/hero"
import Skills from "@/components/skills"
import TechStackInteractive from "@/components/tech-stack-interactive"
import GitHubStats from "@/components/github-stats"
import CounterSection from "@/components/counter-section"
import ServicesSection from "@/components/services-section"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import EducationSection from "@/components/education-section"
import CertificatesSection from "@/components/certificates-section"
import BlogSection from "@/components/blog-section"
import RemoteWorkCTA from "@/components/remote-work-cta"
import Contact from "@/components/contact"
import BackToTop from "@/components/back-to-top"
import ChatIcon from "@/components/chat-icon"

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Skills />
      <TechStackInteractive />
      <GitHubStats />
      <CounterSection />
      <ServicesSection />
      <Projects limit={6} />
      <Experience />
      <CertificatesSection />
      <RemoteWorkCTA />
      <EducationSection />
      {/* <BlogSection /> */}
      <Contact />
      {/* <BackToTop /> */}
      <ChatIcon />
    </div>
  )
}
