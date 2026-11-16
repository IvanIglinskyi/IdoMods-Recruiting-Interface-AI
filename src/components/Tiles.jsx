import { Fragment } from 'react'
import thoroPerson from '../assets/thoro-person.jpg'
import colorWheel from '../assets/color-wheel.png'
import laptop from '../assets/laptop.png'
import catalogTablet from '../assets/catalog-tablet.png'
import phoneSmall from '../assets/phone-small.png'
import phoneLarge from '../assets/phone-large.png'
import './Tiles.css'

// Promo tiles. Each tile has one media group (`.tile__media--<id>`, positioned in Tiles.css);
// its images are listed back to front and the whole group zooms on hover, so multi-image
// compositions (wheel + laptop, two phones) stay intact.
const TILES = [
  {
    id: 'thoro',
    size: 'narrow',
    tone: 'light',
    media: [
      {
        part: 'photo',
        src: thoroPerson,
        alt: 'Kobieta w niebieskim swetrze z kawą pod niebieską lampą THORO',
      },
    ],
    label: 'Marka THORO',
    title: ['Poznaj lampy premium'],
    cta: 'Odwiedź sklep THORO',
    href: '#',
  },
  {
    id: 'config',
    size: 'wide',
    tone: 'light',
    media: [
      { part: 'wheel', src: colorWheel, alt: '' },
      { part: 'laptop', src: laptop, alt: 'Laptop z konfiguratorem 3D lamp SOLLUX' },
    ],
    label: 'Konfigurator 3D',
    title: ['Wybierz projekt i dostosuj', 'go do swojego wnętrza'],
    cta: 'Stwórz swój projekt',
    href: '#',
  },
  {
    id: 'catalog',
    size: 'wide',
    tone: 'dark',
    media: [{ part: 'tablet', src: catalogTablet, alt: 'Tablet z katalogiem KARBON w dłoni' }],
    label: 'Katalog',
    title: ['Odkryj najnowszy katalog'],
    cta: 'Sprawdź katalog',
    href: '#',
  },
  {
    id: 'smart',
    size: 'narrow',
    tone: 'dark',
    media: [
      { part: 'phone-small', src: phoneSmall, alt: '' },
      {
        part: 'phone-large',
        src: phoneLarge,
        alt: 'Telefon z aplikacją SOLLUX SMART pokazującą lampę na suficie',
      },
    ],
    label: 'SOLLUX SMART',
    title: ['Przymierz lampę w aplikacji'],
    cta: 'Pobierz aplikacje na telefon',
    href: '#',
  },
]

export default function Tiles() {
  return (
    <section className="tiles" aria-label="Odkryj więcej">
      {TILES.map((tile) => (
        <article key={tile.id} className={`tile tile--${tile.id} tile--${tile.size} tile--${tile.tone}`}>
          <div className={`tile__media tile__media--${tile.id}`}>
            {tile.media.map((item) => (
              <img
                key={item.part}
                className={`tile__img tile__img--${item.part}`}
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                draggable="false"
              />
            ))}
          </div>
          <div className="tile__content">
            <p className="tile__label">{tile.label}</p>
            <h2 className="tile__title">
              {tile.title.map((line, i) => (
                <Fragment key={line}>
                  {i > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </h2>
            <a className="tile__cta" href={tile.href}>
              {tile.cta}
            </a>
          </div>
        </article>
      ))}
    </section>
  )
}
