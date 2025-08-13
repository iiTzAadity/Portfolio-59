"use client"

import Section from "./section"
import { motion } from "framer-motion"
import { useState } from "react"

const certs = [
  {
    title: "Python Zero to Hero",
    description: "Comprehensive Python programming certification covering fundamentals to advanced concepts",
    thumb: "/python-zero-to-hero-certificate.png",
    full: "/python-zero-to-hero-certificate.png",
  },
  {
    title: "Full Stack Web Dev",
    description: "Complete full-stack web development certification covering frontend and backend technologies",
    thumb: "/full-stack-web-dev-certificate.png",
    full: "/certificate-full-stack-web-dev-full.png",
  },
  {
    title: "Football Best Performer",
    description: "Athletic excellence award recognizing outstanding performance in football",
    thumb: "/football-best-performer-award.png",
    full: "/football-best-performer-award.png",
  },
  {
    title: "Top 10% Rank",
    description: "Academic achievement award for ranking in the top 10% of the class",
    thumb: "/top-10-percent-award.png",
    full: "/award-top-10-percent.png",
  },
  {
    title: "Generative AI, Recruiting & Talent Acquisition",
    description:
      "LinkedIn Learning certification covering AI applications in recruitment, talent management, and business intelligence",
    thumb:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Generative%20AI%2C%20Recruiting%2C%20and%20Talent%20Acquisition.jpg-pu5ZDn1wLkPcHFM38xBOs2uOs5Y4BF.jpeg",
    full: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Generative%20AI%2C%20Recruiting%2C%20and%20Talent%20Acquisition.jpg-pu5ZDn1wLkPcHFM38xBOs2uOs5Y4BF.jpeg",
  },
  {
    title: "AI for All: From Basics to GenAI Practice",
    description:
      "NVIDIA Academy certification covering artificial intelligence fundamentals and generative AI practical applications",
    thumb:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AI%20for%20All%20From%20Basics%20to%20GenAI%20Practice.jpg-ejuNUnDigEo5aZATdVcciwtCCfjrRF.jpeg",
    full: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AI%20for%20All%20From%20Basics%20to%20GenAI%20Practice.jpg-ejuNUnDigEo5aZATdVcciwtCCfjrRF.jpeg",
  },
  {
    title: "Introduction to Generative AI Studio",
    description: "Google Cloud certification demonstrating proficiency in Generative AI Studio tools and techniques",
    thumb:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Introduction%20to%20Generative%20AI%20Studio.jpg-mZ0uwTfAeKBO3GhaSouwCLs5FUVx8X.jpeg",
    full: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Introduction%20to%20Generative%20AI%20Studio.jpg-mZ0uwTfAeKBO3GhaSouwCLs5FUVx8X.jpeg",
  },
  {
    title: "TCS iON Career Edge - Young Professional",
    description:
      "Comprehensive professional development certification covering communication, presentation, interview skills, and career guidance",
    thumb:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TCS%20iON%20Career%20Edge%20-%20Young%20Professional.jpg-omHYGgYDCHT3HoF95uxMEDspioVcVc.jpeg",
    full: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TCS%20iON%20Career%20Edge%20-%20Young%20Professional.jpg-omHYGgYDCHT3HoF95uxMEDspioVcVc.jpeg",
  },
  {
    title: "Google Cloud Certified Generative AI Leader",
    description:
      "Advanced Google Cloud certification recognizing expertise in generative AI leadership and implementation",
    thumb:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Generative%20AI%20Leader.jpg-bZwXncBq0r49Iiby7YIIc7bzllzAq1.jpeg",
    full: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Generative%20AI%20Leader.jpg-bZwXncBq0r49Iiby7YIIc7bzllzAq1.jpeg",
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
      <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
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
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition-all duration-300 hover:bg-white/10 hover:border-white/20 min-h-[120px] sm:min-h-[140px] md:min-h-[160px]">
              <img
                src={cert.thumb || "/placeholder.svg"}
                alt={cert.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                <h3 className="text-xs font-medium text-white sm:text-sm md:text-base line-clamp-2 mb-1">
                  {cert.title}
                </h3>
                <p className="text-xs text-white/70 line-clamp-2 hidden sm:block">{cert.description}</p>
              </div>
            </div>

            {selectedCert === i && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4"
                onClick={() => setSelectedCert(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative max-h-[95vh] max-w-[95vw] sm:max-h-[90vh] sm:max-w-[90vw] overflow-hidden rounded-xl border border-white/20 bg-black/60 p-2 sm:p-4 backdrop-blur"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={cert.full || cert.thumb || "/placeholder.svg"}
                    alt={`${cert.title} certificate`}
                    className="h-auto w-auto max-h-[85vh] sm:max-h-[80vh] max-w-full object-contain"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg"
                    }}
                  />
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="absolute right-1 top-1 sm:right-2 sm:top-2 rounded-full bg-black/60 p-2 sm:p-3 text-white hover:bg-black/80 min-w-[44px] min-h-[44px] flex items-center justify-center text-lg"
                    aria-label="Close certificate view"
                  >
                    ✕
                  </button>
                  <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 bg-black/60 backdrop-blur rounded-lg p-2 sm:p-3">
                    <h4 className="text-sm sm:text-base font-medium text-white mb-1">{cert.title}</h4>
                    <p className="text-xs sm:text-sm text-white/80">{cert.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
