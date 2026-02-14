import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, HeartCrack } from 'lucide-react';

const ValentineProposal = ({ onYes }) => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noVisible, setNoVisible] = useState(true);
  const [noOpacity, setNoOpacity] = useState(1);
  const [yesHovered, setYesHovered] = useState(false);
  const containerRef = useRef(null);

  const moveNo = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const newX = (Math.random() - 0.5) * vw * 0.7;
    const newY = (Math.random() - 0.5) * vh * 0.5;
    setNoPos({ x: newX, y: newY });
    setNoOpacity(prev => Math.max(prev - 0.2, 0));
  }, []);

  const handleYesHover = () => {
    setYesHovered(true);
    setNoOpacity(prev => Math.max(prev - 0.3, 0));
    if (noOpacity <= 0.3) setNoVisible(false);
  };

  return (
    <section
      className="proposal-section"
      ref={containerRef}
      data-testid="valentine-proposal"
    >
      <motion.h2
        className="proposal-question"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, type: 'spring' }}
        data-testid="proposal-question"
      >
        Veux-tu être ma Valentine le temps de cette soirée ?
      </motion.h2>

      <div className="proposal-buttons" style={{ position: 'relative', minHeight: 120, minWidth: 300 }}>
        {/* YES Button */}
        <motion.button
          className="btn-yes"
          onClick={onYes}
          onMouseEnter={handleYesHover}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          data-testid="btn-yes"
        >
          <Heart
            size={18}
            fill="white"
            style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }}
          />
          OUI
        </motion.button>

        {/* NO Button */}
        <AnimatePresence>
          {noVisible && (
            <motion.button
              className="btn-no"
              onMouseEnter={moveNo}
              onTouchStart={moveNo}
              animate={{
                x: noPos.x,
                y: noPos.y,
                opacity: noOpacity,
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              data-testid="btn-no"
            >
              <HeartCrack
                size={14}
                style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }}
              />
              Non
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {yesHovered && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            color: 'rgba(212,175,55,0.5)',
            marginTop: '1rem',
            fontStyle: 'italic',
          }}
          data-testid="hint-text"
        >
          Tu sais déjà la réponse...
        </motion.p>
      )}
    </section>
  );
};

export default ValentineProposal;
