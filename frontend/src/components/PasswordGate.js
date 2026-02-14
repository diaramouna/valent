import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';

const PASSWORD = 'batoulou';

const PasswordGate = ({ onSuccess }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.toLowerCase().trim() === PASSWORD) {
      setError(false);
      setTransitioning(true);
      setTimeout(() => onSuccess(), 2000);
    } else {
      setError(true);
      setValue('');
      inputRef.current?.focus();
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {!transitioning ? (
        <motion.div
          className="password-gate"
          data-testid="password-gate"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ marginBottom: '2rem' }}
            >
              <Lock size={32} color="#D4AF37" strokeWidth={1.5} />
            </motion.div>

            <h1 className="password-gate__title">
              Seule une personne spéciale peut entrer...
            </h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="password-gate__input-wrap">
                <input
                  ref={inputRef}
                  type="password"
                  className="password-gate__input"
                  placeholder="Mot de passe..."
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  autoFocus
                  data-testid="password-input"
                />
              </div>

              <motion.button
                type="submit"
                className="password-gate__submit"
                whileTap={{ scale: 0.95 }}
                data-testid="password-submit"
              >
                Entrer
              </motion.button>

              <AnimatePresence>
                {error && (
                  <motion.p
                    className="password-gate__error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    data-testid="password-error"
                  >
                    Ce n'est pas le bon mot de passe...
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="transition-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, times: [0, 0.3, 0.7, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'all',
          }}
          data-testid="transition-overlay"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 20] }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(212,175,55,0.8), rgba(255,209,220,0.4), transparent)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PasswordGate;
