import { useEffect, useRef } from 'react'
import { createShaderRenderer } from './shaderSectionRenderer.js'
import './ShaderSection.css'

// Full-width section with a real-time WebGL background (seamless 24 s loop) and static content on top.
// The section's CSS gradient is the fallback: it shows when WebGL is unavailable or the context is lost.
function useShaderBackground(sectionRef) {
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    // A fresh canvas per mount: a context released with loseContext() can't be reused,
    // and StrictMode mounts effects twice in development.
    const canvas = document.createElement('canvas')
    canvas.className = 'shader-section__canvas'
    canvas.setAttribute('aria-hidden', 'true')
    section.prepend(canvas)

    const renderer = createShaderRenderer(canvas)
    if (!renderer) {
      canvas.remove()
      return undefined
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let inView = false
    let frame = 0
    let last = 0
    let elapsed = 0 // advances only while running, so resuming continues where it paused

    const draw = () => renderer.render(elapsed)

    const tick = (now) => {
      if (last) elapsed += Math.min(now - last, 100) / 1000
      last = now
      draw()
      frame = requestAnimationFrame(tick)
    }

    const update = () => {
      const run = inView && !document.hidden && !reducedMotion.matches && !renderer.gl.isContextLost()
      if (run && !frame) {
        last = 0
        frame = requestAnimationFrame(tick)
      } else if (!run && frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      renderer.resize(section.clientWidth, section.clientHeight)
      draw() // keeps a correct static frame while paused / with reduced motion
    })
    resizeObserver.observe(section)

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      update()
    })
    intersectionObserver.observe(section)

    const onContextLost = (event) => {
      event.preventDefault()
      canvas.hidden = true
      update()
    }

    document.addEventListener('visibilitychange', update)
    reducedMotion.addEventListener('change', update)
    canvas.addEventListener('webglcontextlost', onContextLost)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      document.removeEventListener('visibilitychange', update)
      reducedMotion.removeEventListener('change', update)
      canvas.removeEventListener('webglcontextlost', onContextLost)
      renderer.destroy()
      canvas.remove()
    }
  }, [sectionRef])
}

export default function ShaderSection() {
  const sectionRef = useRef(null)
  useShaderBackground(sectionRef)

  return (
    <section ref={sectionRef} className="shader-section" aria-labelledby="shader-section-title">
      <div className="shader-section__content">
        <h2 id="shader-section-title" className="shader-section__title">
          Twoje wnętrze zasługuje na
          <br />
          wyjątkowe światło
        </h2>
        <a className="shader-section__cta" href="#">
          Kup teraz
        </a>
        <p className="shader-section__note">
          Od 119 zł na oficjalnej stronie
          <br />
          producenta SOLLUX
        </p>
      </div>
    </section>
  )
}
