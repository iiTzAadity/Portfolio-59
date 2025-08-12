"use client"

import Section from "./section"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Trophy, Users } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export default function About() {
  const [useGifFallback, setUseGifFallback] = useState(false)

  return (
    <Section
      id="about"
      title="About Me"
      subtitle="Open-source fixer + project builder — I enjoy polishing UX, debugging hard bugs, and shipping neat details."
    >
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          viewport={{ once: true }}
          className="prose prose-invert max-w-none text-foreground/80"
        >
          <p>
            Frontend-focused full stack developer skilled in HTML, CSS, JavaScript, React, with hands-on GitHub project
            deployment. Familiar with REST APIs, version control (Git), and integrating AI through prompt engineering.
            Enthusiastic about building scalable, responsive web apps with modern tech stacks.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Badge className="backdrop-blur bg-white/10 border-white/10" variant="secondary">
              <Sparkles className="mr-2 h-4 w-4 text-fuchsia-400" /> Top 10% Rank
            </Badge>
            <Badge className="backdrop-blur bg-white/10 border-white/10" variant="secondary">
              <Trophy className="mr-2 h-4 w-4 text-cyan-300" /> Football Best Performer
            </Badge>
            <Badge className="backdrop-blur bg-white/10 border-white/10" variant="secondary">
              <Users className="mr-2 h-4 w-4 text-violet-300" /> Active Coding Club Member
            </Badge>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_20%_10%,rgba(168,85,247,0.18),transparent_60%),radial-gradient(30%_30%_at_80%_90%,rgba(56,189,248,0.18),transparent_60%)]" />
            <div className="relative z-10">
              <div className="mb-2 text-sm text-foreground/60">Coding Is Fun</div>
              {!useGifFallback ? (
                <video
                  className="h-64 w-full rounded-2xl border border-white/10 object-cover"
                  style={{ objectFit: "cover" }}
                  poster="/images/coding-fun-poster.png"
                  playsInline
                  muted
                  autoPlay
                  loop
                  preload="metadata"
                  onError={() => setUseGifFallback(true)}
                >
                  <source src="/images/coding-fun.webm" type="video/webm" />
                  <source src="/images/coding-fun.mp4" type="video/mp4" />
                </video>
              ) : (
                <img
                  src="/images/coding-fun.gif"
                  alt="Captivating coding animation GIF"
                  width={1024}
                  height={512}
                  className="h-64 w-full rounded-2xl border border-white/10 object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const t = e.currentTarget as HTMLImageElement
                    if (!t.dataset.fallback) {
                      t.dataset.fallback = "1"
                      t.src = "/images/coding-fun-backup.gif"
                    } else {
                      t.src = "/images/coding-fun-poster.png"
                    }
                  }}
                />
              )}
              <p className="mt-4 text-foreground/70">{"Code is like humor. When you have to explain it, it’s bad."}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
