import { experiences } from "../data/profile";

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-[#f5f5f7] px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-[#1d1d1f] mb-3">Expériences professionnelles</h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#0071e3]/40" />
            <div className="w-2 h-2 rounded-full bg-[#0071e3]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#0071e3]/40" />
          </div>
        </div>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.company + exp.period}
              className="relative pl-8"
            >
              {/* Accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#0071e3] rounded-full opacity-40" />

              <div className="bg-white rounded-2xl p-6 border border-[#d2d2d7] hover:border-[#0071e3]/30 transition-colors">
                <div className="flex flex-wrap justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#1d1d1f]">{exp.company}</h3>
                    <p className="text-[#0071e3] font-medium text-sm mt-0.5">{exp.role}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#0071e3]/8 text-[#0071e3] text-xs font-semibold border border-[#0071e3]/20 tracking-wide">
                      {exp.period}
                    </span>
                    <p className="text-[#aeaeb2] text-xs mt-1">{exp.location}</p>
                  </div>
                </div>

                <ul className="space-y-2 mt-3">
                  {exp.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[#6e6e73] text-sm">
                      <span className="w-1 h-1 rounded-full bg-[#0071e3] mt-2 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
