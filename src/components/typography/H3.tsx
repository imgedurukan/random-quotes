export function H3({ element, children, className = '' }: { element?: string; children: React.ReactNode; className?: string }) {
  const baseClasses = `text-xl sm:text-2xl font-normal leading-relaxed text-[var(--text-primary)] ${className}`;

  switch (element) {
    case 'p':
      return <p className={baseClasses}>{children}</p>;
    case 'span':
      return <span className={baseClasses}>{children}</span>;
    default:
      return <h3 className={baseClasses}>{children}</h3>;
  }
}