import { education, languages, hobbies, profile } from "../data/profile";

const IconLocation = () => (
  <svg className="w-4 h-4 shrink-0 text-[#0071e3]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);
const IconMail = () => (
  <svg className="w-4 h-4 shrink-0 text-[#0071e3]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);
const IconSchool = () => (
  <svg className="w-4 h-4 shrink-0 text-[#0071e3]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
);

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#f5f5f7] px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-[#1d1d1f] mb-3">À propos</h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#0071e3]/40" />
            <div className="w-2 h-2 rounded-full bg-[#0071e3]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#0071e3]/40" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Infos perso */}
          <div>
            <h3 className="text-xs font-bold text-[#0071e3] mb-6 uppercase tracking-[0.2em]">
              Profil
            </h3>
            <ul className="space-y-4 text-[#1d1d1f]">
              <li className="flex items-center gap-3">
                <IconLocation />
                <span>{profile.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <IconMail />
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-[#0071e3] transition-colors"
                >
                  {profile.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <IconSchool />
                <span>{profile.school}</span>
              </li>
            </ul>

            <h3 className="text-xs font-bold text-[#0071e3] mt-10 mb-4 uppercase tracking-[0.2em]">
              Langues
            </h3>
            <ul className="space-y-2">
              {languages.map((l) => (
                <li key={l.lang} className="flex justify-between items-center text-[#1d1d1f]">
                  <span>{l.lang}</span>
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-[#0071e3]/10 text-[#0071e3] border border-[#0071e3]/20">
                    {l.level}
                  </span>
                </li>
              ))}
            </ul>

            <h3 className="text-xs font-bold text-[#0071e3] mt-10 mb-4 uppercase tracking-[0.2em]">
              Loisirs
            </h3>
            <div className="flex flex-wrap gap-2">
              {hobbies.map((h) => (
                <span
                  key={h}
                  className="px-3 py-1 rounded-full bg-white text-[#1d1d1f] text-sm border border-[#d2d2d7] hover:border-[#0071e3]/40 transition-colors"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* Formation */}
          <div>
            <h3 className="text-xs font-bold text-[#0071e3] mb-6 uppercase tracking-[0.2em]">
              Formation
            </h3>
            <div className="space-y-8">
              {education.map((edu) => (
                <div
                  key={edu.school}
                  className="relative pl-6 border-l border-[#d2d2d7]"
                >
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#0071e3] ring-4 ring-[#f5f5f7]" />
                  <p className="text-xs text-[#0071e3] font-semibold tracking-wide mb-1 uppercase">
                    {edu.period}
                  </p>
                  <h4 className="text-base font-bold text-[#1d1d1f]">{edu.school}</h4>
                  <p className="text-[#6e6e73] text-sm">{edu.degree}</p>
                  {edu.detail && (
                    <p className="text-[#aeaeb2] text-xs mt-1">{edu.detail}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
