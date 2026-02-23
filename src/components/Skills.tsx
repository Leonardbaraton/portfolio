import { skills } from "../data/profile";

const categories = [
  {
    title: "Langages",
    items: skills.languages,
    dotColor: "bg-[#0071e3]",
    borderHover: "hover:border-[#0071e3]/30",
    labelColor: "text-[#0071e3]",
  },
  {
    title: "Frameworks & Librairies",
    items: skills.frameworks,
    dotColor: "bg-[#0071e3]",
    borderHover: "hover:border-[#0071e3]/30",
    labelColor: "text-[#0071e3]",
  },
  {
    title: "Outils & DevOps",
    items: skills.tools,
    dotColor: "bg-[#0071e3]",
    borderHover: "hover:border-[#0071e3]/30",
    labelColor: "text-[#0071e3]",
  },
  {
    title: "Autres compétences",
    items: skills.other,
    dotColor: "bg-[#0071e3]",
    borderHover: "hover:border-[#0071e3]/30",
    labelColor: "text-[#0071e3]",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-white px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-[#1d1d1f] mb-3">Compétences</h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#0071e3]/40" />
            <div className="w-2 h-2 rounded-full bg-[#0071e3]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#0071e3]/40" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className={`bg-[#f5f5f7] rounded-2xl p-6 border border-[#d2d2d7] ${cat.borderHover} transition-all hover:-translate-y-0.5 group`}
            >
              <h3 className={`text-xs font-bold uppercase tracking-[0.2em] mb-5 ${cat.labelColor}`}>
                {cat.title}
              </h3>
              <ul className="space-y-2.5">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[#6e6e73] text-sm">
                    <span className={`w-1 h-1 rounded-full shrink-0 ${cat.dotColor}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
