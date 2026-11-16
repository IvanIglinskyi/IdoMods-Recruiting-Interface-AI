import { useCallback, useEffect, useRef, useState } from 'react'
import Header from './Header.jsx'
import Lamps from './Lamps.jsx'
import rock from '../assets/rock.png'
import interior from '../assets/slider2.jpg'
import './Hero.css'

const AUTOPLAY_MS = 3000

// type 'lamps': gradient + rock + interactive lamps; type 'image': full-bleed cover photo.
// Slide 2 texts are placeholders (no design for that slide yet).
const SLIDES = [
  {
    id: 'kolor-i-forma',
    type: 'lamps',
    label: 'Bestsellery SOLLUX',
    title: ['Kolor i forma', 'w nowym świetle'],
    cta: 'Sprawdź bestsellery',
    href: '#',
  },
  {
    id: 'nowa-kolekcja',
    type: 'image',
    image: interior,
    label: 'Nowa kolekcja SOLLUX',
    title: ['Światło, które', 'tworzy wnętrze'],
    cta: 'Zobacz kolekcję',
    href: '#',
  },
]

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return reduced
}

// Smoothed cursor position (-1…1 from the hero centre) written to --px / --py on the hero.
function useCursorParallax(ref, enabled) {
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return undefined

    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let frame = 0

    const tick = () => {
      current.x += (target.x - current.x) * 0.08
      current.y += (target.y - current.y) * 0.08
      el.style.setProperty('--px', current.x.toFixed(4))
      el.style.setProperty('--py', current.y.toFixed(4))
      const settled = Math.abs(target.x - current.x) < 0.001 && Math.abs(target.y - current.y) < 0.001
      frame = settled ? 0 : requestAnimationFrame(tick)
    }
    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const onMove = (event) => {
      const rect = el.getBoundingClientRect()
      target.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      target.y = ((event.clientY - rect.top) / rect.height) * 2 - 1
      start()
    }
    const onLeave = () => {
      target.x = 0
      target.y = 0
      start()
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.style.removeProperty('--px')
      el.style.removeProperty('--py')
    }
  }, [ref, enabled])
}

function ArrowIcon({ direction }) {
  return (
    <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
      <path
        d={direction === 'prev' ? 'M10 6H2.5M5.8 2.5 2.3 6l3.5 3.5' : 'M2 6h7.5M6.2 2.5 9.7 6l-3.5 3.5'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg className="hero__rating-star" viewBox="0 0 10 10" width="11" height="11" aria-hidden="true">
      <path d="M5 .4l1.4 2.9 3.2.4-2.3 2.2.6 3.2L5 7.6 2.1 9.1l.6-3.2L.4 3.7l3.2-.4z" fill="currentColor" />
    </svg>
  )
}

export default function Hero() {
  const heroRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  // Bumped on every slide change so the progress animation restarts even when the index repeats.
  const [cycle, setCycle] = useState(0)
  const [litLamps, setLitLamps] = useState({})

  const toggleLamp = useCallback((id) => setLitLamps((prev) => ({ ...prev, [id]: !prev[id] })), [])

  const goTo = useCallback((next) => {
    setIndex((next + SLIDES.length) % SLIDES.length)
    setCycle((c) => c + 1)
  }, [])

  useEffect(() => {
    if (reducedMotion) return undefined
    const timer = setTimeout(() => goTo(index + 1), AUTOPLAY_MS)
    return () => clearTimeout(timer)
  }, [index, cycle, reducedMotion, goTo])

  useCursorParallax(heroRef, !reducedMotion)

  return (
    <section className="hero" ref={heroRef} aria-roledescription="karuzela" aria-label="Bestsellery SOLLUX">
      <Header />

      <div className="hero__slides">
        {SLIDES.map((slide, i) => {
          const active = i === index
          const Heading = i === 0 ? 'h1' : 'h2'
          return (
            <div
              key={slide.id}
              className={`hero__slide hero__slide--${slide.type}${active ? ' is-active' : ''}`}
              role="group"
              aria-roledescription="slajd"
              aria-label={`${i + 1} z ${SLIDES.length}`}
              inert={!active}
            >
              <div className="hero__media">
                {slide.type === 'lamps' ? (
                  <>
                    <img className="hero__rock" src={rock} alt="" draggable="false" />
                    <Lamps lit={litLamps} onToggle={toggleLamp} />
                  </>
                ) : (
                  <img className="hero__image" src={slide.image} alt="" draggable="false" />
                )}
              </div>
              {slide.type === 'image' && <div className="hero__scrim" aria-hidden="true" />}

              <div className="hero__content">
                <p className="hero__label">{slide.label}</p>
                <Heading className="hero__title">
                  {slide.title[0]}
                  <br />
                  {slide.title[1]}
                </Heading>
                <a className="hero__cta" href={slide.href}>
                  {slide.cta}
                </a>
              </div>
            </div>
          )
        })}
      </div>

      <button className="hero__arrow hero__arrow--prev" type="button" aria-label="Poprzedni slajd" onClick={() => goTo(index - 1)}>
        <ArrowIcon direction="prev" />
      </button>
      <button className="hero__arrow hero__arrow--next" type="button" aria-label="Następny slajd" onClick={() => goTo(index + 1)}>
        <ArrowIcon direction="next" />
      </button>

      <ol className="hero__progress" aria-label="Postęp slajdów">
        {SLIDES.map((slide, i) => (
          <li key={slide.id} className="hero__progress-item" aria-current={i === index ? 'step' : undefined}>
            <span className="visually-hidden">{`Slajd ${i + 1}`}</span>
            {i === index && <span key={cycle} className="hero__progress-fill" />}
          </li>
        ))}
      </ol>

      <p className="hero__rating">
        <span className="hero__rating-score">4.8</span>
        <StarIcon />
        <span className="hero__rating-text">Uwielbiany przez klientów</span>
      </p>
    </section>
  )
}
