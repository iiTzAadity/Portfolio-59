"use client"

import Section from "./section"
import { Button } from "@/components/ui/button"

export default function CallToActionFinal() {
  return (
    <Section id="cta-final" title="Ready to collaborate?" subtitle="Let’s make something award‑worthy.">
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-8 text-center">
        <p className="text-lg text-foreground/80">Open to full‑time roles and freelance engagements.</p>
        <div className="mt-6 flex justify-center gap-4">
          <Button
            data-cursor="link"
            className="bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-500 text-white"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Contact Me
          </Button>
          <Button
            variant="outline"
            data-cursor="link"
            onClick={() => window.open("/aditya-resume.png", "_blank")}
          >
            Download Resume
          </Button>
        </div>
      </div>
    </Section>
  )
}
