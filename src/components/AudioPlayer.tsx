import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { soundEngine } from '../utils/audioSoundtrack';

interface AudioPlayerProps {
  musicUrl?: string;
  autoStartOnFirstInteraction?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ musicUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      soundEngine.pauseMusic();
      setIsPlaying(false);
    } else {
      soundEngine.startMusic(musicUrl);
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  // Listen for user's first interaction to prompt gentle music start
  useEffect(() => {
    const handleFirstClick = () => {
      if (!soundEngine.getIsPlaying() && !isPlaying) {
        soundEngine.startMusic(musicUrl);
        setIsPlaying(true);
      }
      window.removeEventListener('click', handleFirstClick);
    };

    window.addEventListener('click', handleFirstClick, { once: true });
    return () => {
      window.removeEventListener('click', handleFirstClick);
    };
  }, [musicUrl, isPlaying]);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
      {showControls && (
        <div className="bg-[#FAF7F0]/95 backdrop-blur-md border border-blue-200 py-1.5 px-3 rounded-full shadow-lg flex items-center gap-2 transition-all">
          <span className="text-xs font-handwriting font-bold text-blue-900">
            {isPlaying ? '🎵 Playing Dreamy Melody' : '⏸️ Music Paused'}
          </span>
          <button
            onClick={toggleMute}
            className="p-1 text-blue-800 hover:text-blue-950 transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      )}

      {/* Main Music Button */}
      <button
        onClick={() => {
          togglePlay();
          setShowControls(true);
        }}
        onMouseEnter={() => setShowControls(true)}
        className={`p-3.5 rounded-full border-2 transition-all duration-300 shadow-md hover:scale-105 active:scale-95 flex items-center justify-center ${
          isPlaying
            ? 'bg-blue-600 border-blue-300 text-white shadow-blue-300/50'
            : 'bg-[#FAF7F0] border-blue-300 text-blue-800 hover:bg-blue-50'
        }`}
        title={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
        aria-label="Toggle Background Music"
      >
        {isPlaying ? (
          <Disc className="w-6 h-6 animate-spin" style={{ animationDuration: '6s' }} />
        ) : (
          <Music className="w-6 h-6 text-blue-700" />
        )}
      </button>
    </div>
  );
};
