import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`rounded-2xl p-6 ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.07)',
        border: '1px solid rgba(255, 255, 255, 0.13)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {children}
    </motion.div>
  );
}
