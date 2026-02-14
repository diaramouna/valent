import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';

const MESSAGES = [
  {
    text: "Ma chère Haby,\n\nDepuis que tu es entrée dans ma vie, chaque jour est devenu plus beau, plus lumineux, plus magique...",
    delay: 0,
  },
  {
    text: "Ton sourire illumine mes journées les plus sombres. Ta voix est la mélodie qui apaise mon cœur. Ta présence est le plus beau cadeau que la vie m'ait offert.",
    delay: 0,
  },
  {
    text: "Je chéris chaque instant passé à tes côtés, chaque rire partagé, chaque regard échangé. Tu es mon étoile, ma lumière, mon univers tout entier.",
    delay: 0,
  },
];

const TypewriterText = ({ text, isVisible }) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!isVisible) return;
    indexRef.current = 0;
    setDisplayed('');
    setDone(false);

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [text, isVisible]);

  return (
    <span className="typewriter-text" data-testid="typewriter-text">
      {displayed.split('\n').map((line, i) => (
        <span key={i}>
          {line}
          {i < displayed.split('\n').length - 1 && <br />}
        </span>
      ))}
      {!done && <span className="typewriter-cursor" />}
    </span>
  );
};

const RomanticTimeline = () => {
  const containerRef = useRef(null);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const { scrollYProgress } = useScroll();
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const parallaxY3 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div ref={containerRef} data-testid="romantic-timeline">
      {/* Parallax decorative elements */}
      <motion.div
        className="parallax-layer"
        style={{ y: parallaxY1, top: '15%', left: '8%', opacity: 0.15 }}
      >
        <Heart size={80} color="#FFD1DC" fill="#FFD1DC" />
      </motion.div>
      <motion.div
        className="parallax-layer"
        style={{ y: parallaxY2, top: '40%', right: '5%', opacity: 0.1 }}
      >
        <Star size={60} color="#D4AF37" fill="#D4AF37" />
      </motion.div>
      <motion.div
        className="parallax-layer"
        style={{ y: parallaxY3, top: '65%', left: '12%', opacity: 0.12 }}
      >
        <Sparkles size={50} color="#D4AF37" />
      </motion.div>

      {/* Intro Section */}
      <motion.section
        className="romantic-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.5 }}
        data-testid="section-intro"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring' }}
          style={{ marginBottom: '3rem' }}
        >
          <Heart size={48} color="#D4AF37" fill="#D4AF37" strokeWidth={1} />
        </motion.div>
        <motion.h2
          style={{
            fontFamily: 'var(--font-handwriting)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: 'var(--clr-gold)',
            textAlign: 'center',
            textShadow: '0 0 30px rgba(212,175,55,0.3)',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Pour toi, Haby...
        </motion.h2>

        <div className="scroll-indicator" data-testid="scroll-indicator">
          <span>Descends doucement</span>
          <div className="scroll-indicator__arrow" />
        </div>
      </motion.section>

      {/* Typewriter Sections */}
      {MESSAGES.map((msg, i) => (
        <motion.section
          key={i}
          className="romantic-section"
          onViewportEnter={() => setVisibleSections(prev => new Set([...prev, i]))}
          viewport={{ once: true, margin: '-200px' }}
          data-testid={`section-message-${i}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{
              maxWidth: 650,
              padding: '2rem',
              background: 'rgba(74,4,4,0.2)',
              borderRadius: '12px',
              border: '1px solid rgba(212,175,55,0.1)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <TypewriterText text={msg.text} isVisible={visibleSections.has(i)} />
          </motion.div>
        </motion.section>
      ))}
    </div>
  );
};

export default RomanticTimeline;
