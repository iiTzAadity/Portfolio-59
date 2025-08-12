import type * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 dark:bg-destructive/60",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      // Theme-aware neon baseline for all buttons
      className={cn(
        buttonVariants({ variant, size, className }),
        "relative group overflow-hidden", // for sheen/glow
        "ring-1 ring-fuchsia-400/30 dark:ring-cyan-300/30",
        "shadow-[0_0_10px_rgba(168,85,247,0.25),0_0_18px_rgba(56,189,248,0.2)]",
        "hover:shadow-[0_0_18px_rgba(168,85,247,0.45),0_0_36px_rgba(56,189,248,0.35)]",
        "transition-all",
      )}
      {...props}
    >
      {/* Neon outer conic glow (behind content) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -m-px rounded-md opacity-35 blur-xl
                   bg-[conic-gradient(at_50%_50%,theme(colors.fuchsia.500)_0%,theme(colors.cyan.400)_50%,theme(colors.fuchsia.500)_100%)]
                   transition-opacity duration-300 group-hover:opacity-70"
      />
      {/* Sheen sweep on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-[180%]
                   bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.28),transparent)]
                   transition-transform duration-700 ease-out group-hover:translate-x-[180%]"
      />
      {/* Actual content above effects */}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </Comp>
  )
}

export { Button, buttonVariants }
