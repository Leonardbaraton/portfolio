import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

const PARTICLE_COLORS = [
  'rgba(129, 140, 248, 0.7)',
  'rgba(6, 182, 212, 0.7)',
  'rgba(129, 140, 248, 0.3)',
  'rgba(6, 182, 212, 0.3)',
];
const COUNT = 140;
const CONNECTION_DIST = 120;
const MOUSE_RADIUS = 150;
const SPEED_CAP = 1.5;

export function useParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animId = 0;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function init() {
      if (!canvas) return;
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      }));
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < CONNECTION_DIST) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(129, 140, 248, ${0.18 * (1 - dist / CONNECTION_DIST)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        if (!reducedMotion) {
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const mdist = Math.hypot(mdx, mdy);
          if (mdist < MOUSE_RADIUS && mdist > 0) {
            p.vx += (mdx / mdist) * 0.015;
            p.vy += (mdy / mdist) * 0.015;
          }

          const speed = Math.hypot(p.vx, p.vy);
          if (speed > SPEED_CAP) {
            p.vx = (p.vx / speed) * SPEED_CAP;
            p.vy = (p.vy / speed) * SPEED_CAP;
          }

          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      if (!reducedMotion) {
        animId = requestAnimationFrame(draw);
      }
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function onResize() {
      resize();
      init();
      if (!reducedMotion) draw();
    }

    resize();
    init();
    draw();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return canvasRef;
}
