interface BrandLogoProps {
  className?: string;
  label?: string;
}

export default function BrandLogo({ className = '', label = 'GeoGenesis' }: BrandLogoProps) {
  return (
    <span className={`brand-mark ${className}`.trim()} role="img" aria-label={label}>
      <span className="brand-mark-text">{label}</span>
    </span>
  );
}
