import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const NAV_LINKS = [
  { to: '/projets', label: 'Projets' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50"
      style={{
        background: 'rgba(13, 13, 32, 0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink
          to="/"
          className="font-mono text-sm font-bold tracking-[0.3em] text-indigo-400 uppercase hover:text-indigo-300 transition-colors"
        >
          LB
        </NavLink>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-indigo-400'
                      : 'text-slate-400 hover:text-slate-200'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-400 hover:text-slate-200 transition-colors p-1 rounded"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
            style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
          >
            <ul className="px-6 py-5 flex flex-col gap-5">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-indigo-400'
                          : 'text-slate-400 hover:text-slate-200'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
