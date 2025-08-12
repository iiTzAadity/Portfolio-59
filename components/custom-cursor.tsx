"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const target = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })
  const [enabled, setEnabled] = useState(true)
  const [hoveringLink, setHoveringLink] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches
    if (isCoarse) {
      setEnabled(false)
      return
    }

    const move = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }
    const over = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        setHoveringLink(Boolean(e.target.closest('[data-cursor="link"]')))
      }
    }
    const out = () => setHoveringLink(false)

    window.addEventListener("mousemove", move)
    window.addEventListener("mouseover", over)
    window.addEventListener("mouseout", out)

    let raf = 0
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n
    const tick = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.2)
      pos.current.y = lerp(pos.current.y, target.current.y, 0.2)
      const d = dotRef.current
      const r = ringRef.current
      if (d) d.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      if (r) r.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseover", over)
      window.removeEventListener("mouseout", out)
    }
  }, [])

  if (!enabled) return null

  const isDark = resolvedTheme === "dark"

  return (
    <>
      <div
        ref={dotRef}
        className={`pointer-events-none fixed z-[100] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
          isDark ? "bg-white" : "bg-foreground"
        }`}
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
          contain: "layout paint style",
        }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,box-shadow] duration-150 ${
          hoveringLink ? "h-10 w-10" : "h-6 w-6"
        }`}
        style={{
          boxShadow: isDark ? "0 0 0 1.5px rgba(255,255,255,0.9)" : "0 0 0 1.5px rgba(20,20,20,0.9)",
          willChange: "transform",
          backfaceVisibility: "hidden",
          contain: "layout paint style",
        }}
        aria-hidden="true"
      />
    </>
  )
}
