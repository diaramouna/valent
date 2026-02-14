import { useState, useCallback } from 'react';
import '@/App.css';
import PasswordGate from '@/components/PasswordGate';
import ParticleCanvas from '@/components/ParticleCanvas';
import CustomCursor from '@/components/CustomCursor';
import MusicPlayer from '@/components/MusicPlayer';
import RomanticTimeline from '@/components/RomanticTimeline';
import ValentineProposal from '@/components/ValentineProposal';
import FinalDeclaration from '@/components/FinalDeclaration';
import ShootingStars from '@/components/ShootingStars';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [musicReady, setMusicReady] = useState(false);

  const handlePasswordSuccess = useCallback(() => {
    setIsUnlocked(true);
    setMusicReady(true);
  }, []);

  const handleYes = useCallback(() => {
    setShowFinal(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="App" data-testid="app-root">
      <CustomCursor />
      <ParticleCanvas variant={isUnlocked ? 'light' : 'dark'} />

      <AnimatePresence mode="wait">
        {!isUnlocked && (
          <PasswordGate key="gate" onSuccess={handlePasswordSuccess} />
        )}
      </AnimatePresence>

      {isUnlocked && (
        <>
          <ShootingStars />
          <MusicPlayer shouldPlay={musicReady} />

          <AnimatePresence mode="wait">
            {!showFinal ? (
              <motion.main
                key="main-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                data-testid="main-content"
              >
                <RomanticTimeline />
                <ValentineProposal onYes={handleYes} />
              </motion.main>
            ) : (
              <motion.div
                key="final"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                data-testid="final-content"
              >
                <FinalDeclaration />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export default App;
