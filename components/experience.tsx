"use client"

import Section from "./section"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { highlightProject } from "@/utils/highlight"

const items = [
  {
    id: "ecommerce",
    title: "E-Commerce Website (Open Source)",
    role: "Contributor",
    time: "2024",
    bullets: [
      "Used AI tools to fix Next.js app issues.",
      "Improved responsiveness across breakpoints.",
      "Enhanced UI polish and accessibility.",
    ],
    projectAnchor: "project-ecommerce-open-source",
  },
  {
    id: "aniwatch",
    title: "Freelance Front-End (Aniwatch.to)",
    role: "Front-End Developer",
    time: "2023",
    bullets: [
      "Built anime streaming site UI with modern UX.",
      "Collaborated with backend team to integrate APIs.",
      "Optimized performance and interactions.",
    ],
    projectAnchor: "project-anime-streaming-website",
  },
] as const

function scrollToProject(anchor: string) {
  const el = document.getElementById(anchor)
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" })
    setTimeout(() => highlightProject(anchor), 200)
  }
}

export default function Experience() {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [markerTops, setMarkerTops] = useState<number[]>([])

  useEffect(() => {
    const compute = () => {
      if (!wrapperRef.current) return
      const wRect = wrapperRef.current.getBoundingClientRect()
      const tops = cardRefs.current.map((el) => {
        if (!el) return 0
        const r = el.getBoundingClientRect()
        // Position marker at vertical center of the card container
        return r.top - wRect.top + r.height / 2
      })
      setMarkerTops(tops)
    }

    // Recompute on resize/scroll and when card sizes change
    const ro = new ResizeObserver(compute)
    cardRefs.current.forEach((el) => el && ro.observe(el))
    if (wrapperRef.current) ro.observe(wrapperRef.current)

    compute()
    window.addEventListener("resize", compute)
    window.addEventListener("scroll", compute, { passive: true })

    return () => {
      ro.disconnect()
      window.removeEventListener("resize", compute)
      window.removeEventListener("scroll", compute)
    }
  }, [])

  return (
    <Section
      id="experience"
      title="Experience"
      subtitle="From contribution to delivery — bug-fixes, UI revamps, and feedback-driven improvements across devices."
    >
      <div ref={wrapperRef} className="relative mx-auto max-w-5xl">
        {/* Center vertical timeline (desktop only) */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-[2px] -translate-x-1/2 bg-gradient-to-b from-fuchsia-400/70 via-violet-400/50 to-cyan-300/70 md:block" />

        {/* Absolutely positioned markers that sit EXACTLY on the center line */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          {markerTops.map((top, i) => (
            <div key={`marker-${i}`} className="absolute left-1/2 -translate-x-1/2" style={{ top }} aria-hidden="true">
              <span className="relative block h-3 w-3 -translate-y-1/2 rounded-full bg-gradient-to-br from-fuchsia-400 to-cyan-300 shadow-[0_0_14px_rgba(168,85,247,0.9)] animate-neon-blink" />
              <span className="pointer-events-none absolute -inset-3 -translate-y-1/2 rounded-full bg-fuchsia-400/25 blur-2xl" />
            </div>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid gap-10 md:grid-cols-2">
          {items.map((it, i) => {
            const onRight = i % 2 === 0 // 0 -> right, 1 -> left
            const motionFrom = onRight ? { x: 20, opacity: 0 } : { x: -20, opacity: 0 }
            const motionTo = { x: 0, opacity: 1, transition: { duration: 0.5 } }

            return (
              <div
                key={it.id}
                ref={(el) => (cardRefs.current[i] = el)}
                className={`relative py-6 ${onRight ? "md:col-start-2" : "md:col-start-1"}`}
              >
                {/* Optional connector from line to card — aligned to card center using a pseudo offset */}
                {onRight ? (
                  <div className="absolute left-1/2 top-1/2 hidden h-[2px] w-10 -translate-y-1/2 bg-gradient-to-r from-fuchsia-400/70 to-cyan-300/70 md:block" />
                ) : (
                  <div className="absolute right-1/2 top-1/2 hidden h-[2px] w-10 -translate-y-1/2 bg-gradient-to-l from-cyan-300/70 to-fuchsia-400/70 md:block" />
                )}

                <motion.div initial={motionFrom} whileInView={motionTo} viewport={{ once: true, margin: "-80px" }}>
                  <Card className="border-white/10 bg-white/5 backdrop-blur">
                    <CardContent className="p-5">
                      <div className="text-sm text-foreground/60">{it.time}</div>
                      <h3 className="mt-1 text-lg font-semibold">{it.title}</h3>
                      <p className="text-sm text-foreground/70">{it.role}</p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-foreground/85">
                        {it.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <Button variant="outline" data-cursor="link" onClick={() => scrollToProject(it.projectAnchor)}>
                          View Project
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Neon blink keyframes for markers */}
      <style>{`
@keyframes neonBlink {
  0%   { box-shadow: 0 0 0 rgba(0,0,0,0); opacity: .9; transform: scale(1); }
  15%  { box-shadow: 0 0 10px rgba(168,85,247,.9), 0 0 24px rgba(56,189,248,.6); opacity: 1; transform: scale(1.05); }
  35%  { box-shadow: 0 0 16px rgba(168,85,247,1), 0 0 36px rgba(56,189,248,.8); transform: scale(1.08); }
  55%  { box-shadow: 0 0 6px rgba(168,85,247,.5), 0 0 10px rgba(56,189,248,.35); opacity: .85; transform: scale(1.02); }
  70%  { box-shadow: 0 0 0 rgba(0,0,0,0); opacity: .8; transform: scale(1); }
  100% { box-shadow: 0 0 0 rgba(0,0,0,0); opacity: .9; transform: scale(1); }
}
.animate-neon-blink { animation: neonBlink 2.6s ease-in-out infinite; }
      `}</style>
    </Section>
  )
}
