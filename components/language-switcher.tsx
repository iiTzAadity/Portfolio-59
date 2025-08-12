"use client"

import { useLang } from "./language-context"
import { Globe2 } from "lucide-react"

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang()
  return (
    <div
      className="flex items-center gap-1 rounded-lg border border-foreground/10 bg-background/60 px-2 py-1 backdrop-blur"
      data-cursor="link"
    >
      <Globe2 size={16} className="opacity-70" />
      <select
        aria-label="Language"
        className="cursor-pointer bg-transparent text-sm outline-none"
        value={lang}
        onChange={(e) => setLang(e.target.value as "en" | "hi" | "mr")}
      >
        <option value="en">EN</option>
        <option value="hi">HI</option>
        <option value="mr">MR</option>
      </select>
    </div>
  )
}
