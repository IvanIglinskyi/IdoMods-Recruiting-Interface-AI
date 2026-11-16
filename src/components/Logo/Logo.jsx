// SOLLUX wordmark, drawn with currentColor so the parent controls its color.
export default function Logo({ className, width = 121, height = 20 }) {
  return (
    <svg className={className} viewBox="0 0 121 20" width={width} height={height} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M18 3.1H5.5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h10a2 2 0 0 1 2 2v3.2a2 2 0 0 1-2 2H2" />
        <ellipse cx="31" cy="10" rx="7.5" ry="7" />
        <path d="M44 1.5v15.9h14" />
        <path d="M62.7 1.5v15.9h14.3" />
        <path d="M81.5 1.5v8.8a7.15 7.15 0 0 0 14.3 0V1.5" />
      </g>
      <path fill="currentColor" d="M100.6 1.5h4L119 19h-4zM114.4 1.5h4.2L104.6 19h-4.2z" />
    </svg>
  )
}
