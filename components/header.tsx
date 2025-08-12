"use client"

import { Button } from "@/components/ui/button"
import { Sun, MoonStar, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import LanguageSwitcher from "./language-switcher"

const nav = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Certificates", href: "#certs" },
  { label: "Contact", href: "#contact" },
] as const

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <a href="#" className="group flex items-center gap-2" data-cursor="link" aria-label="Aditya Bhosale Home">
          <div className="relative h-8 w-8">
            <img
              src={mounted && theme === "dark" ? "/images/logo-dark.png" : "/images/logo-light.png"}
              alt="Aditya Bhosale logo"
              width={32}
              height={32}
              className="h-8 w-8 rounded-xl object-cover border border-white/10 shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all duration-300"
              loading="lazy"
              onError={(e) => {
                const t = e.currentTarget as HTMLImageElement
                t.onerror = null
                // Fallback to original image if logo variants fail
                t.src = "/images/logo-hero.jpg"
              }}
            />
          </div>
          <span className="font-semibold tracking-tight">Aditya Bhosale</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="relative text-sm text-foreground/80 transition-colors hover:text-foreground"
              data-cursor="link"
            >
              <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-fuchsia-400 after:to-cyan-400 after:transition-all hover:after:w-full">
                {n.label}
              </span>
            </a>
          ))}
          <Button
            data-cursor="link"
            className="border-0 bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-500 text-white shadow-[0_0_30px_rgba(56,189,248,0.35)] hover:shadow-[0_0_45px_rgba(168,85,247,0.45)]"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Hire Me
          </Button>
          <LanguageSwitcher />
          <button
            data-cursor="link"
            aria-label="Toggle theme"
            className="rounded-lg p-2 transition-colors hover:bg-foreground/5"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {mounted && theme === "dark" ? <Sun size={18} /> : <MoonStar size={18} />}
          </button>
        </nav>

        <button
          className="rounded-lg p-2 transition-colors hover:bg-foreground/5 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle Menu"
          data-cursor="link"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <nav
        style={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        className="overflow-hidden transition-all md:hidden"
      >
        <div className="flex flex-col gap-3 px-4 pb-4">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="py-2 text-foreground/80 hover:text-foreground"
              onClick={() => setOpen(false)}
              data-cursor="link"
            >
              {n.label}
            </a>
          ))}
          <div className="flex items-center gap-3">
            <Button
              data-cursor="link"
              className="w-full bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-500 text-white"
              onClick={() => {
                setOpen(false)
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Hire Me
            </Button>
            <LanguageSwitcher />
            <button
              data-cursor="link"
              aria-label="Toggle theme"
              className="rounded-lg p-2 transition-colors hover:bg-foreground/5"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {mounted && theme === "dark" ? <Sun size={18} /> : <MoonStar size={18} />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
