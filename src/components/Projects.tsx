import { projects } from "../data/profile";

const stackColors: Record<string, string> = {
  "FastAPI": "text-[#1d1d1f] bg-white border-[#1d1d1f]",
  "React": "text-[#1d1d1f] bg-white border-[#1d1d1f]",
  "Docker": "text-[#1d1d1f] bg-white border-[#1d1d1f]",
  "TypeScript": "text-[#1d1d1f] bg-white border-[#1d1d1f]",
  "C++": "text-[#1d1d1f] bg-white border-[#1d1d1f]",
  "C++20": "text-[#1d1d1f] bg-white border-[#1d1d1f]",
  "SFML": "text-[#1d1d1f] bg-white border-[#1d1d1f]",
  "UDP": "text-[#1d1d1f] bg-white border-[#1d1d1f]",
  "PostgreSQL": "text-[#1d1d1f] bg-white border-[#1d1d1f]",
};

const ProjectIcon = ({ title }: { title: string }) => {
  if (title.includes("R-TYPE")) {
    return (
      <svg className="w-5 h-5 text-[#af52de]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    );
  }
  if (title.includes("AREA")) {
    return (
      <svg className="w-5 h-5 text-[#0071e3]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5 text-[#ff9500]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-white px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-[#1d1d1f] mb-3">Projets</h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#0071e3]/40" />
            <div className="w-2 h-2 rounded-full bg-[#0071e3]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#0071e3]/40" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-[#f5f5f7] rounded-2xl border border-[#d2d2d7] hover:border-[#0071e3]/30 transition-all hover:-translate-y-1 group flex flex-col overflow-hidden"
            >
              {/* Top line */}
              <div className="h-px w-full bg-gradient-to-r from-[#0071e3]/0 via-[#0071e3]/40 to-[#0071e3]/0" />

              <div className="p-6 flex flex-col flex-1">
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-white border border-[#d2d2d7] flex items-center justify-center mb-4">
                  <ProjectIcon title={project.title} />
                </div>

                <div className="flex-1">
                  <p className="text-xs text-[#aeaeb2] font-semibold uppercase tracking-widest mb-1">
                    {project.type}
                  </p>
                  <h3 className="text-lg font-bold text-[#1d1d1f] mb-3 group-hover:text-[#0071e3] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[#6e6e73] text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Stack badges */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className={`px-2 py-0.5 rounded text-xs font-medium border ${stackColors[tech] ?? "text-[#1d1d1f] bg-white border-[#1d1d1f]"}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-[#0071e3] hover:opacity-70 text-sm font-medium transition-opacity"
                  >
                    Voir le projet
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
