"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"
import { ConfettiExplosion } from "./confetti-explosion"

export default function GraduationCapButton() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [showSecret, setShowSecret] = useState(false)

  const handleClick = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setShowConfetti(true)
    setClickCount((prev) => prev + 1)

    // Show secret message after 3 clicks
    if (clickCount >= 2) {
      setShowSecret(true)
      setTimeout(() => setShowSecret(false), 3000)
    }

    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false)
      setShowConfetti(false)
    }, 2000)
  }

  return (
    <div className="relative">
      <motion.div
        onClick={handleClick}
        animate={
          isAnimating
            ? {
                y: [0, -50, 0],
                rotate: [0, -15, 15, -5, 0],
                scale: [1, 1.2, 1],
              }
            : {}
        }
        transition={{
          duration: 1,
          ease: "easeInOut",
          times: isAnimating ? [0, 0.4, 1] : [0],
        }}
        whileHover={{ scale: 1.05 }}
        className="cursor-pointer rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 p-3 sm:p-4 shadow-2xl transition-all duration-300"
      >
        <GraduationCap className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
      </motion.div>

      {/* Secret message - Responsive */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={showSecret ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
        className="absolute left-1/2 top-full mt-4 w-48 sm:w-64 -translate-x-1/2 rounded-lg bg-white p-2 sm:p-3 text-center text-xs sm:text-sm font-medium text-slate-800 shadow-xl"
      >
        <span className="block font-bold">¡Secreto desbloqueado! 🎉</span>
        <span className="text-xs">Flavio Villanueva Medina - Aprobado con honores</span>
      </motion.div>

      <ConfettiExplosion isExploding={showConfetti} />
    </div>
  )
}
