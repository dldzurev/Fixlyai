"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center gap-3">
        <Sun className="w-5 h-5 text-gray-400" />
        <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
          <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
        </div>
        <Moon className="w-5 h-5 text-gray-400" />
      </div>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <div className="flex items-center gap-3">
      <Sun
        className={`w-5 h-5 transition-colors duration-300 ${isDark ? "text-gray-500 dark:text-gray-400" : "text-orange-500"}`}
      />
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
          isDark ? "bg-orange-500" : "bg-gray-300"
        }`}
        role="switch"
        aria-checked={isDark}
        aria-label="Toggle theme"
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
            isDark ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
      <Moon className={`w-5 h-5 transition-colors duration-300 ${isDark ? "text-orange-400" : "text-gray-500"}`} />
    </div>
  )
}
