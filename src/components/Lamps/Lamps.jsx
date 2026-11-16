import beige from '../../assets/lamp-beige.png'
import olive from '../../assets/lamp-olive.png'
import terracotta from '../../assets/lamp-terracotta.png'
import './Lamps.css'

/*
  Positions/sizes are in hero px (1508 × 846 design), fitted against
  design/components-design/hero-with-out-bg.png scaled by 1508 / 1920.
  lens: centre and size (% of the image box), ellipse tilt.
  beam: direction the light travels from the lens (deg, 0 = right, 90 = down).
  depth / tilt: parallax strength (px / deg at the hero edge).
*/
const LAMPS = [
  {
    id: 'beige',
    src: beige,
    label: 'Lampa beżowa – włącz lub wyłącz światło',
    x: 599,
    y: 69,
    width: 289,
    lens: { x: 59.7, y: 66.3, w: 67, h: 33, angle: -27 },
    beam: 66,
    depth: 12,
    tilt: 2,
    floatDelay: '-1.4s',
  },
  {
    id: 'olive',
    src: olive,
    label: 'Lampa oliwkowa – włącz lub wyłącz światło',
    x: 846,
    y: 262.5,
    width: 366,
    lens: { x: 21.4, y: 83.8, w: 22, h: 27, angle: 45 },
    beam: 141,
    depth: 20,
    tilt: 2.5,
    floatDelay: '-3.9s',
  },
  {
    id: 'terracotta',
    src: terracotta,
    label: 'Lampa terakotowa – włącz lub wyłącz światło',
    x: 329,
    y: 341.5,
    width: 331,
    lens: { x: 61, y: 68.7, w: 58, h: 36, angle: -28 },
    beam: 64,
    depth: 28,
    tilt: 3,
    floatDelay: '-6.2s',
  },
]

// `lit` is owned by Hero so the lamps stay on while the slides change.
export default function Lamps({ lit, onToggle }) {
  return LAMPS.map((lamp) => {
    const on = Boolean(lit[lamp.id])
    const { lens } = lamp

    return (
      <button
        key={lamp.id}
        type="button"
        className={`lamp lamp--${lamp.id}${on ? ' is-on' : ''}`}
        aria-pressed={on}
        aria-label={lamp.label}
        onClick={() => onToggle(lamp.id)}
        style={{
          left: lamp.x,
          top: lamp.y,
          width: lamp.width,
          '--depth': lamp.depth,
          '--tilt': lamp.tilt,
          '--float-delay': lamp.floatDelay,
          '--lens-x': `${lens.x}%`,
          '--lens-y': `${lens.y}%`,
          '--lens-w': `${lens.w}%`,
          '--lens-h': `${lens.h}%`,
          '--lens-angle': `${lens.angle}deg`,
          '--beam-angle': `${lamp.beam}deg`,
        }}
      >
        <span className="lamp__float">
          <span className="lamp__body">
            <span className="lamp__beam" aria-hidden="true" />
            <img className="lamp__image" src={lamp.src} alt="" draggable="false" />
            <span className="lamp__halo" aria-hidden="true" />
            <span className="lamp__lens" aria-hidden="true" />
          </span>
        </span>
      </button>
    )
  })
}
