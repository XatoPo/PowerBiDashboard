"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import EducationalBackground from "@/components/educational-background"
import WaterEffectBackground from "@/components/water-effect-background"
import GraduationCapButton from "@/components/graduation-cap"

export default function Home() {
  const router = useRouter()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Water effect background */}
      <WaterEffectBackground />

      {/* Educational floating elements */}
      <EducationalBackground />

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-5" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center py-8"
      >
        {/* Header with interactive graduation cap */}
        <motion.div variants={itemVariants} className="mb-6 sm:mb-8 flex items-center gap-4">
          <GraduationCapButton />
        </motion.div>

        {/* Main title - Fully responsive */}
        <motion.div variants={itemVariants} className="mb-6 sm:mb-8 lg:mb-12">
          <h1 className="bg-gradient-to-r from-emerald-300 via-blue-300 to-purple-300 bg-clip-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black text-transparent tracking-tight leading-tight">
            Prueba Técnica BI
          </h1>
          <motion.h2
            variants={itemVariants}
            className="mt-2 sm:mt-4 bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-transparent leading-tight"
          >
            "Rendimiento Estudiantil"
          </motion.h2>
        </motion.div>

        {/* Subtitle with better contrast - Fully responsive */}
        <motion.div
          variants={itemVariants}
          className="mb-8 sm:mb-12 lg:mb-16 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-6 lg:p-8 shadow-2xl"
        >
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">Realizada por</p>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-emerald-300 mb-1 sm:mb-2 leading-tight">
            Flavio Villanueva Medina
          </p>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-200 font-medium">Ingeniero de Software</p>
        </motion.div>

        {/* Enhanced CTA button - Responsive */}
        <motion.div
          variants={itemVariants}
          whileHover={{
            scale: 1.1,
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.95 }}
          className="relative mb-6 sm:mb-8"
        >
          {/* Glowing ring effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 blur-xl opacity-75 animate-pulse" />

          <Button
            onClick={() => router.push("/dashboard")}
            className="relative group h-16 w-16 sm:h-18 sm:w-18 md:h-20 md:w-20 rounded-full bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 p-0 shadow-2xl border-4 border-white/30 transition-all duration-300 hover:shadow-emerald-500/50"
          >
            <ArrowRight className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-white transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
            <span className="sr-only">Ver Dashboard</span>
          </Button>
        </motion.div>

        {/* Floating instruction text - Responsive */}
        <motion.p variants={itemVariants} className="text-sm sm:text-base md:text-lg text-white/80 font-medium px-4">
          Haz clic para explorar el dashboard
        </motion.p>
      </motion.div>
    </div>
  )
}
