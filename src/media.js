import { useEffect, useState } from 'react'

/*
  Layout breakpoints (viewport width, px) — the single documented source.
  CSS can't read JS/custom properties in @media, so the stylesheets repeat these exact values
  (desktop-down, see the table in src/index.css):
    desktop  ≥ 1440  design layout (1:1 at 1508), content centred in a 1508 px column on wider screens
    laptop   1024–1439  @media (max-width: 1439.98px)
    tablet   768–1023   @media (max-width: 1023.98px)
    mobile   < 768      @media (max-width: 767.98px), down to 320
*/
export const BREAKPOINTS = { tablet: 768, laptop: 1024, desktop: 1440 }

export const MEDIA = {
  mobile: `(max-width: ${BREAKPOINTS.tablet - 0.02}px)`,
  belowLaptop: `(max-width: ${BREAKPOINTS.laptop - 0.02}px)`,
  reducedMotion: '(prefers-reduced-motion: reduce)',
  finePointer: '(hover: hover) and (pointer: fine)',
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const list = window.matchMedia(query)
    const onChange = () => setMatches(list.matches)
    onChange()
    list.addEventListener('change', onChange)
    return () => list.removeEventListener('change', onChange)
  }, [query])

  return matches
}
