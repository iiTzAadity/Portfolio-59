"use client"

import Section from "./section"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"

type EduItem = {
  time: string
  title: string
  desc: string
}

const EDU: EduItem[] = [
  {
    time: "2020–2023",
    title: "BCA",
    desc: "72% CGPA, Top 10%, Technical Club Member.",
  },
  {
    time: "2024–Present",
    title: "MCA",
    desc: "Currently pursuing.",
  },
]

export default function Education() {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [lineTop, setLineTop] = useState(0)
  const [centersX, setCentersX] = useState<number[]>([])
  const [edgeYs, setEdgeYs] = useState<number[]>([])

  // Alternate: index 0 (BCA) below the line; index 1 (MCA) above the line
  const isTopRow = (i: number) => i % 2 === 1

  useEffect(() => {
    const compute = () => {
      const track = trackRef.current
      if (!track) return
      const tRect = track.getBoundingClientRect()

      // Center line Y (relative to track)
      const newLineTop = tRect.height / 2
      setLineTop(newLineTop)

      const xs: number[] = []
      const edges: number[] = []

      cardRefs.current.forEach((el, idx) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        // Horizontal center relative to the track
        xs[idx] = r.left - tRect.left + r.width / 2
        // For the top row we connect from the card's bottom edge; for the bottom row from the top edge
        edges[idx] = isTopRow(idx) ? r.bottom - tRect.top : r.top - tRect.top
      })

      setCentersX(xs)
      setEdgeYs(edges)
    }

    // Initial + responsive measurements
    compute()
    const ro = new ResizeObserver(compute)
    cardRefs.current.forEach((el) => el && ro.observe(el))
    if (trackRef.current) ro.observe(trackRef.current)

    const scroller = scrollRef.current
    scroller?.addEventListener("scroll", compute, { passive: true })
    window.addEventListener("resize", compute)

    return () => {
      ro.disconnect()
      scroller?.removeEventListener("scroll", compute)
      window.removeEventListener("resize", compute)
    }
  }, [])

  return (
    <Section id="education" title="Education" subtitle="A responsive horizontal timeline.">
      <div ref={scrollRef} className="relative overflow-x-auto">
        <div ref={trackRef} className="relative min-w-[720px] px-2 py-16">
          {/* Center neon horizontal line */}
          <div
            className="pointer-events-none absolute left-0 right-0 h-[2px] bg-gradient-to-r from-fuchsia-400/60 via-violet-400/50 to-cyan-300/60"
            style={{ top: lineTop }}
            aria-hidden="true"
          />

          {/* Dots positioned DIRECTLY on the line, aligned to card centers */}
          <div className="pointer-events-none absolute inset-0">
            {EDU.map((_, i) => {
              const left = centersX[i]
              if (left == null) return null
              return (
                <div
                  key={`edu-dot-${i}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left, top: lineTop }}
                  aria-hidden="true"
                >
                  <span className="relative block h-3 w-3 rounded-full bg-gradient-to-br from-fuchsia-400 to-cyan-300 shadow-[0_0_14px_rgba(168,85,247,0.9)] animate-neon-blink" />
                  <span className="pointer-events-none absolute -inset-3 rounded-full bg-fuchsia-400/25 blur-2xl" />
                </div>
              )
            })}
          </div>

          {/* Connectors from each card's nearest edge to the dot on the line (no gaps) */}
          <div className="pointer-events-none absolute inset-0">
            {EDU.map((_, i) => {
              const left = centersX[i]
              const edgeY = edgeYs[i]
              if (left == null || edgeY == null) return null

              const dotY = lineTop
              const top = Math.min(edgeY, dotY)
              const height = Math.abs(dotY - edgeY)

              const gradientClass =
                edgeY < dotY
                  ? "bg-gradient-to-b from-cyan-300/70 to-transparent" // from card (top row) down to line
                  : "bg-gradient-to-b from-transparent to-fuchsia-400/70" // from line down to card (bottom row)

              return (
                <div
                  key={`edu-conn-${i}`}
                  className={`absolute w-[2px] ${gradientClass}`}
                  style={{ left, top, height, transform: "translateX(-1px)" }}
                  aria-hidden="true"
                />
              )
            })}
          </div>

          {/* Alternating cards: MCA above, BCA below (styling preserved) */}
          <div className="relative grid grid-flow-col auto-cols-[minmax(320px,1fr)] grid-rows-2 gap-6">
            {EDU.map((e, i) => {
              const topRow = isTopRow(i)
              return (
                <div
                  key={e.title}
                  ref={(el) => (cardRefs.current[i] = el)}
                  className={`${topRow ? "row-start-1 self-end" : "row-start-2 self-start"}`}
                >
                  <Card className="min-w-[320px] border-white/10 bg-white/5 backdrop-blur">
                    <CardContent className="p-5">
                      <div className="text-sm text-foreground/60">{e.time}</div>
                      <h3 className="text-lg font-semibold">{e.title}</h3>
                      <p className="mt-1 text-foreground/80">{e.desc}</p>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Neon blink animation reused */}
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
