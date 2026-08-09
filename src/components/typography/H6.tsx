export function H6({ element, children }: { element?: string; children: React.ReactNode }) {
  const baseClasses = 'text-sm font-medium text-[var(--text-secondary)] text-right block tracking-wide';

  switch (element) {
    case 'span':
      return <span className={baseClasses}>- {children}</span>;
    case 'p':
      return <p className={baseClasses}>- {children}</p>;
    default:
      return <h6 className={baseClasses}>- {children}</h6>;
  }
}