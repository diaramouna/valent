import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = ({ shouldPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    // Check for uploaded music in localStorage, fallback to bundled melody
    const savedMusic = localStorage.getItem('valentine-music');
    if (savedMusic) {
      audioRef.current.src = savedMusic;
    } else {
      audioRef.current.src = '/romantic-melody.mp3';
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (shouldPlay && audioRef.current && audioRef.current.src) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Browser blocked autoplay
      });
    }
  }, [shouldPlay]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <button
      className={`music-player ${isPlaying ? 'music-player--playing' : ''}`}
      onClick={toggle}
      data-testid="music-toggle"
      aria-label={isPlaying ? 'Couper la musique' : 'Jouer la musique'}
    >
      {isPlaying ? (
        <Volume2 size={20} className="music-icon" />
      ) : (
        <VolumeX size={20} className="music-icon" />
      )}
    </button>
  );
};

export default MusicPlayer;
