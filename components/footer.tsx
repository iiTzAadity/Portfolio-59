"use client"

import { Github, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative mt-20">
      <div aria-hidden="true" className="absolute -top-1 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="h-[120px] w-full">
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          <path
            d="M0,64L48,58.7C96,53,192,43,288,58.7C384,75,480,117,576,122.7C672,128,768,96,864,85.3C960,75,1056,85,1152,96C1248,107,1344,117,1392,122.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            fill="url(#g1)"
            fillOpacity="0.35"
          />
        </svg>
      </div>
      <div className="relative z-10 bg-gradient-to-b from-transparent to-background pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-10">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-sm text-foreground/70">
              © {new Date().getFullYear()} Aditya Bhosale. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/iiTzAadity"
                target="_blank"
                rel="noreferrer"
                className="text-foreground/70 transition-colors hover:text-foreground"
                data-cursor="link"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]" />
              </a>
              <a
                href="https://www.linkedin.com/in/aditya-bhosale-853834261"
                target="_blank"
                rel="noreferrer"
                className="text-foreground/70 transition-colors hover:text-foreground"
                data-cursor="link"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]" />
              </a>
              <a
                href="https://www.instagram.com/iitz.aadity?igsh=MWtoaDQxYjc1MDRmYQ=="
                target="_blank"
                rel="noreferrer"
                className="text-foreground/70 transition-colors hover:text-foreground"
                data-cursor="link"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 drop-shadow-[0_0_10px_rgba(236,72,153,0.6)]" />
              </a>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <a href="#projects" className="text-foreground/70 hover:text-foreground" data-cursor="link">
                Projects
              </a>
              <a href="#contact" className="text-foreground/70 hover:text-foreground" data-cursor="link">
                Contact
              </a>
              <a href="#" className="text-foreground/70 hover:text-foreground" data-cursor="link">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
