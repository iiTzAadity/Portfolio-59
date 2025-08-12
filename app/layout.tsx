import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Space_Grotesk, Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-display" })

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily}, var(--font-inter), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  --font-sans: ${GeistSans.variable}, var(--font-inter);
  --font-mono: ${GeistMono.variable};
  --font-display: var(--font-display);
}
h1, h2, h3, h4 {
  font-family: var(--font-display), var(--font-sans), ui-sans-serif;
  letter-spacing: -0.01em;
}
::selection {
  background: rgba(168, 85, 247, 0.35);
  color: white;
}
        `}</style>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
