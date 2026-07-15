interface NeonBadgeProps {
  label: string;
  color?: 'indigo' | 'cyan' | 'default';
}

const colorMap = {
  indigo: 'text-indigo-300 border-indigo-500/30 bg-indigo-500/10',
  cyan: 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10',
  default: 'text-slate-300 border-slate-500/30 bg-slate-500/10',
};

export function NeonBadge({ label, color = 'default' }: NeonBadgeProps) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded text-xs font-mono border tracking-widest uppercase ${colorMap[color]}`}
    >
      {label}
    </span>
  );
}
