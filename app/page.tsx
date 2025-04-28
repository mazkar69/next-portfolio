import Hero from "@/components/hero"
import Skills from "@/components/skills"
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

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Skills />
      <CounterSection />
      <ServicesSection />
      <Projects />
      <Experience />
      <CertificatesSection />
      <RemoteWorkCTA />
      <EducationSection />
      {/* <BlogSection /> */}
      <Contact />
      <BackToTop />
    </div>
  )
}
