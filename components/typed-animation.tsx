"use client"

import { useState, useEffect } from "react"

interface TypedAnimationProps {
  text: string
  speed?: number
  className?: string
  bold?: boolean
}

export function TypedAnimation({ text, speed = 100, className = "", bold = false }: TypedAnimationProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return (
    <span className={`${className} ${bold ? "font-bold" : ""}`}>
      {displayedText}
      {currentIndex < text.length && <span className="animate-pulse">|</span>}
    </span>
  )
}
