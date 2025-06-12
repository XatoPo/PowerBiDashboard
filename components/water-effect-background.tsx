"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function WaterEffectBackground() {
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

    // Create water geometry with high detail
    const waterGeometry = new THREE.PlaneGeometry(30, 30, 150, 150)

    // Enhanced water shader with visible movement
    const waterMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorDeep: { value: new THREE.Color(0x1e3a8a) }, // Deep blue
        uColorShallow: { value: new THREE.Color(0x3b82f6) }, // Medium blue
        uColorLight: { value: new THREE.Color(0x60a5fa) }, // Light blue
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          vUv = uv;
          
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          
          // Multiple wave layers with clear movement
          float wave1 = sin(modelPosition.x * 2.0 + uTime * 1.5) * 
                       sin(modelPosition.z * 1.5 + uTime * 1.2) * 0.15;
          
          float wave2 = sin(modelPosition.x * 3.5 + uTime * 2.0) * 
                       sin(modelPosition.z * 2.8 + uTime * 1.8) * 0.08;
          
          float wave3 = sin(modelPosition.x * 5.0 + uTime * 2.5) * 
                       sin(modelPosition.z * 4.2 + uTime * 2.2) * 0.05;
          
          float wave4 = sin(modelPosition.x * 1.2 + uTime * 0.8) * 
                       sin(modelPosition.z * 0.9 + uTime * 0.6) * 0.12;
          
          float elevation = wave1 + wave2 + wave3 + wave4;
          
          modelPosition.y += elevation;
          vElevation = elevation;
          
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          
          gl_Position = projectedPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColorDeep;
        uniform vec3 uColorShallow;
        uniform vec3 uColorLight;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          // Dynamic color based on wave height
          float normalizedElevation = (vElevation + 0.4) / 0.8;
          
          vec3 color = uColorDeep;
          
          if(normalizedElevation > 0.3) {
            color = mix(uColorDeep, uColorShallow, (normalizedElevation - 0.3) * 2.0);
          }
          
          if(normalizedElevation > 0.7) {
            color = mix(color, uColorLight, (normalizedElevation - 0.7) * 3.0);
          }
          
          // Add some transparency variation
          float alpha = 0.4 + normalizedElevation * 0.2;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
    })

    // Create water mesh
    const water = new THREE.Mesh(waterGeometry, waterMaterial)
    water.rotation.x = -Math.PI * 0.5
    water.position.y = -5
    scene.add(water)

    // Position camera
    camera.position.set(0, 3, 6)
    camera.lookAt(0, 0, 0)

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

      // Update water animation - this makes it move!
      waterMaterial.uniforms.uTime.value = elapsedTime

      // Render
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
      scene.remove(water)
      waterGeometry.dispose()
      waterMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 -z-30" />
}
