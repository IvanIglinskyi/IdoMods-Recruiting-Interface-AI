import Logo from '../Logo/Logo.jsx'
import { MEDIA, useMediaQuery } from '../../media.js'
import visaLogo from '../../assets/footer/visa.png'
import mastercardLogo from '../../assets/footer/mastercard.png'
import payuLogo from '../../assets/footer/payu.png'
import paypalLogo from '../../assets/footer/paypal.png'
import inpostLogo from '../../assets/footer/inpost.png'
import dpdLogo from '../../assets/footer/dpd.png'
import paczkaWRuchuLogo from '../../assets/footer/paczka-w-ruchu.png'
import dhlLogo from '../../assets/footer/dhl.png'
import glsLogo from '../../assets/footer/gls.png'
import pocztaPolskaLogo from '../../assets/footer/poczta-polska.png'
import rzetelnaFirmaLogo from '../../assets/footer/rzetelna-firma.jpg'
import orlyOswietleniaLogo from '../../assets/footer/orly-oswietlenia.jpg'
import gazeleBiznesuLogo from '../../assets/footer/gazele-biznesu.jpg'
import solidnaFirmaLogo from '../../assets/footer/solidna-firma.jpg'
import polskiProduktLogo from '../../assets/footer/polski-produkt.jpg'
import firmaGodnaZaufaniaLogo from '../../assets/footer/firma-godna-zaufania.jpg'
import './Footer.css'

const LINK_COLUMNS = [
  {
    title: 'Moje zamówienia',
    links: ['Status zamówienia', 'Śledzenie przesyłki', 'Chcę zareklamować produkt', 'Informacje o wymianie', 'Kontakt'],
  },
  {
    title: 'Moje konto',
    links: [
      'Zarejestruj się',
      'Koszyk',
      'Listy zakupowe',
      'Lista zakupionych produktów',
      'Historia transakcji',
      'Moje rabaty',
    ],
  },
  {
    title: 'Regulaminy',
    links: [
      'Sposoby wysyłki',
      'Sposoby płatności',
      'Regulamin sklepu',
      'Polityka prywatności',
      'Polityka bezpieczeństwa',
      'Zmień ustawienia ciasteczek',
    ],
  },
  {
    title: 'Informacje',
    links: ['O nas', 'FAQ', 'Kurs światła', 'Inspiracje', 'Marka premium', 'Gwarancja', 'Konfigurator 3D'],
  },
  {
    title: 'Współpraca',
    links: ['Dla Architekta', 'Modele 3D', 'Dystrybucja'],
  },
]

// Logo slots: sizes are the logos' display sizes in the design; the assets are cropped to the logo itself.
const PAYMENT_LOGOS = [
  { name: 'VISA', src: visaLogo, width: 33, height: 12 },
  { name: 'Mastercard', src: mastercardLogo, width: 20, height: 16 },
  { name: 'PayU', src: payuLogo, width: 25, height: 13 },
  { name: 'PayPal', src: paypalLogo, width: 19, height: 18 },
  { name: 'InPost', src: inpostLogo, width: 30, height: 18 },
  { name: 'DPD', src: dpdLogo, width: 35, height: 15 },
  { name: 'Paczka w RUCHu', src: paczkaWRuchuLogo, width: 29, height: 19 },
  { name: 'DHL', src: dhlLogo, width: 34, height: 19 },
  { name: 'GLS', src: glsLogo, width: 33, height: 8 },
  { name: 'Poczta Polska', src: pocztaPolskaLogo, width: 35, height: 19 },
]

const AWARD_LOGOS = [
  { name: 'Rzetelna Firma – Kliknij i sprawdź', src: rzetelnaFirmaLogo, width: 69, height: 27 },
  { name: 'Orły Oświetlenia', src: orlyOswietleniaLogo, width: 52, height: 29, offsetX: 6 },
  { name: 'Gazele Biznesu', src: gazeleBiznesuLogo, width: 73, height: 21 },
  { name: 'Solidna Firma 2021', src: solidnaFirmaLogo, width: 70, height: 23 },
  { name: 'Polski Produkt – Gwarancja Jakości', src: polskiProduktLogo, width: 59, height: 26 },
  { name: 'Firma Godna Zaufania 2019', src: firmaGodnaZaufaniaLogo, width: 40, height: 32 },
]

const CONTACT_ITEMS = [
  { label: 'NIP: 6070082443' },
  { label: '+48 668 806 323', href: 'tel:+48668806323', note: '(Pn - Pt 7:00 - 15:00)' },
  { label: 'sklep@sollux.pl', href: 'mailto:sklep@sollux.pl' },
  { label: 'Sollux Lighting Sp. z o.o.' },
  { label: 'Władysława Łokietka 35, 64-840 Budzyń (POLSKA)' },
]

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    width: 16,
    height: 16,
    path: 'M1 0h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4.1V9.8h2.1l.3-2.4h-2.4V5.9c0-.7.2-1.2 1.2-1.2h1.3V2.6a17 17 0 0 0-1.9-.1c-1.9 0-3.2 1.2-3.2 3.3v1.6H6.2v2.4h2.1V16H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1z',
  },
  {
    name: 'Instagram',
    width: 16,
    height: 16,
    path: 'M4.6 0h6.8A4.6 4.6 0 0 1 16 4.6v6.8a4.6 4.6 0 0 1-4.6 4.6H4.6A4.6 4.6 0 0 1 0 11.4V4.6A4.6 4.6 0 0 1 4.6 0zm0 1.5a3.1 3.1 0 0 0-3.1 3.1v6.8a3.1 3.1 0 0 0 3.1 3.1h6.8a3.1 3.1 0 0 0 3.1-3.1V4.6a3.1 3.1 0 0 0-3.1-3.1zM8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 1.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm4.3-2.7a.95.95 0 1 1 0 1.9.95.95 0 0 1 0-1.9z',
  },
  {
    name: 'TikTok',
    width: 12,
    height: 14,
    path: 'M6.3 0h2.3a3.3 3.3 0 0 0 3.4 3.2v2.3a5.5 5.5 0 0 1-3.4-1.1v5.3A4.3 4.3 0 1 1 4.3 5.4v2.4a2 2 0 1 0 2 1.9z',
  },
  {
    name: 'YouTube',
    width: 18,
    height: 13,
    path: 'M17.6 2A2.3 2.3 0 0 0 16 .4C14.6 0 9 0 9 0S3.4 0 2 .4A2.3 2.3 0 0 0 .4 2C0 3.4 0 6.5 0 6.5s0 3.1.4 4.5A2.3 2.3 0 0 0 2 12.6c1.4.4 7 .4 7 .4s5.6 0 7-.4a2.3 2.3 0 0 0 1.6-1.6c.4-1.4.4-4.5.4-4.5s0-3.1-.4-4.5zM7.2 9.3V3.7l4.7 2.8z',
  },
]

// Round flags, 20 × 20 viewBox; the link around each flag clips it to a circle.
const STORES = [
  {
    country: 'Polska',
    flag: (
      <>
        <rect width="20" height="10" fill="#ffffff" />
        <rect y="10" width="20" height="10" fill="#dc143c" />
      </>
    ),
  },
  {
    country: 'Niemcy',
    flag: (
      <>
        <rect width="20" height="6.67" fill="#000000" />
        <rect y="6.67" width="20" height="6.67" fill="#d80027" />
        <rect y="13.33" width="20" height="6.67" fill="#ffda44" />
      </>
    ),
  },
  {
    country: 'Hiszpania',
    flag: (
      <>
        <rect width="20" height="20" fill="#d80027" />
        <rect y="6.67" width="20" height="6.67" fill="#ffda44" />
      </>
    ),
  },
  {
    country: 'Rumunia',
    flag: (
      <>
        <rect width="6.67" height="20" fill="#0052b4" />
        <rect x="6.67" width="6.67" height="20" fill="#ffda44" />
        <rect x="13.33" width="6.67" height="20" fill="#d80027" />
      </>
    ),
  },
  {
    country: 'Francja',
    flag: (
      <>
        <rect width="6.67" height="20" fill="#0052b4" />
        <rect x="6.67" width="6.67" height="20" fill="#ffffff" />
        <rect x="13.33" width="6.67" height="20" fill="#d80027" />
      </>
    ),
  },
  {
    country: 'Wielka Brytania',
    flag: (
      <>
        <rect width="20" height="20" fill="#0052b4" />
        <path d="M0 0l20 20M20 0L0 20" stroke="#ffffff" strokeWidth="4" />
        <path d="M0 0l20 20M20 0L0 20" stroke="#d80027" strokeWidth="1.3" />
        <path d="M10 0v20M0 10h20" stroke="#ffffff" strokeWidth="6" />
        <path d="M10 0v20M0 10h20" stroke="#d80027" strokeWidth="3.6" />
      </>
    ),
  },
  {
    country: 'Holandia',
    flag: (
      <>
        <rect width="20" height="6.67" fill="#ee1c23" />
        <rect y="6.67" width="20" height="6.67" fill="#ffffff" />
        <rect y="13.33" width="20" height="6.67" fill="#21409a" />
      </>
    ),
  },
  {
    country: 'Szwecja',
    flag: (
      <>
        <rect width="20" height="20" fill="#0052b4" />
        <path d="M5.5 0h3v8.5H20v3H8.5V20h-3v-8.5H0v-3h5.5z" fill="#ffda44" />
      </>
    ),
  },
]

function LogoSlot({ name, src, width, height, offsetX }) {
  const style = { width, height, marginLeft: offsetX }
  if (src) {
    return <img className="footer__logo-slot" src={src} alt={name} width={width} height={height} style={style} />
  }
  return <span className="footer__logo-slot footer__logo-slot--empty" role="img" aria-label={name} style={style} />
}

function ChevronIcon() {
  return (
    <svg className="footer__chevron" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
      <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Footer() {
  const mobile = useMediaQuery(MEDIA.mobile)

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <a className="footer__logo" href="/" aria-label="Sollux – strona główna">
            <Logo className="footer__logo-svg" width={110} height={18.2} />
          </a>
          <ul className="footer__social">
            {SOCIAL_LINKS.map(({ name, width, height, path }) => (
              <li key={name}>
                <a className="footer__social-link" href="#" aria-label={name}>
                  <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} aria-hidden="true">
                    <path d={path} fill="currentColor" fillRule="evenodd" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className="footer__nav" aria-label="Stopka">
          {LINK_COLUMNS.map(({ title, links }) => {
            const list = (
              <ul className="footer__links">
                {links.map((label) => (
                  <li key={label}>
                    <a className="footer__link" href="#">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            )
            // Mobile: each column is a native disclosure (keyboard + screen reader support built in).
            return mobile ? (
              <details className="footer__column footer__column--accordion" key={title}>
                <summary className="footer__summary">
                  <h2 className="footer__heading">{title}</h2>
                  <ChevronIcon />
                </summary>
                {list}
              </details>
            ) : (
              <div className="footer__column" key={title}>
                <h2 className="footer__heading">{title}</h2>
                {list}
              </div>
            )
          })}
        </nav>
      </div>

      <div className="footer__middle">
        <section className="footer__group footer__group--payments" aria-labelledby="footer-payments">
          <h2 className="footer__group-title" id="footer-payments">
            Płatności i dostawy
          </h2>
          <ul className="footer__payments">
            {PAYMENT_LOGOS.map((logo) => (
              <li key={logo.name}>
                <LogoSlot {...logo} />
              </li>
            ))}
          </ul>
        </section>

        <section className="footer__group footer__group--awards" aria-labelledby="footer-awards">
          <h2 className="footer__group-title" id="footer-awards">
            Nagrody
          </h2>
          <ul className="footer__awards">
            {AWARD_LOGOS.map((logo) => (
              <li key={logo.name}>
                <LogoSlot {...logo} />
              </li>
            ))}
          </ul>
        </section>

        <section className="footer__group footer__group--stores" aria-labelledby="footer-stores">
          <h2 className="footer__group-title" id="footer-stores">
            Nasze sklepy
          </h2>
          <ul className="footer__stores">
            {STORES.map(({ country, flag }) => (
              <li key={country}>
                <a className="footer__store" href="#" aria-label={`Sklep – ${country}`}>
                  <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
                    {flag}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="footer__bottom">
        <div className="footer__legal">
          <p className="footer__vat">
            W sklepie prezentujemy ceny brutto (z VAT). Stawki VAT dla konsumentów z kraju: Polska.
          </p>
          <span className="footer__rule" aria-hidden="true" />
          <ul className="footer__badges">
            <li>
              <a className="footer__badge footer__badge--idomods" href="#" aria-label="Design&Code IdoMods">
                <span className="footer__badge-small">Design&amp;Code</span>
                <span className="footer__badge-large">
                  I<span className="footer__badge-accent">do</span>Mods{' '}
                  <span className="footer__badge-accent">&lt;/&gt;</span>
                </span>
              </a>
            </li>
            <li>
              <a className="footer__badge footer__badge--idosell" href="#" aria-label="Powered by IdoSell">
                <span className="footer__badge-small">Powered by</span>
                <span className="footer__badge-large">
                  <span className="footer__badge-accent">I</span>do<span className="footer__badge-accent">Sell</span>.
                </span>
              </a>
            </li>
          </ul>
        </div>

        <ul className="footer__contact">
          {CONTACT_ITEMS.map(({ label, href, note }) => (
            <li key={label}>
              {href ? (
                <a className="footer__link" href={href}>
                  {label}
                </a>
              ) : (
                label
              )}
              {note && <span className="footer__contact-note">{note}</span>}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
