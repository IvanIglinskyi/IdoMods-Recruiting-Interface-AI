import './Features.css'

// Line icons drawn 1:1 in a 24 × 24 box (sizes measured from design/components-design/features-tiles.png).
const ICONS = {
  returns: (
    <>
      <path d="M19.75 6.5v8.75H5" />
      <path d="m8.5 11.75-3.5 3.5 3.5 3.5" />
    </>
  ),
  warranty: <path d="M5.75 1.75h12.5v20.5L12 16.75l-6.25 5.5z" />,
  delivery: (
    <>
      <path d="M14.25 17.25V3.5H1.25v13.75h1.5" />
      <path d="M14.25 8.25h4.5l3.5 4v5h-1.75" />
      <path d="M7.25 17.25h8.5" />
      <circle cx="5" cy="18.25" r="2.25" />
      <circle cx="18" cy="18.25" r="2.25" />
    </>
  ),
  polish: (
    <>
      <path d="M9 2.75 3.25 5.75v9.5L12 21.75l8.75-6.5v-9.5L15 2.75" />
      <path d="M12 1.5v8" />
      <path d="M9.25 10.25h5.5v6.5h-5.5z" fill="currentColor" />
    </>
  ),
  official: (
    <>
      <path d="M7 2.75h10v6.25a5 5 0 0 1-10 0z" />
      <path d="M7 4.75H3.75v2.5A2.75 2.75 0 0 0 6.5 10M17 4.75h3.25v2.5A2.75 2.75 0 0 1 17.5 10" />
      <path d="M12 14v3.25" />
      <path d="M8.25 17.25h7.5v4.5h-7.5z" />
    </>
  ),
}

const FEATURES = [
  { id: 'returns', title: 'Zwroty nawet do 100 dni', text: 'szybkie i proste' },
  { id: 'warranty', title: '5 lat gwarancji', text: 'na wszystkie produkty' },
  { id: 'delivery', title: 'Darmowa dostawa', text: 'już za 299 zł' },
  { id: 'polish', title: 'Polskie produkty', text: 'sprawdzona jakość' },
  { id: 'official', title: 'Oficjalny sklep producenta', text: 'gwarancja satysfakcji' },
]

export default function Features() {
  return (
    <section className="features" aria-label="Dlaczego warto">
      <ul className="features__list">
        {FEATURES.map((feature) => (
          <li key={feature.id} className="features__item">
            <svg
              className="features__icon"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {ICONS[feature.id]}
            </svg>
            <p className="features__title">{feature.title}</p>
            <p className="features__text">{feature.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
