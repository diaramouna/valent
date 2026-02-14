import { useEffect, useRef, useState, useCallback } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const sparklesRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = window.matchMedia('(hover: none)').matches;
    setIsMobile(check);
  }, []);

  const createSparkle = useCallback((x, y) => {
    const el = document.createElement('div');
    el.className = 'cursor-sparkle';
    el.style.left = `${x - 3}px`;
    el.style.top = `${y - 3}px`;
    el.style.background = Math.random() > 0.5 ? '#D4AF37' : '#FFD1DC';
    document.body.appendChild(el);
    sparklesRef.current.push(el);

    setTimeout(() => {
      el.remove();
      sparklesRef.current = sparklesRef.current.filter(s => s !== el);
    }, 600);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    document.body.classList.add('custom-cursor-active');

    let frameCount = 0;
    const handleMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX - 10}px`;
        cursorRef.current.style.top = `${e.clientY - 10}px`;
      }
      frameCount++;
      if (frameCount % 3 === 0) {
        createSparkle(e.clientX, e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.body.classList.remove('custom-cursor-active');
      sparklesRef.current.forEach(el => el.remove());
    };
  }, [isMobile, createSparkle]);

  if (isMobile) return null;

  return (
    <div ref={cursorRef} className="custom-cursor" data-testid="custom-cursor">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="#D4AF37"
          filter="url(#glow)"
        />
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default CustomCursor;
