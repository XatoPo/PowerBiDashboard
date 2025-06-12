"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, BarChart3, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import WaterEffectBackground from "@/components/water-effect-background"

export default function Dashboard() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Water effect background */}
      <WaterEffectBackground />

      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-0" />

      {/* Enhanced header - Fully responsive */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex items-center justify-between p-3 sm:p-4 md:p-6 bg-black/20 backdrop-blur-md border-b border-white/10"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/")}
          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-emerald-500/20 text-emerald-300 backdrop-blur-sm transition-all hover:bg-emerald-500/30 hover:scale-110 border border-emerald-400/30"
        >
          <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="sr-only">Volver</span>
        </Button>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 p-1.5 sm:p-2">
            <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
          </div>
          <h1 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-white bg-gradient-to-r from-emerald-300 to-blue-300 bg-clip-text text-transparent">
            Dashboard: Rendimiento Estudiantil
          </h1>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 text-emerald-300">
          <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="text-xs sm:text-sm font-medium hidden md:block">Analytics</span>
        </div>
      </motion.header>

      {/* Dashboard container - Fully responsive */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-1 items-center justify-center p-2 sm:p-4 md:p-6"
      >
        <div className="h-[calc(100vh-80px)] sm:h-[calc(100vh-100px)] md:h-[calc(100vh-140px)] w-full max-w-7xl overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl border border-emerald-400/30 sm:border-2 bg-black/30 p-1 sm:p-2 shadow-2xl backdrop-blur-md">
          {/* Loading overlay */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900/90 to-blue-900/90 rounded-lg sm:rounded-xl md:rounded-2xl z-10"
          >
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-2 sm:border-4 border-emerald-400 border-t-transparent mx-auto mb-2 sm:mb-4"></div>
              <p className="text-emerald-300 font-medium text-sm sm:text-base">Cargando Dashboard...</p>
            </div>
          </motion.div>

          <iframe
            title="Dashboard Rendimiento Estudiantil"
            width="100%"
            height="100%"
            src="https://app.powerbi.com/view?r=eyJrIjoiZTVhOTdhOTgtNjc5MS00NDljLTgzM2ItODNlZmU5ZWYyMTM4IiwidCI6ImM0YTY2YzM0LTJiYjctNDUxZi04YmUxLWIyYzI2YTQzMDE1OCIsImMiOjR9&pageName=68594ea636933e550544"
            frameBorder="0"
            allowFullScreen={true}
            className="h-full w-full rounded-md sm:rounded-lg md:rounded-xl shadow-inner"
          />
        </div>
      </motion.div>
    </div>
  )
}
