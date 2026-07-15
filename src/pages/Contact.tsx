import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const GRADIENT_TEXT: React.CSSProperties = {
  background: 'linear-gradient(135deg, #818cf8 0%, #06b6d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const INPUT_STYLE: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
};

const CONTACT_LINKS = [
  {
    icon: <Mail size={18} />,
    label: 'leonardbaraton@gmail.com',
    href: 'mailto:leonardbaraton@gmail.com',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.218.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
    label: 'github.com/Leonardbaraton',
    href: 'https://github.com/Leonardbaraton',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    label: 'linkedin — Léonard Baraton',
    href: 'https://www.linkedin.com/in/léonard-baraton-5a91362b5/',
  },
];

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact — ${form.name}`);
    const body = encodeURIComponent(
      `Nom : ${form.name}\nEmail : ${form.email}\n\nMessage :\n${form.message}`,
    );
    window.location.href = `mailto:leonardbaraton@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <div className="px-6 py-32 max-w-5xl mx-auto">
      <span className="font-mono text-xs tracking-[0.35em] uppercase text-indigo-400 mb-4 block">
        Contact
      </span>
      <h1
        className="text-4xl md:text-6xl font-black tracking-tight mb-4"
        style={GRADIENT_TEXT}
      >
        Travaillons ensemble
      </h1>
      <p className="text-slate-400 text-lg mb-16 max-w-xl">
        Vous avez un projet à concrétiser ? Parlons-en.
      </p>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { id: 'name', label: 'Nom', type: 'text', placeholder: 'Votre nom', value: form.name, onChange: (v: string) => setForm((f) => ({ ...f, name: v })) },
            { id: 'email', label: 'Email', type: 'email', placeholder: 'votre@email.com', value: form.email, onChange: (v: string) => setForm((f) => ({ ...f, email: v })) },
          ].map(({ id, label, type, placeholder, value, onChange }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block font-mono text-xs tracking-widest uppercase text-slate-400 mb-2"
              >
                {label}
              </label>
              <input
                id={id}
                type={type}
                required
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-lg px-4 py-3 text-slate-200 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 transition-all placeholder:text-slate-600"
                style={INPUT_STYLE}
              />
            </div>
          ))}

          <div>
            <label
              htmlFor="message"
              className="block font-mono text-xs tracking-widest uppercase text-slate-400 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              placeholder="Décrivez votre projet..."
              className="w-full rounded-lg px-4 py-3 text-slate-200 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 transition-all resize-none placeholder:text-slate-600"
              style={INPUT_STYLE}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full font-semibold text-white transition-transform hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #818cf8, #06b6d4)' }}
          >
            Envoyer
          </button>
        </form>

        {/* Links */}
        <div>
          <h2 className="text-lg font-bold text-slate-100 mb-6">Retrouvez-moi</h2>
          <div className="space-y-3">
            {CONTACT_LINKS.map(({ icon, label, href }, i) => (
              <motion.a
                key={href}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-[1.02] group"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <span className="text-indigo-400 group-hover:text-cyan-400 transition-colors flex-shrink-0">
                  {icon}
                </span>
                <span className="text-slate-300 text-sm font-mono break-all">{label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
