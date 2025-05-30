import Link from "next/link"
import { ArrowLeft, Video } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function VideoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">
      {/* Header with proper spacing for theme toggle */}
      <header className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Demo</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">Video Assistant</span>
          </div>

          {/* Theme Toggle positioned in header */}
          <div className="ml-6">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-700 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-orange-500/25">
            <Video className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Video Call Interface</h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            The video call functionality would be implemented here. Users would be able to show their repair problems in
            real-time and receive immediate visual guidance from our AI assistant.
          </p>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg shadow-gray-900/5 dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 mb-8">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Features would include:</h3>
            <ul className="text-left text-gray-600 dark:text-gray-300 space-y-2">
              <li>• Real-time video communication with AI</li>
              <li>• Visual problem identification</li>
              <li>• Live guidance and demonstrations</li>
              <li>• Screen annotation and highlighting</li>
              <li>• Recording for future reference</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
