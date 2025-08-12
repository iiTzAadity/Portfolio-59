"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const particles = useRef<{ x: number; y: number; vx: number; vy: number; r: number }[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(2, window.devicePixelRatio || 1)
    const isCoarse = window.matchMedia("(pointer: coarse)").matches
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const lowPower = isCoarse || prefersReducedMotion || window.innerWidth < 420

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = w + "px"
      canvas.style.height = h + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    // Particles setup (lightweight, auto-throttled)
    const baseCount = Math.min(90, Math.floor((window.innerWidth * window.innerHeight) / 22000))
    const count = lowPower ? Math.max(16, Math.floor(baseCount * 0.35)) : baseCount

    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * (lowPower ? 0.35 : 0.6),
      vy: (Math.random() - 0.5) * (lowPower ? 0.35 : 0.6),
      r: (Math.random() * 1.8 + 0.6) * (lowPower ? 0.8 : 1),
    }))

    const loop = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      // Subtle neon gradient glow
      const grad = ctx.createRadialGradient(w * 0.7, h * 0.2, 100, w * 0.7, h * 0.2, Math.max(w, h))
      grad.addColorStop(0, "rgba(168,85,247,0.18)")
      grad.addColorStop(0.45, "rgba(56,189,248,0.12)")
      grad.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // Particles
      ctx.fillStyle = "rgba(236,72,153,0.8)"
      for (const p of particles.current) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Connecting lines (skip on low power)
      if (!lowPower) {
        for (let i = 0; i < particles.current.length; i++) {
          for (let j = i + 1; j < particles.current.length; j++) {
            const a = particles.current[i]
            const b = particles.current[j]
            const dx = a.x - b.x
            const dy = a.y - b.y
            const dist = Math.hypot(dx, dy)
            if (dist < 120) {
              ctx.strokeStyle = `rgba(99,102,241,${1 - dist / 120})`
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.stroke()
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    if (!prefersReducedMotion) {
      rafRef.current = requestAnimationFrame(loop)
    }

    return () => {
      window.removeEventListener("resize", resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_10%_10%,rgba(236,72,153,0.08),transparent_60%),radial-gradient(60%_50%_at_90%_0%,rgba(56,189,248,0.08),transparent_60%)]" />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}
