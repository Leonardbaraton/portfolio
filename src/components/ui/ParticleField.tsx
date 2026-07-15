import { useParticles } from '../../hooks/useParticles';

export function ParticleField() {
  const canvasRef = useParticles();
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
