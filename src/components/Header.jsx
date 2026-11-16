import { useCallback, useEffect, useRef, useState } from 'react'
import Logo from './Logo.jsx'
import { MEDIA, useMediaQuery } from '../media.js'
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

function MenuIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <path d="M2 5h16M2 10h16M2 15h16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <path d="M4 4l12 12M16 4L4 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled])'

// Below 1024 px the nav, search and "Stwórz swoją lampę" live in an off-canvas panel (#header-menu).
// While open: body scroll is locked, focus is moved into and kept inside the panel, Esc / backdrop /
// any link closes it, and focus returns to the menu button.
function useMenu() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const toggleRef = useRef(null)
  const belowLaptop = useMediaQuery(MEDIA.belowLaptop)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!belowLaptop) setOpen(false)
  }, [belowLaptop])

  useEffect(() => {
    if (!open) return undefined
    const panel = panelRef.current
    const toggle = toggleRef.current
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    panel.querySelector('.header__close')?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }
      if (event.key !== 'Tab') return
      const items = [...panel.querySelectorAll(FOCUSABLE)]
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      if (panel.contains(document.activeElement) || document.activeElement === document.body) toggle?.focus()
    }
  }, [open])

  return { open, setOpen, close, panelRef, toggleRef, belowLaptop }
}

export default function Header() {
  const { open, setOpen, close, panelRef, toggleRef, belowLaptop } = useMenu()
  const dialogProps = belowLaptop ? { role: 'dialog', 'aria-modal': open ? 'true' : undefined, 'aria-label': 'Menu' } : {}

  return (
    <header className={`header${open ? ' is-open' : ''}`}>
      <a className="header__logo" href="/" aria-label="Sollux – strona główna">
        <Logo className="header__logo-svg" />
      </a>

      <div className="header__backdrop" aria-hidden="true" onClick={close} />

      <div
        className="header__panel"
        id="header-menu"
        ref={panelRef}
        {...dialogProps}
        onClick={(event) => {
          if (event.target.closest('a')) close()
        }}
      >
        <div className="header__panel-bar">
          <Logo className="header__logo-svg" />
          <button className="header__close" type="button" aria-label="Zamknij menu" onClick={close}>
            <CloseIcon />
          </button>
        </div>

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
      </div>

      <a className="header__icon-link header__icon-link--user" href="#" aria-label="Moje konto">
        <UserIcon />
      </a>
      <a className="header__icon-link header__icon-link--cart" href="#" aria-label="Koszyk">
        <CartIcon />
      </a>
      <button
        className="header__toggle"
        type="button"
        ref={toggleRef}
        aria-label="Menu"
        aria-expanded={open}
        aria-controls="header-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <MenuIcon />
      </button>
    </header>
  )
}
