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
        <div className="flex animate-[marquee_25s_linear_infinite] gap-4 whitespace-nowrap will-change-transform">
          {Array.from({ length: 2 }).map((_, loop) =>
            certs.map((c, i) => {
              const idx = loop * certs.length + i
              const active = hoverIdx === idx
              return (
                <div
                  key={`${loop}-${i}`}
                  className="relative inline-flex h-40 w-60 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur transition-colors hover:bg-white/10"
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
                  <div className="absolute bottom-2 left-2 right-2 truncate rounded-md bg-black/40 px-2 py-1 text-xs text-white backdrop-blur">
                    {c.title}
                  </div>

                  {/* Popup: centered above this card, fits whole image (object-contain), smooth fade-zoom */}
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
                            className="h-auto w-auto max-h-[70vh] max-w-[90vw] md:max-w-[720px] rounded-md object-contain"
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

        {/* Fallback for very small viewports with coarse pointers:
            Keep behavior lightweight and responsive by showing the same popup anchored to the card.
            The max-w / max-h constraints ensure the full certificate is fully visible without cropping. */}
      </div>

      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </Section>
  )
}
