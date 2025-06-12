"use client"

import type React from "react"
import { useCallback, useEffect } from "react"
import confetti from "canvas-confetti"

interface ConfettiExplosionProps {
  isExploding: boolean
  onComplete?: () => void
}

export const ConfettiExplosion: React.FC<ConfettiExplosionProps> = ({ isExploding, onComplete }) => {
  const fireConfetti = useCallback(() => {
    const end = Date.now() + 1500
    const colors = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444", "#06b6d4"]

    const animationFrame = () => {
      const timeLeft = end - Date.now()

      if (timeLeft <= 0) {
        if (onComplete) {
          onComplete()
        }
        return
      }

      const particleCount = 100 * (timeLeft / 1500)

      // Launch confetti from multiple points
      confetti({
        particleCount: Math.floor(particleCount / 4),
        spread: 120,
        origin: { x: 0.1, y: 0.3 },
        colors,
        startVelocity: 60,
        scalar: 1.4,
        gravity: 0.9,
        shapes: ["square", "circle"],
      })

      confetti({
        particleCount: Math.floor(particleCount / 4),
        spread: 120,
        origin: { x: 0.9, y: 0.3 },
        colors,
        startVelocity: 60,
        scalar: 1.4,
        gravity: 0.9,
        shapes: ["square", "circle"],
      })

      confetti({
        particleCount: Math.floor(particleCount / 4),
        spread: 100,
        origin: { x: 0.5, y: 0.1 },
        colors,
        startVelocity: 80,
        scalar: 1.2,
        gravity: 0.8,
        shapes: ["square", "circle"],
      })

      confetti({
        particleCount: Math.floor(particleCount / 4),
        spread: 80,
        origin: { x: 0.5, y: 0.6 },
        colors,
        startVelocity: 40,
        scalar: 1.6,
        gravity: 1.2,
        shapes: ["square", "circle"],
      })

      requestAnimationFrame(animationFrame)
    }

    animationFrame()
  }, [onComplete])

  useEffect(() => {
    if (isExploding) {
      fireConfetti()
    }
  }, [isExploding, fireConfetti])

  return null // No need for canvas element, confetti uses the default one
}
