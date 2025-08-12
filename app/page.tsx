"use client"

import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import AnimatedBackground from "@/components/animated-background"
import CustomCursor from "@/components/custom-cursor"
import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Education from "@/components/education"
import Certifications from "@/components/certifications"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/components/language-context"

export default function Page() {
  useEffect(() => {
    // Smooth anchor scroll across the site
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = ""
    }
  }, [])

  return (
    <LanguageProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
        <AnimatedBackground />
        <CustomCursor />
        <AnimatePresence mode="wait">
          <motion.main
            key="portfolio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.25, ease: "easeIn" } }}
          >
            <Header />
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Education />
            <Certifications />
            <Contact />
            <Footer />
          </motion.main>
        </AnimatePresence>
      </div>
    </LanguageProvider>
  )
}
