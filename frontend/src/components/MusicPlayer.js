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

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      localStorage.setItem('valentine-music', dataUrl);
      if (audioRef.current) {
        audioRef.current.src = dataUrl;
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
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

      {/* Hidden file input for music upload */}
      <label
        style={{
          position: 'fixed',
          bottom: '5rem',
          right: '2rem',
          zIndex: 50,
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'rgba(74,4,4,0.6)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(212,175,55,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#D4AF37',
          fontSize: '1.2rem',
          transition: 'all 0.3s ease',
        }}
        data-testid="music-upload-label"
        title="Importer votre MP3"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <input
          type="file"
          accept="audio/mp3,audio/mpeg,audio/*"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          data-testid="music-upload-input"
        />
      </label>
    </>
  );
};

export default MusicPlayer;
