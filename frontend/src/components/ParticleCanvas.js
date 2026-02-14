import { useEffect, useRef, useCallback } from 'react';

const ParticleCanvas = ({ variant = 'dark' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  const createParticle = useCallback((width, height) => {
    const isHeart = Math.random() > 0.7;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.5 - 0.1,
      opacity: Math.random() * 0.5 + 0.2,
      isHeart,
      heartSize: Math.random() * 8 + 4,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    };
  }, []);

  const drawHeart = useCallback((ctx, x, y, size, opacity, color) => {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.2, x, y + size);
    ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = 80;
    particlesRef.current = Array.from({ length: count }, () =>
      createParticle(canvas.width, canvas.height)
    );

    const goldColor = '#D4AF37';
    const pinkColor = '#FFD1DC';

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now() * 0.001;

      particlesRef.current.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;

        const twinkle = Math.sin(time * p.twinkleSpeed * 10 + p.twinkleOffset) * 0.3 + 0.7;
        const currentOpacity = p.opacity * twinkle;

        if (p.isHeart) {
          drawHeart(ctx, p.x, p.y, p.heartSize, currentOpacity * 0.6, pinkColor);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = goldColor;
          ctx.globalAlpha = currentOpacity;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
          glow.addColorStop(0, `rgba(212,175,55,${currentOpacity * 0.3})`);
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.globalAlpha = 1;
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [createParticle, drawHeart]);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      data-testid="particle-canvas"
    />
  );
};

export default ParticleCanvas;
