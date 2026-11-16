import Logo from './Logo.jsx'
import './Header.css'

const NAV_ITEMS = [
  { label: 'Lampy', dropdown: true },
  { label: 'Kolory', dropdown: true },
  { label: 'Pomieszczenia', dropdown: true },
  { label: 'Nowości' },
  { label: 'Bestsellery' },
  { label: 'Promocje' },
]

function ChevronIcon() {
  return (
    <svg className="header__chevron" viewBox="0 0 8 8" width="8" height="8" aria-hidden="true">
      <path d="M1.6 3l2.4 2.3L6.4 3" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <circle cx="7.8" cy="7.2" r="5.3" />
        <path d="M11.6 11.3l3 3" />
      </g>
    </svg>
  )
}

function CubeIcon() {
  return (
    <svg viewBox="0 0 13 16" width="13" height="16" aria-hidden="true">
      <path
        d="M6.5 1.8l4.9 2.8v6.6L6.5 14l-4.9-2.8V4.6zM1.8 5.2L6.5 8l4.7-2.8M6.5 8v6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <circle cx="8.9" cy="5.6" r="4.2" />
        <path d="M1.9 16.4c.6-3.5 3.2-6 7-6s6.4 2.5 7 6" />
      </g>
    </svg>
  )
}

function CartIcon() {
  return (
    <svg viewBox="0 -1 20 18" width="20" height="18" aria-hidden="true">
      <path
        d="M1 1.6h1.6c1.4 0 2.7 1 2.7 2.4v9.5h12.2M5.3 4h13.2l-2.1 7.3H5.3M6.6 13.5a1.5 1.5 0 0 0 3 0M13.5 13.5a1.5 1.5 0 0 0 3 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Header() {
  return (
    <header className="header">
      <a className="header__logo" href="/" aria-label="Sollux – strona główna">
        <Logo className="header__logo-svg" />
      </a>

      <nav className="header__nav" aria-label="Menu główne">
        <ul className="header__nav-list">
          {NAV_ITEMS.map(({ label, dropdown }) => (
            <li key={label}>
              {dropdown ? (
                <button className="header__nav-link" type="button" aria-haspopup="true" aria-expanded="false">
                  {label}
                  <ChevronIcon />
                </button>
              ) : (
                <a className="header__nav-link" href="#">
                  {label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <form className="header__search" role="search" onSubmit={(e) => e.preventDefault()}>
        <input className="header__search-input" type="search" placeholder="Czego szukasz?" aria-label="Czego szukasz?" />
        <button className="header__search-button" type="submit" aria-label="Szukaj">
          <SearchIcon />
        </button>
      </form>

      <a className="header__create" href="#">
        <CubeIcon />
        Stwórz swoją lampę
      </a>

      <a className="header__icon-link header__icon-link--user" href="#" aria-label="Moje konto">
        <UserIcon />
      </a>
      <a className="header__icon-link header__icon-link--cart" href="#" aria-label="Koszyk">
        <CartIcon />
      </a>
    </header>
  )
}
