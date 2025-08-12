"use client"

import { useEffect, useState } from "react"

export default function Typing({ text = "Building with love for the web." }: { text?: string }) {
  const [shown, setShown] = useState("")
  useEffect(() => {
    setShown("")
    let i = 0
    const id = setInterval(() => {
      i++
      setShown(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, 24)
    return () => clearInterval(id)
  }, [text])
  return (
    <span className="after:ml-1 after:inline-block after:h-5 after:w-[2px] after:-translate-y-[2px] after:animate-pulse after:bg-foreground/60">
      {shown}
    </span>
  )
}
