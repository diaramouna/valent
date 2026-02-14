import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

const HEART_COLORS = ['#FFD1DC', '#ff6b81', '#D4AF37', '#ff1a4b', '#fff0f5'];

const FinalDeclaration = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [hearts, setHearts] = useState([]);
  const confettiFired = useRef(false);

  useEffect(() => {
    if (confettiFired.current) return;
    confettiFired.current = true;

    // Heart-shaped confetti bursts
    const fireConfetti = () => {
      const heart = confetti.shapeFromPath({
        path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
      });

      const defaults = {
        spread: 360,
        ticks: 100,
        gravity: 0.4,
        decay: 0.94,
        startVelocity: 20,
        shapes: [heart],
        colors: HEART_COLORS,
        scalar: 1.2,
      };

      confetti({ ...defaults, particleCount: 50, origin: { x: 0.5, y: 0.4 } });
      setTimeout(() => confetti({ ...defaults, particleCount: 30, origin: { x: 0.3, y: 0.5 } }), 300);
      setTimeout(() => confetti({ ...defaults, particleCount: 30, origin: { x: 0.7, y: 0.5 } }), 600);
      setTimeout(() => confetti({ ...defaults, particleCount: 60, origin: { x: 0.5, y: 0.3 } }), 1000);
    };

    fireConfetti();

    // Falling hearts animation
    const newHearts = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 20 + 12,
      duration: Math.random() * 4 + 4,
      delay: Math.random() * 3,
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
    }));
    setHearts(newHearts);

    // Show message after confetti
    setTimeout(() => setShowMessage(true), 1500);
  }, []);

  return (
    <>
      {/* Falling hearts overlay */}
      <div className="final-hearts" data-testid="final-hearts">
        {hearts.map((h) => (
          <div
            key={h.id}
            className="falling-heart"
            style={{
              left: `${h.x}%`,
              fontSize: h.size,
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
              color: h.color,
            }}
          >
            <Heart size={h.size} fill={h.color} color={h.color} />
          </div>
        ))}
      </div>

      <section className="final-section" data-testid="final-declaration">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={showMessage ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, type: 'spring', bounce: 0.3 }}
          style={{ zIndex: 10 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart size={64} color="#D4AF37" fill="#D4AF37" strokeWidth={0.5} />
          </motion.div>
        </motion.div>

        <motion.h1
          className="final-name"
          initial={{ opacity: 0, y: 30 }}
          animate={showMessage ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.5 }}
          data-testid="final-name"
        >
          Haby
        </motion.h1>

        <motion.p
          className="final-message"
          initial={{ opacity: 0, y: 20 }}
          animate={showMessage ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 1 }}
          data-testid="final-message"
        >
          Tu es la plus belle chose qui me soit arrivée.
          Chaque battement de mon cœur murmure ton nom.
          Ce soir et pour toujours, tu es ma Valentine,
          mon étoile, mon amour, ma raison de sourire.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={showMessage ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2 }}
          style={{
            fontFamily: 'var(--font-handwriting)',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            color: 'var(--clr-gold)',
            textShadow: '0 0 30px rgba(212,175,55,0.3)',
          }}
          data-testid="final-signature"
        >
          Avec tout mon amour...
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={showMessage ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 2.5, type: 'spring' }}
          style={{
            marginTop: '2rem',
            display: 'flex',
            gap: '0.5rem',
          }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart size={16} fill="#FFD1DC" color="#FFD1DC" />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
};

export default FinalDeclaration;
