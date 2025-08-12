"use client"

import type React from "react"

import Section from "./section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Code2, Wrench, Briefcase, Lightbulb, Users, Puzzle, Timer } from "lucide-react"
import { motion } from "framer-motion"

type SkillItem = { name: string; icon: string }
type SoftItem = { name: string; icon: React.ReactNode }

const technical: SkillItem[] = [
  { name: "HTML", icon: "/icons/html5.png" },
  { name: "CSS", icon: "/icons/css3.png" },
  { name: "JavaScript (ES6)", icon: "/icons/javascript.png" },
  { name: "Python", icon: "/icons/python.png" },
  { name: "Java", icon: "/icons/java.png" },
  { name: "PHP", icon: "/icons/php.png" },
  { name: "R", icon: "/icons/r.png" },
]

const technologies: SkillItem[] = [
  { name: "React.js", icon: "/icons/react.png" },
  { name: "Next.js", icon: "/icons/nextjs.png" },
  { name: "Node.js", icon: "/icons/nodejs.png" },
  { name: "Bootstrap", icon: "/icons/bootstrap.png" },
  { name: "MySQL", icon: "/icons/mysql.png" },
  { name: "REST APIs", icon: "/icons/rest.png" },
  { name: "Git", icon: "/icons/git.png" },
  { name: "AI tools", icon: "/icons/ai.png" },
]

const professional: SoftItem[] = [
  { name: "Adaptability", icon: <Lightbulb size={16} className="text-fuchsia-300" /> },
  { name: "Team Collaboration", icon: <Users size={16} className="text-cyan-300" /> },
  { name: "Problem Solving", icon: <Puzzle size={16} className="text-violet-300" /> },
  { name: "Time Management", icon: <Timer size={16} className="text-fuchsia-300" /> },
]

function TechGrid({ items }: { items: SkillItem[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
    >
      {items.map((i) => (
        <motion.div key={i.name} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
          <Card
            className="flex items-center gap-3 border-white/10 bg-white/5 p-3 backdrop-blur transition-colors hover:bg-white/10"
            data-cursor="link"
          >
            <img
              src={i.icon || "/placeholder.svg"}
              width={22}
              height={22}
              alt={`${i.name} logo`}
              className="h-[22px] w-[22px] drop-shadow-[0_0_10px_rgba(168,85,247,0.35)]"
              loading="lazy"
            />
            <span className="text-sm">{i.name}</span>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

function SoftGrid({ items }: { items: SoftItem[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((i) => (
        <span
          key={i.name}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-foreground/80 backdrop-blur"
        >
          {i.icon}
          {i.name}
        </span>
      ))}
    </div>
  )
}

export default function Skills() {
  return (
    <Section
      id="skills"
      title="Skills"
      subtitle="Clean, animated skill cards. Categories with smooth fades and slides."
    >
      <Tabs defaultValue="technical" className="w-full">
        <TabsList className="mb-6 border border-white/10 bg-white/10 backdrop-blur">
          <TabsTrigger value="technical" className="gap-2">
            <Code2 size={16} /> Technical
          </TabsTrigger>
          <TabsTrigger value="technologies" className="gap-2">
            <Wrench size={16} /> Technologies
          </TabsTrigger>
          <TabsTrigger value="professional" className="gap-2">
            <Briefcase size={16} /> Professional
          </TabsTrigger>
        </TabsList>

        <TabsContent value="technical">
          <TechGrid items={technical} />
        </TabsContent>
        <TabsContent value="technologies">
          <TechGrid items={technologies} />
        </TabsContent>
        <TabsContent value="professional">
          <SoftGrid items={professional} />
        </TabsContent>
      </Tabs>
    </Section>
  )
}
