"use client"

import Section from "./section"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const certs = [
  {
    title: "Python Zero to Hero",
    thumb: "/python-zero-to-hero-certificate.png",
    full: "/python-zero-to-hero-certificate.png",
  },
  {
    title: "Full Stack Web Dev",
    thumb: "/full-stack-web-dev-certificate.png",
    full: "/certificate-full-stack-web-dev-full.png",
  },
  {
    title: "Football Best Performer",
    thumb: "/football-best-performer-award.png",
    full: "/football-best-performer-award.png",
  },
  {
    title: "Top 10% Rank",
    thumb: "/top-10-percent-award.png",
    full: "/award-top-10-percent.png",
  },
] as const

export default function Certifications() {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const [isCoarse, setIsCoarse] = useState(false)

  useEffect(() => {
    setIsCoarse(window.matchMedia("(pointer: coarse)").matches)
  }, [])

  return (
    <Section id="certs" title="Certificates & Awards" subtitle="Carousel with hover-to-preview popup.">
      <div className="relative overflow-hidden">
        <div className="flex animate-[marquee_40s_linear_infinite] md:animate-[marquee_30s_linear_infinite] lg:animate-[marquee_25s_linear_infinite] gap-4 whitespace-nowrap will-change-transform">
          {Array.from({ length: 2 }).map((_, loop) =>
            certs.map((c, i) => {
              const idx = loop * certs.length + i
              const active = hoverIdx === idx
              return (
                <div
                  key={`${loop}-${i}`}
                  className="relative inline-flex h-[140px] w-[200px] sm:h-[160px] sm:w-[220px] md:h-[160px] md:w-[240px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur transition-colors hover:bg-white/10 min-h-[44px] min-w-[44px]"
                  onMouseEnter={() => setHoverIdx(idx)}
                  onMouseLeave={() => setHoverIdx(null)}
                  onTouchStart={() => setHoverIdx(idx)}
                  onTouchEnd={() => setHoverIdx(null)}
                  data-cursor="link"
                >
                  <img
                    src={c.thumb || "/placeholder.svg"}
                    alt={c.title}
                    className="h-full w-full rounded-xl object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-2 right-2 truncate rounded-md bg-black/40 px-2 py-1 text-xs sm:text-sm text-white backdrop-blur">
                    {c.title}
                  </div>

                  <AnimatePresence>
                    {active && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.18, ease: "easeOut" } }}
                        exit={{ opacity: 0, scale: 0.95, y: 8, transition: { duration: 0.15, ease: "easeIn" } }}
                        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2"
                      >
                        <div className="rounded-xl border border-white/10 bg-black/40 p-2 shadow-2xl backdrop-blur">
                          <img
                            src={c.full || "/placeholder.svg"}
                            alt={`${c.title} preview`}
                            className="h-auto w-auto max-h-[50vh] max-w-[85vw] sm:max-h-[60vh] sm:max-w-[90vw] md:max-h-[70vh] md:max-w-[720px] rounded-md object-contain"
                            loading="lazy"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            }),
          )}
        </div>
      </div>

      <style>{`
        @keyframes marquee { 
          from { transform: translateX(0); } 
          to { transform: translateX(-50%); } 
        }
      `}</style>
    </Section>
  )
}
