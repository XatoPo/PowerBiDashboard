"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function WaterBackground() {
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

    // Create water geometry
    const waterGeometry = new THREE.PlaneGeometry(20, 20, 100, 100)

    // Create water material with custom shader
    const waterMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color(0x0066ff) },
        uColorB: { value: new THREE.Color(0x9900ff) },
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          vUv = uv;
          
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          
          // Waves
          float elevation = sin(modelPosition.x * 2.0 + uTime * 0.5) * 
                           sin(modelPosition.z * 2.0 + uTime * 0.5) * 
                           0.2;
                           
          modelPosition.y += elevation;
          
          vElevation = elevation;
          
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          
          gl_Position = projectedPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          vec3 color = mix(uColorA, uColorB, (vElevation + 0.2) * 2.0);
          gl_FragColor = vec4(color, 0.8);
        }
      `,
      transparent: true,
    })

    // Create water mesh
    const water = new THREE.Mesh(waterGeometry, waterMaterial)
    water.rotation.x = -Math.PI * 0.5
    scene.add(water)

    // Position camera
    camera.position.set(0, 1, 2)

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

      // Update water
      waterMaterial.uniforms.uTime.value = elapsedTime

      // Render
      renderer.render(scene, camera)

      // Call animate again on the next frame
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      containerRef.current?.removeChild(renderer.domElement)
      scene.remove(water)
      waterGeometry.dispose()
      waterMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 -z-10" />
}
