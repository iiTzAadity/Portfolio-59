"use client"

import type React from "react"
import Section from "./section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { useEffect, useState } from "react"

type Project = {
  id: string
  name: string
  desc: string
  tech: string[]
  demo?: string
  repo?: string
  image: string
}

const projects: Project[] = [
  {
    id: "project-face-recognition",
    name: "Face Recognition",
    desc: "Real-time face detection and recognition in the browser. [Coming Soon]",
    tech: ["HTML", "CSS", "JS", "Canvas"],
    repo: "https://github.com/iiTzAadity",
    image: "/projects/face-recognition.png",
  },
  {
    id: "project-airline-management-system",
    name: "Airline Management System",
    desc: "Scheduling, ticketing, and CRUD with robust data handling. [Coming Soon]",
    tech: ["Java", "MySQL", "HTML", "CSS"],
    repo: "https://github.com/iiTzAadity",
    image: "/projects/airline-management.png",
  },
  {
    id: "project-ecommerce-open-source",
    name: "E-Commerce Website (Open Source)",
    desc: "Contributed to an open source Next.js e-commerce application by fixing UI bugs, making it fully responsive, and enhancing user experience using AI-powered development tools.",
    tech: ["Next.js", "React", "CSS", "AI Tools"],
    demo: "https://nextjs-ecommerce-example.vercel.app/",
    image: "/projects/ecommerce-open-source.png",
  },
  {
    id: "project-web-games-tic-tac-toe",
    name: "Web Game: Tic Tac Toe",
    desc: "Classic game with sleek UI and optional AI.",
    tech: ["React", "TypeScript"],
    demo: "https://iitzaadity.github.io/TIC-TAC-TOC-GAME/",
    repo: "https://github.com/iiTzAadity",
    image: "/projects/tic-tac-toe.png",
  },
  {
    id: "project-web-games-rps",
    name: "Web Game: Rock Paper Scissors",
    desc: "Animated, responsive mini game.",
    tech: ["JavaScript", "CSS"],
    demo: "https://iitzaadity.github.io/ROC-PAPER-SCISSORS-GAME/",
    repo: "https://github.com/iiTzAadity",
    image: "/projects/rock-paper-scissors.png",
  },
  {
    id: "project-ask-her-out",
    name: "Ask Her Out Site",
    desc: "Playful, interactive microsite with delightful animations.",
    tech: ["React", "Framer Motion"],
    demo: "https://iitzaadity.github.io/Expressing-love---Impress-crush/",
    repo: "https://github.com/iiTzAadity",
    image: "/projects/ask-her-out.png",
  },
  {
    id: "project-anime-streaming-website",
    name: "Anime Streaming Website",
    desc: "Aniwatch-inspired UI with modern, responsive UX.",
    tech: ["Next.js", "Tailwind"],
    demo: "https://aniwatchtv.to/home",
    repo: "https://github.com/iiTzAadity",
    image: "/projects/anime-streaming.png",
  },
]

function TiltCard({ p, highlighted }: { p: Project; highlighted: boolean }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-50, 50], [12, -12])
  const rotateY = useTransform(x, [-50, 50], [-12, 12])

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = e.clientX - rect.left - rect.width / 2
    const py = e.clientY - rect.top - rect.height / 2
    x.set((px / rect.width) * 100)
    y.set((py / rect.height) * 100)
  }

  function onLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      id={p.id}
      animate={
        highlighted ? { scale: [1, 1.02, 1], transition: { duration: 0.6, repeat: 4, ease: "easeInOut" } } : undefined
      }
    >
      <Card
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-cursor="link"
        className={`border-white/10 bg-white/5 backdrop-blur transition-colors hover:bg-white/10 ${
          highlighted ? "ring-2 ring-fuchsia-400/80 shadow-[0_0_30px_rgba(168,85,247,0.45)]" : ""
        }`}
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10">
          <img
            src={p.image || "/placeholder.svg?height=630&width=1200&query=project%20preview"}
            alt={`${p.name} preview`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 will-change-transform hover:scale-[1.03]"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement
              if (target.src.endsWith("rock-paper-scissors.png") || target.src.endsWith("airline-management.png")) {
                target.onerror = null
                target.src = "/rock-paper-scissors-web-game.png"
              } else {
                target.onerror = null
                target.src = "/project-management-dashboard.png"
              }
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
        </div>
        <CardHeader>
          <CardTitle className="text-foreground">{p.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/80">{p.desc}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-foreground/70"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {p.demo ? (
              <Button
                data-cursor="link"
                onClick={() => p.demo && window.open(p.demo, "_blank")}
                className="gap-2 bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-500 text-white"
              >
                <ExternalLink size={16} />
                Live Demo
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function Projects() {
  const [highlightedId, setHighlightedId] = useState<string | null>(null)

  useEffect(() => {
    const onHighlight = (e: Event) => {
      const id = (e as CustomEvent<string>).detail
      setHighlightedId(id)
      const timer = setTimeout(() => setHighlightedId(null), 2500)
      return () => clearTimeout(timer)
    }
    window.addEventListener("highlight-project", onHighlight as EventListener)
    return () => window.removeEventListener("highlight-project", onHighlight as EventListener)
  }, [])

  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="A mix of fun and functional builds — explore the demos and how I approached the problems."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <TiltCard key={p.id} p={p} highlighted={highlightedId === p.id} />
        ))}
      </div>
    </Section>
  )
}
