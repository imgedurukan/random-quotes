export function H3({ element, children, className = '' }) {
  const baseClasses = `text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-200 ${className}`;

  switch (element) {
    case 'p':
      return <p className={baseClasses}>{children}</p>;
    case 'span':
      return <span className={baseClasses}>{children}</span>;
    default:
      return <h3 className={baseClasses}>{children}</h3>;
  }
}
