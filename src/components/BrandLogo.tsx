interface BrandLogoProps {
  className?: string;
  label?: string;
}

export default function BrandLogo({ className = '', label = 'GeoGenesis' }: BrandLogoProps) {
  return (
    <span className={`brand-mark ${className}`.trim()} role="img" aria-label={label}>
      <span className="brand-mark-icon" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[1.15rem] w-[1.15rem]">
          <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
          <path
            d="M6 20c3-2 7-3 10-3s7 1 10 3"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.55"
          />
          <path
            d="M8 14c2.5-1.5 5.5-2 8-2s5.5.5 8 2"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.75"
          />
          <path d="M10 9c2-1 4-1.5 6-1.5s4 .5 6 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="16" cy="16" r="2.5" fill="currentColor" opacity="0.9" />
        </svg>
      </span>
      <span className="brand-mark-text">{label}</span>
    </span>
  );
}
