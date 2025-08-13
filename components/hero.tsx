"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Instagram, MapPin, Download } from "lucide-react"
import { motion } from "framer-motion"
import Typing from "./typing"
import { useLang } from "./language-context"

export default function Hero() {
  const { t } = useLang()
  return (
    <section id="hero" className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 md:pt-24">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-400 to-cyan-400" />
            <span className="text-xs text-foreground/80">Frontend‑Focused · Full Stack</span>
          </div>
          <h1 className="mt-4 bg-gradient-to-br from-fuchsia-400 via-violet-400 to-cyan-300 bg-clip-text text-4xl font-extrabold leading-[1.05] text-transparent md:text-6xl">
            {t.heroTitle}
          </h1>
          <div className="mt-3 text-lg text-foreground/80 md:text-xl">
            <Typing text={t.heroSubtitle} />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button
              data-cursor="link"
              onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}
              className="relative overflow-hidden bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-500 text-white
                         shadow-[0_0_20px_rgba(168,85,247,0.55),0_0_32px_rgba(56,189,248,0.35)]
                         hover:shadow-[0_0_30px_rgba(168,85,247,0.75),0_0_60px_rgba(56,189,248,0.55)]
                         ring-1 ring-fuchsia-400/40 hover:ring-cyan-300/60 transition-all"
            >
              {/* Neon outer glow (subtle, intensifies on hover) */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -m-px rounded-md opacity-40 blur-xl
                           bg-[conic-gradient(at_50%_50%,#a855f7_0%,#22d3ee_50%,#a855f7_100%)]
                           transition-opacity duration-300 group-hover:opacity-70"
              />
              {/* Sheen sweep on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-[180%]
                           bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.28),transparent)]
                           transition-transform duration-700 ease-out group-hover:translate-x-[180%]"
              />
              <span className="relative z-10">Explore Skills</span>
            </Button>

            <a
              href="https://github.com/iiTzAadity"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              data-cursor="link"
              className="group rounded-xl border border-foreground/10 bg-background/60 p-3 backdrop-blur transition-colors hover:bg-foreground/5"
            >
              <Github className="h-5 w-5 text-foreground drop-shadow-[0_0_10px_rgba(168,85,247,0.6)] transition-transform group-hover:scale-110" />
            </a>

            <a
              href="https://www.linkedin.com/in/aditya-bhosale-853834261"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              data-cursor="link"
              className="group rounded-xl border border-foreground/10 bg-background/60 p-3 backdrop-blur transition-colors hover:bg-foreground/5"
            >
              <Linkedin className="h-5 w-5 text-foreground drop-shadow-[0_0_10px_rgba(56,189,248,0.6)] transition-transform group-hover:scale-110" />
            </a>

            <a
              href="https://www.instagram.com/iitz.aadity?igsh=MWtoaDQxYjc1MDRmYQ=="
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              data-cursor="link"
              className="group rounded-xl border border-foreground/10 bg-background/60 p-3 backdrop-blur transition-colors hover:bg-foreground/5"
            >
              <Instagram className="h-5 w-5 text-foreground drop-shadow-[0_0_10px_rgba(236,72,153,0.6)] transition-transform group-hover:scale-110" />
            </a>

            <a
              href="https://drive.google.com/file/d/1OdEsGdREfg7OUjZ-wO0hpBHs3A_D_2FQ/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download CV"
              data-cursor="link"
              className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 text-white px-4 py-2 rounded-md
                         shadow-[0_0_20px_rgba(16,185,129,0.55),0_0_32px_rgba(6,182,212,0.35)]
                         hover:shadow-[0_0_30px_rgba(16,185,129,0.75),0_0_60px_rgba(6,182,212,0.55)]
                         ring-1 ring-emerald-400/40 hover:ring-cyan-300/60 transition-all"
            >
              {/* Neon outer glow (subtle, intensifies on hover) */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -m-px rounded-md opacity-40 blur-xl
                           bg-[conic-gradient(at_50%_50%,#10b981_0%,#06b6d4_50%,#10b981_100%)]
                           transition-opacity duration-300 group-hover:opacity-70"
              />
              {/* Sheen sweep on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-[180%]
                           bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.28),transparent)]
                           transition-transform duration-700 ease-out group-hover:translate-x-[180%]"
              />
              <span className="relative z-10 flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download CV
              </span>
            </a>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur">
            <MapPin className="h-4 w-4 animate-bounce text-fuchsia-400" />
            <span className="text-sm text-foreground/80">Pune, Maharashtra</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.6 } }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          <div className="relative mx-auto aspect-square w-full max-w-[560px] overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_30%_20%,rgba(168,85,247,0.25),transparent_60%),radial-gradient(30%_40%_at_70%_80%,rgba(56,189,248,0.25),transparent_60%)]" />
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-fuchsia-500/30 to-cyan-400/30 blur-2xl" />
            <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-gradient-to-br from-violet-500/30 to-fuchsia-400/30 blur-2xl" />
            <div className="relative z-10 flex h-full items-center justify-center">
              {/* Replace with a Lottie or 3D avatar when available */}
              <img
                src="/3d-avatar-glassmorphism-neon.png"
                alt="Animated avatar illustration"
                className="h-40 w-40 rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-[0_0_40px_rgba(168,85,247,0.4)]"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
