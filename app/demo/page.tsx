"use client"

import { useState } from "react"
import { MessageCircle, Video, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function DemoPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Subtle Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 via-transparent to-orange-100/10 dark:from-orange-950/10 dark:via-transparent dark:to-orange-900/5" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-100/20 dark:bg-orange-900/10 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-orange-200/15 dark:bg-orange-800/10 rounded-full blur-lg" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header with proper spacing for theme toggle */}
        <header className="p-6">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>

            {/* Theme Toggle positioned in header */}
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-orange-600 to-gray-900 dark:from-white dark:via-orange-400 dark:to-white bg-clip-text text-transparent mb-6">
                Choose Your Experience
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light">
                Get instant help through chat or video call with our AI assistant
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Chat Option */}
              <Link
                href="/chat"
                className="group relative block"
                onMouseEnter={() => setHoveredCard("chat")}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-xl shadow-gray-900/10 dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 hover:scale-105 hover:-translate-y-4 active:scale-95">
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/30 opacity-0 transition-opacity duration-500 ${hoveredCard === "chat" ? "opacity-100" : ""}`}
                  />

                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-orange-500/25 group-hover:shadow-orange-500/40 transition-all duration-300 group-hover:scale-110">
                      <MessageCircle className="w-10 h-10 text-white" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                      Chat Assistant
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                      Get instant text-based help and step-by-step guidance for your repair needs. Perfect for quick
                      fixes and detailed troubleshooting.
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-orange-600 dark:text-orange-400 font-semibold group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors duration-300">
                        <span className="text-lg">Start chatting</span>
                        <ArrowRight className="w-6 h-6 ml-3 transition-transform duration-300 group-hover:translate-x-2" />
                      </div>

                      <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                        Text-based
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Video Call Option */}
              <Link
                href="/video"
                className="group relative block"
                onMouseEnter={() => setHoveredCard("video")}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-xl shadow-gray-900/10 dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 hover:scale-105 hover:-translate-y-4 active:scale-95">
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/30 opacity-0 transition-opacity duration-500 ${hoveredCard === "video" ? "opacity-100" : ""}`}
                  />

                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-orange-500/25 group-hover:shadow-orange-500/40 transition-all duration-300 group-hover:scale-110">
                      <Video className="w-10 h-10 text-white" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                      Video Assistant
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                      Connect face-to-face with our AI for real-time visual guidance. Show your problem and get
                      immediate, personalized assistance.
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-orange-600 dark:text-orange-400 font-semibold group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors duration-300">
                        <span className="text-lg">Start video call</span>
                        <ArrowRight className="w-6 h-6 ml-3 transition-transform duration-300 group-hover:translate-x-2" />
                      </div>

                      <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                        Real-time
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="text-center mt-16">
              <p className="text-gray-500 dark:text-gray-400 font-light">
                Both options are powered by advanced AI and available 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
