"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function EducationalBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Create floating educational elements
    const elements: THREE.Mesh[] = []

    // Create different geometric shapes representing data/education
    const geometries = [
      new THREE.BoxGeometry(0.3, 0.3, 0.3),
      new THREE.SphereGeometry(0.2, 8, 6),
      new THREE.ConeGeometry(0.2, 0.4, 6),
      new THREE.OctahedronGeometry(0.25),
      new THREE.TetrahedronGeometry(0.3),
    ]

    // Educational color palette
    const colors = [
      0x10b981, // emerald
      0x3b82f6, // blue
      0x8b5cf6, // purple
      0xf59e0b, // amber
      0xef4444, // red
      0x06b6d4, // cyan
    ]

    // Create floating elements
    for (let i = 0; i < 50; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)]
      const material = new THREE.MeshBasicMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.6,
      })

      const element = new THREE.Mesh(geometry, material)

      // Random positioning
      element.position.x = (Math.random() - 0.5) * 20
      element.position.y = (Math.random() - 0.5) * 20
      element.position.z = (Math.random() - 0.5) * 20

      // Random rotation
      element.rotation.x = Math.random() * Math.PI
      element.rotation.y = Math.random() * Math.PI
      element.rotation.z = Math.random() * Math.PI

      // Store initial position for animation
      element.userData = {
        initialX: element.position.x,
        initialY: element.position.y,
        initialZ: element.position.z,
        speedX: (Math.random() - 0.5) * 0.02,
        speedY: (Math.random() - 0.5) * 0.02,
        speedZ: (Math.random() - 0.5) * 0.02,
        rotationSpeedX: (Math.random() - 0.5) * 0.02,
        rotationSpeedY: (Math.random() - 0.5) * 0.02,
        rotationSpeedZ: (Math.random() - 0.5) * 0.02,
      }

      elements.push(element)
      scene.add(element)
    }

    // Create connecting lines between some elements
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.2,
    })

    const lines: THREE.Line[] = []
    for (let i = 0; i < 20; i++) {
      const points = []
      const element1 = elements[Math.floor(Math.random() * elements.length)]
      const element2 = elements[Math.floor(Math.random() * elements.length)]

      points.push(element1.position.clone())
      points.push(element2.position.clone())

      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(geometry, lineMaterial)
      lines.push(line)
      scene.add(line)
    }

    // Position camera
    camera.position.set(0, 0, 8)

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Animate floating elements
      elements.forEach((element) => {
        // Floating motion
        element.position.x = element.userData.initialX + Math.sin(elapsedTime * element.userData.speedX * 10) * 2
        element.position.y = element.userData.initialY + Math.cos(elapsedTime * element.userData.speedY * 10) * 2
        element.position.z = element.userData.initialZ + Math.sin(elapsedTime * element.userData.speedZ * 10) * 1

        // Rotation
        element.rotation.x += element.userData.rotationSpeedX
        element.rotation.y += element.userData.rotationSpeedY
        element.rotation.z += element.userData.rotationSpeedZ

        // Pulsing opacity
        const material = element.material as THREE.MeshBasicMaterial
        material.opacity = 0.3 + Math.sin(elapsedTime * 2 + element.userData.initialX) * 0.3
      })

      // Update connecting lines
      lines.forEach((line, index) => {
        const element1 = elements[index * 2] || elements[0]
        const element2 = elements[index * 2 + 1] || elements[1]

        const points = [element1.position.clone(), element2.position.clone()]
        line.geometry.setFromPoints(points)
      })

      // Render
      renderer.render(scene, camera)

      // Call animate again on the next frame
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Cleanup
      elements.forEach((element) => {
        scene.remove(element)
        element.geometry.dispose()
        if (Array.isArray(element.material)) {
          element.material.forEach((material) => material.dispose())
        } else {
          element.material.dispose()
        }
      })

      lines.forEach((line) => {
        scene.remove(line)
        line.geometry.dispose()
        if (Array.isArray(line.material)) {
          line.material.forEach((material) => material.dispose())
        } else {
          line.material.dispose()
        }
      })

      geometries.forEach((geometry) => geometry.dispose())
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 -z-10" />
}
