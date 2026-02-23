import { skills } from "../data/profile";

const categories = [
  {
    title: "Langages",
    items: skills.languages,
    dotColor: "bg-indigo-400",
    borderHover: "hover:border-indigo-500/50",
    labelColor: "text-indigo-400",
  },
  {
    title: "Frameworks & Librairies",
    items: skills.frameworks,
    dotColor: "bg-violet-400",
    borderHover: "hover:border-violet-500/50",
    labelColor: "text-violet-400",
  },
  {
    title: "Outils & DevOps",
    items: skills.tools,
    dotColor: "bg-emerald-400",
    borderHover: "hover:border-emerald-500/50",
    labelColor: "text-emerald-400",
  },
  {
    title: "Autres compétences",
    items: skills.other,
    dotColor: "bg-amber-400",
    borderHover: "hover:border-amber-500/50",
    labelColor: "text-amber-400",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-gray-950 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-3">Compétences</h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-indigo-500" />
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-indigo-500" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className={`bg-gray-900 rounded-2xl p-6 border border-gray-800 ${cat.borderHover} transition-all hover:-translate-y-0.5 group`}
            >
              <h3 className={`text-xs font-bold uppercase tracking-[0.2em] mb-5 ${cat.labelColor}`}>
                {cat.title}
              </h3>
              <ul className="space-y-2.5">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-gray-400 text-sm">
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
