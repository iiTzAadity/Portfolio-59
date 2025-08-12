"use client"

import type React from "react"
import { createContext, useContext, useMemo, useState } from "react"

type Lang = "en" | "hi" | "mr"
type Strings = {
  heroTitle: string
  heroSubtitle: string
}

const STRINGS: Record<Lang, Strings> = {
  en: {
    heroTitle: "Hi, I’m Aditya Bhosale — Frontend Dev | Python | JavaScript",
    heroSubtitle: "Building creative, scalable, and responsive web apps with modern tech.",
  },
  hi: {
    heroTitle: "नमस्ते, मैं आदित्य भोसले — फ्रंटएंड डेव | पाइथन | जावास्क्रिप्ट",
    heroSubtitle: "आधुनिक टेक के साथ रचनात्मक, स्केलेबल और रिस्पॉन्सिव वेब ऐप बनाता हूँ।",
  },
  mr: {
    heroTitle: "नमस्कार, मी आदित्य भोसले — फ्रंटएंड डेव | पायथन | जावास्क्रिप्ट",
    heroSubtitle: "आधुनिक तंत्रज्ञानासोबत क्रिएटिव्ह, स्केलेबल आणि रेस्पॉन्सिव्ह वेब अॅप्स तयार करतो.",
  },
}

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Strings }>({
  lang: "en",
  setLang: () => {},
  t: STRINGS.en,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en")
  const t = useMemo(() => STRINGS[lang], [lang])
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}
