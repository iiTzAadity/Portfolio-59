"use client"

import type React from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <section id={id} ref={ref} className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0, transition: { duration: 0.6 } } : {}}
        className="mb-10"
      >
        <h2 className="bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
          {title}
        </h2>
        {subtitle ? <p className="mt-2 text-foreground/70">{subtitle}</p> : null}
      </motion.div>
      {children}
    </section>
  )
}
