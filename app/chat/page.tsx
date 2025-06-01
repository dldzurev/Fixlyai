"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Paperclip, X, Image, Video, Mic, Camera } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

interface ChatMessage {
  role: "user" | "assistant";
  content?: string;
  fileUrl?: string;
  fileType?: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [capturingCamera, setCapturingCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (capturingCamera) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(mediaStream => {
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        })
        .catch(err => {
          console.error("Camera access error:", err);
          setCapturingCamera(false);
        });
    } else {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [capturingCamera]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful AI assistant." },
            { role: "user", content: input }
          ],
          max_tokens: 150
        })
      });

      const data = await response.json();
      const botReply = data.choices?.[0]?.message?.content || "";
      const botMsg: ChatMessage = { role: "assistant", content: botReply };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = { role: "assistant", content: "Sorry, something went wrong." };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileUrl = URL.createObjectURL(file);
    let fileType: string;

    if (file.type.startsWith("image/")) fileType = "image";
    else if (file.type.startsWith("video/")) fileType = "video";
    else if (file.type.startsWith("audio/")) fileType = "audio";
    else fileType = "file";

    const fileMsg: ChatMessage = { role: "user", fileUrl, fileType };
    setMessages(prev => [...prev, fileMsg]);
    setShowMenu(false);
    scrollToBottom();
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(blob => {
      if (blob) {
        const fileUrl = URL.createObjectURL(blob);
        const fileMsg: ChatMessage = { role: "user", fileUrl, fileType: "image" };
        setMessages(prev => [...prev, fileMsg]);
        scrollToBottom();
      }
    }, "image/png");
    setCapturingCamera(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">
      {/* Header */}
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
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">Chat Assistant</span>
          </div>

          <div className="ml-6">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Chat UI */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-gray-900/5 dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-700 flex flex-col h-[500px]">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ minHeight: 0 }}>
            {messages.length ? (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl shadow-md ${
                      msg.role === "user"
                        ? "bg-orange-500 text-white"
                        : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    }`}
                  >
                    {msg.fileUrl ? (
                      msg.fileType === "image" ? (
                        <img src={msg.fileUrl} alt="user upload" className="rounded-xl max-h-48" />
                      ) : msg.fileType === "video" ? (
                        <video src={msg.fileUrl} controls className="rounded-xl max-h-48" />
                      ) : msg.fileType === "audio" ? (
                        <audio src={msg.fileUrl} controls className="w-full" />
                      ) : (
                        <a href={msg.fileUrl} className="underline" target="_blank" rel="noreferrer">
                          Download File
                        </a>
                      )
                    ) : (
                      <span>{msg.content}</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">Start the conversation...</p>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Camera Overlay */}
          {capturingCamera && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 flex flex-col items-center">
                <video
                  ref={videoRef}
                  autoPlay
                  className="w-80 h-60 rounded-xl mb-4"
                />
                <div className="flex space-x-4">
                  <button
                    onClick={capturePhoto}
                    className="bg-orange-500 text-white px-4 py-2 rounded-xl shadow-md"
                  >
                    Capture
                  </button>
                  <button
                    onClick={() => setCapturingCamera(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-xl shadow-md flex items-center"
                  >
                    <X className="w-4 h-4 mr-2" /> Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={sendMessage} className="border-t border-gray-200 dark:border-gray-700 p-3 flex items-center space-x-2 relative">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowMenu(prev => !prev)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Paperclip className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              {showMenu && (
                <div className="absolute bottom-12 left-0 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl shadow-xl py-2 z-10 w-48">
                  <label className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                    <Image className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-300" />
                    <input type="file" accept="*/*" onChange={handleFileUpload} className="hidden" />
                    Image/File
                  </label>
                  <label className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                    <Video className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-300" />
                    <input type="file" accept="video/*" onChange={handleFileUpload} className="hidden" />
                    Video
                  </label>
                  <label className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                    <Mic className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-300" />
                    <input type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
                    Audio
                  </label>
                  <button
                    onClick={() => { setCapturingCamera(true); setShowMenu(false); }}
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-b-2xl"
                  >
                    <Camera className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-300" />
                    Camera
                  </button>
                </div>
              )}
            </div>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded-full shadow-md disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "..." : "Send"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
