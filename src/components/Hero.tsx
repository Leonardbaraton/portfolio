import { profile } from "../data/profile";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-white px-6"
    >
      {/* Subtle radial gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, #e8f0fe 0%, transparent 70%)" }} />

      <div className="relative z-10 text-center max-w-3xl">
        {/* Availability badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold tracking-wide mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Disponible — Stage de 4 mois à partir du 30 mars 2026
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-4 leading-none text-[#1d1d1f]">
          {profile.name}
        </h1>
        <h2 className="text-xl md:text-2xl font-medium text-[#6e6e73] mb-5 tracking-wide">
          {profile.title}
        </h2>
        <p className="text-[#6e6e73] text-base max-w-xl mx-auto mb-10 leading-relaxed">
          {profile.summary}
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="#contact"
            className="px-7 py-3 rounded-full text-white font-semibold transition-all hover:-translate-y-0.5 hover:opacity-90"
            style={{ backgroundColor: "#0071e3" }}
          >
            Me contacter
          </a>
          <a
            href="#projects"
            className="px-7 py-3 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] font-semibold transition-all hover:-translate-y-0.5"
          >
            Voir mes projets
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] font-semibold transition-all hover:-translate-y-0.5 inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.218.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#aeaeb2]">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#aeaeb2] to-transparent" />
      </div>
    </section>
  );
}
