"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Hammer, Star, CheckCircle, Zap, Shield } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { TypedAnimation } from "@/components/typed-animation"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-white relative overflow-hidden transition-colors duration-500">
      {/* Cool Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-white to-orange-100/30 dark:from-gray-900 dark:via-gray-800 dark:to-orange-950/20 transition-colors duration-500" />

        {/* Animated gradient orbs that follow mouse */}
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-30 dark:opacity-20 transition-all duration-1000 ease-out"
          style={{
            background: "radial-gradient(circle, rgba(251,146,60,0.4) 0%, rgba(251,146,60,0.1) 50%, transparent 100%)",
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        />

        <div
          className="absolute w-80 h-80 rounded-full blur-2xl opacity-20 dark:opacity-15 transition-all duration-1500 ease-out"
          style={{
            background: "radial-gradient(circle, rgba(249,115,22,0.3) 0%, rgba(249,115,22,0.1) 50%, transparent 100%)",
            left: `${100 - mousePosition.x}%`,
            top: `${100 - mousePosition.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-orange-300/40 dark:bg-orange-600/30 rounded-full animate-float" />
        <div
          className="absolute top-40 right-32 w-6 h-6 bg-orange-400/30 dark:bg-orange-500/20 rotate-45 animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-32 left-40 w-3 h-3 bg-orange-500/50 dark:bg-orange-400/30 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-60 left-1/3 w-5 h-5 bg-orange-300/40 dark:bg-orange-600/25 rotate-12 animate-pulse-glow"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute bottom-40 right-20 w-4 h-4 bg-orange-400/35 dark:bg-orange-500/25 rounded-full animate-float"
          style={{ animationDelay: "4s" }}
        />

        {/* Drifting lines */}
        <div className="absolute top-1/4 left-0 w-px h-32 bg-gradient-to-b from-transparent via-orange-300/30 to-transparent animate-drift" />
        <div
          className="absolute top-1/2 right-0 w-px h-24 bg-gradient-to-b from-transparent via-orange-400/25 to-transparent animate-drift"
          style={{ animationDelay: "5s" }}
        />

        {/* Large background shapes */}
        <div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-100/20 to-orange-200/10 dark:from-orange-900/10 dark:to-orange-800/5 rounded-full blur-xl animate-pulse-glow"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-orange-50/30 to-orange-150/20 dark:from-orange-950/15 dark:to-orange-900/10 rounded-full blur-2xl animate-pulse-glow"
          style={{ animationDuration: "10s", animationDelay: "2s" }}
        />
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div
          className={`relative z-10 text-center max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Logo/Brand */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative group">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/25 transition-all duration-300 group-hover:shadow-orange-500/40 group-hover:scale-110">
                <div className="relative">
                  <Hammer className="w-10 h-10 text-white transform -rotate-12" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
            </div>
          </div>

          {/* App Name */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
            Fixly.ai
          </h1>

          {/* Animated Tagline */}
          <div className="text-xl md:text-2xl lg:text-3xl text-white mb-12 font-light leading-relaxed max-w-3xl mx-auto min-h-[4rem] flex items-center justify-center">
            <TypedAnimation text="Fix it yourself — with AI that knows how." speed={80} bold={true} />
          </div>

          {/* CTA Button */}
          <Link
            href="/demo"
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-5 rounded-2xl text-lg font-semibold transition-all duration-300 hover:from-orange-600 hover:to-orange-700 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 active:scale-95"
          >
            <span>Try Demo</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>
      </section>

      {/* About Section*/}
      <section className="relative py-20 px-6 bg-gradient-to-b from-transparent to-orange-50/30 dark:to-orange-950/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              AI-Powered Repair Assistant  
            </h2>
            <p className="text-xl text-white font-light max-w-3xl mx-auto leading-relaxed">
              Fixly.ai revolutionizes how you approach repairs. Our AI understands your problems, provides
              step-by-step guidance, and helps you fix things yourself with confidence. 
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg shadow-gray-900/5 dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Instant Diagnosis</h3>
              <p className="text-white leading-relaxed">
                Describe your problem or upload a photo, and our AI instantly identifies the issue and provides
                solutions.
              </p>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg shadow-gray-900/5 dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Step-by-Step Guidance</h3>
              <p className="text-white leading-relaxed">
                Get detailed, easy-to-follow instructions tailored to your specific situation and skill level.
              </p>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg shadow-gray-900/5 dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Safety First</h3>
              <p className="text-white leading-relaxed">
                Our AI prioritizes your safety, providing warnings and alternative solutions when needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Loved by DIY Enthusiasts
            </h2>
            <p className="text-xl text-white font-light">
              Join thousands who've successfully fixed their problems with Fixly.ai
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg shadow-gray-900/5 dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-orange-400 fill-current" />
                ))}
              </div>
              <p className="text-white mb-6 leading-relaxed">
                "Fixed my washing machine in 30 minutes! The AI guided me through each step perfectly. Saved me hundreds
                on a repair service."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  SM
                </div>
                <div>
                  <p className="font-semibold text-white">Sarah Martinez</p>
                  <p className="text-white text-sm">Homeowner</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg shadow-gray-900/5 dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-orange-400 fill-current" />
                ))}
              </div>
              <p className="text-white mb-6 leading-relaxed">
                "As a landlord, this app is a game-changer. Quick diagnostics and clear instructions help me handle
                minor repairs without calling professionals."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  DJ
                </div>
                <div>
                  <p className="font-semibold text-white">David Johnson</p>
                  <p className="text-white text-sm">Property Manager</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg shadow-gray-900/5 dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-orange-400 fill-current" />
                ))}
              </div>
              <p className="text-white mb-6 leading-relaxed">
                "The video call feature is incredible. Having an AI guide me through car maintenance in real-time made
                me feel like a pro mechanic!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  AL
                </div>
                <div>
                  <p className="font-semibold text-white">Alex Liu</p>
                  <p className="text-white text-sm">Car Enthusiast</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-orange-50/30 to-transparent dark:from-orange-950/20 dark:to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">About Fixly.ai</h2>
          <p className="text-xl text-white font-light leading-relaxed mb-8">
            Founded by a team of engineers and AI researchers, Fixly.ai was born from the frustration of expensive
            repair services and the desire to empower people to fix things themselves. Our mission is to democratize
            repair knowledge through cutting-edge artificial intelligence.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">50K+</div>
              <div className="text-white">Successful Repairs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-white">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-white">AI Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Fix It Yourself?
          </h2>
          <p className="text-xl text-white font-light mb-8">
            Join thousands of satisfied users who've saved time and money with Fixly.ai
          </p>
          <Link
            href="/demo"
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-5 rounded-2xl text-lg font-semibold transition-all duration-300 hover:from-orange-600 hover:to-orange-700 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 active:scale-95"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mr-3">
              <Hammer className="w-6 h-6 text-white transform -rotate-12" />
            </div>
            <span className="text-xl font-bold text-white">Fixly.ai</span>
          </div>
          <p className="text-white font-light">
            © 2024 Fixly.ai. Empowering DIY repairs with AI.
          </p>
        </div>
      </footer>
    </div>
  )
}
