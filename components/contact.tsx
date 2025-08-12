"use client"

import type React from "react"
import Section from "./section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser"

export default function Contact() {
  const [pending, setPending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPending(true)
    setSuccess(false)
    setError(null)

    try {
      if (formRef.current) {
        emailjs.init("MQ3a4ON-LVIDP3poT")

        await emailjs.sendForm(
          "service_hayk4pp", // Service ID
          "template_6ar5kx8", // Updated template ID from template_7afiuhf to template_6ar5kx8
          formRef.current,
          "MQ3a4ON-LVIDP3poT", // Public Key
        )
        setPending(false)
        setSuccess(true)
        formRef.current.reset()
      }
    } catch (err: any) {
      console.error("EmailJS error:", err)
      setPending(false)

      if (err.status === 400) {
        setError(
          "EmailJS configuration error. Please verify your Service ID, Template ID, and Public Key in the EmailJS dashboard.",
        )
      } else if (err.status === 401) {
        setError("Authentication failed. Please check your EmailJS public key.")
      } else if (err.status === 404) {
        setError("Template not found. Please verify your Template ID in EmailJS dashboard.")
      } else {
        setError(`Failed to send message: ${err.text || err.message || "Unknown error"}`)
      }
    }
  }

  return (
    <Section id="contact" title="Contact" subtitle="Let's build something unforgettable.">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h3 className="text-xl font-semibold">Get in touch</h3>
          <form ref={formRef} onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm text-foreground/70">Name</label>
              <Input
                required
                name="from_name"
                placeholder="Your name"
                className="border-white/10 bg-white/5 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-foreground/70">Email</label>
              <Input
                required
                type="email"
                name="from_email"
                placeholder="you@example.com"
                className="border-white/10 bg-white/5 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-foreground/70">Message</label>
              <Textarea
                required
                rows={5}
                name="message"
                placeholder="Tell me about your project..."
                className="border-white/10 bg-white/5 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <Button
              type="submit"
              disabled={pending}
              data-cursor="link"
              className="w-full bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-500 text-white"
            >
              {pending ? "Sending..." : "Send Message"}
            </Button>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={success ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-2 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-3 text-emerald-300">
                Thanks! Your message has been sent. I'll get back soon.
              </div>
            </motion.div>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={error ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-2 rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-red-300 text-sm">
                {error}
              </div>
            </motion.div>
          </form>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h3 className="text-xl font-semibold">Why work with me?</h3>
          <ul className="mt-4 space-y-3 text-foreground/80">
            <li>• Frontend-first mindset with strong UX taste.</li>
            <li>• Performance obsessed without sacrificing wow-factor.</li>
            <li>• English, Hindi, Marathi.</li>
            <li>• Shipping fast with clean, scalable code.</li>
          </ul>
          <img
            src="/images/collaboration-teamwork.png"
            alt="Professional collaboration and teamwork illustration"
            className="mt-6 h-40 w-full rounded-xl border border-white/10 object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/placeholder-ax4g5.png"
            }}
          />
        </div>
      </div>
    </Section>
  )
}
