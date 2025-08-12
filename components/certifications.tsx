"use client"

import Section from "./section"
import { motion } from "framer-motion"
import { useState } from "react"

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
  const [selectedCert, setSelectedCert] = useState<number | null>(null)

  return (
    <Section
      id="certs"
      title="Certificates & Awards"
      subtitle="Not for show — these are the reps I put in to level up my core skills."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {certs.map((cert, i) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group relative cursor-pointer"
            onClick={() => setSelectedCert(selectedCert === i ? null : i)}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition-all duration-300 hover:bg-white/10 hover:border-white/20 min-h-[44px]">
              <img
                src={cert.thumb || "/placeholder.svg"}
                alt={cert.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-sm font-medium text-white sm:text-base">{cert.title}</h3>
              </div>
            </div>

            {/* Full certificate popup */}
            {selectedCert === i && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                onClick={() => setSelectedCert(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-xl border border-white/20 bg-black/60 p-4 backdrop-blur"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={cert.full || cert.thumb || "/placeholder.svg"}
                    alt={`${cert.title} certificate`}
                    className="h-auto w-auto max-h-[80vh] max-w-full object-contain"
                    loading="lazy"
                  />
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="absolute right-2 top-2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
                  >
                    ✕
                  </button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
