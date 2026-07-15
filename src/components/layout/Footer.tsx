export function Footer() {
  return (
    <footer
      className="py-10 px-6"
      style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-xs text-slate-600 tracking-widest uppercase">
          LB Freelance — 2026
        </span>
        <div className="flex gap-6">
          {[
            { label: 'GitHub', href: 'https://github.com/Leonardbaraton' },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/léonard-baraton-5a91362b5/',
            },
            { label: 'Email', href: 'mailto:leonardbaraton@gmail.com' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="font-mono text-xs text-slate-600 hover:text-slate-300 transition-colors tracking-wide uppercase"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
