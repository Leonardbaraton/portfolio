import { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, ExternalLink, Mail } from 'lucide-react';

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
    icon: <GitBranch size={18} />,
    label: 'github.com/Leonardbaraton',
    href: 'https://github.com/Leonardbaraton',
  },
  {
    icon: <ExternalLink size={18} />,
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
                className="w-full rounded-lg px-4 py-3 text-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all placeholder:text-slate-600"
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
              className="w-full rounded-lg px-4 py-3 text-slate-200 text-sm outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all resize-none placeholder:text-slate-600"
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
