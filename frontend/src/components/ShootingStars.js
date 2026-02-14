import { useState, useCallback, useEffect } from 'react';

const ShootingStars = () => {
  const [stars, setStars] = useState([]);

  const handleClick = useCallback((e) => {
    const id = Date.now() + Math.random();
    const angle = -30 - Math.random() * 30; // -30 to -60 degrees
    const star = {
      id,
      x: e.clientX,
      y: e.clientY,
      angle,
    };
    setStars(prev => [...prev, star]);
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [handleClick]);

  // Clean up old stars
  useEffect(() => {
    if (stars.length === 0) return;
    const timer = setTimeout(() => {
      setStars(prev => prev.slice(1));
    }, 1000);
    return () => clearTimeout(timer);
  }, [stars]);

  return (
    <div data-testid="shooting-stars" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 15 }}>
      {stars.map((star) => (
        <div
          key={star.id}
          className="shooting-star"
          style={{
            left: star.x,
            top: star.y,
            transform: `rotate(${star.angle}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export default ShootingStars;
