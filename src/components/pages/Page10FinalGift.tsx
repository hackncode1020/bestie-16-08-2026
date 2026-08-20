import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, ArrowRight, Heart } from 'lucide-react';
import { BirthdayConfig } from '../../config/birthdayConfig';
import {
  WatercolorButterfly,
  WatercolorFlower,
  DoodleStar,
  WashiTape,
  WatercolorSeal,
} from '../WatercolorDoodles';
import { soundEngine } from '../../utils/audioSoundtrack';

interface Page10FinalGiftProps {
  config: BirthdayConfig;
  onNext: () => void;
  onStarFound: () => void;
}

export const Page10FinalGift: React.FC<Page10FinalGiftProps> = ({
  config,
  onNext,
  onStarFound,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenGift = () => {
    if (isOpened) return;
    soundEngine.playConfettiPop();
    setIsOpened(true);

    // Multi-stage celebratory confetti explosion
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#60A5FA', '#3B82F6', '#93C5FD'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#FEF08A', '#FBBF24', '#DBEAFE'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#1D4ED8', '#2563EB', '#60A5FA'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#93C5FD', '#FFFFFF', '#60A5FA'],
    });
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 select-none">
      {/* Easter Egg Star */}
      <div className="absolute top-10 right-12 animate-sparkle">
        <DoodleStar
          size={28}
          color="#60A5FA"
          onClick={onStarFound}
          className="cursor-pointer"
        />
      </div>

      {/* Fluttering Butterflies */}
      <div className="absolute top-6 left-10 animate-flutter">
        <WatercolorButterfly color="sky" size={54} />
      </div>
      <div className="absolute bottom-6 right-10 hidden sm:block">
        <WatercolorFlower size={52} rotation={30} />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center">
        <div className="flex justify-center mb-3">
          <WashiTape type="striped" width="w-48" rotation={-2} />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-black text-blue-950 tracking-tight leading-tight mb-2"
        >
          One last surprise... 🎁
        </motion.h1>

        <p className="text-xl sm:text-2xl font-handwriting font-bold text-blue-800 mb-8">
          Handcrafted with pure love, endless blue ribbons, and heartfelt wishes.
        </p>

        {/* Handcrafted Interactive Gift Box */}
        <div className="relative my-4 flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!isOpened ? (
              <motion.div
                key="closed-gift"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                onClick={handleOpenGift}
                className="cursor-pointer group relative flex flex-col items-center"
              >
                {/* SVG Handmade Gift Box */}
                <svg
                  width={220}
                  height={220}
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="filter drop-shadow-xl"
                >
                  <defs>
                    <linearGradient id="box-base" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#DBEAFE" />
                      <stop offset="100%" stopColor="#93C5FD" />
                    </linearGradient>
                    <linearGradient id="box-ribbon" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="100%" stopColor="#1E3A8A" />
                    </linearGradient>
                    <linearGradient id="lid-base" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#BFDBFE" />
                      <stop offset="100%" stopColor="#60A5FA" />
                    </linearGradient>
                  </defs>

                  {/* Main Box Body */}
                  <rect x="35" y="80" width="130" height="95" rx="12" fill="url(#box-base)" stroke="#1E40AF" strokeWidth="2.5" />
                  
                  {/* Vertical Ribbon */}
                  <rect x="88" y="80" width="24" height="95" fill="url(#box-ribbon)" stroke="#172554" strokeWidth="1.5" />

                  {/* Box Lid */}
                  <rect x="25" y="55" width="150" height="32" rx="8" fill="url(#lid-base)" stroke="#1E40AF" strokeWidth="2.5" />
                  <rect x="88" y="55" width="24" height="32" fill="url(#box-ribbon)" stroke="#172554" strokeWidth="1.5" />

                  {/* Ribbon Bow */}
                  <path
                    d="M100 55 C85 30, 45 35, 65 55 C80 60, 95 56, 100 55"
                    fill="url(#box-ribbon)"
                    stroke="#172554"
                    strokeWidth="2"
                  />
                  <path
                    d="M100 55 C115 30, 155 35, 135 55 C120 60, 105 56, 100 55"
                    fill="url(#box-ribbon)"
                    stroke="#172554"
                    strokeWidth="2"
                  />
                  <circle cx="100" cy="55" r="7" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
                </svg>

                <div className="mt-4">
                  <button
                    onClick={handleOpenGift}
                    className="inline-flex items-center gap-3 px-10 py-4.5 rounded-3xl bg-blue-600 group-hover:bg-blue-700 active:scale-95 text-white font-patrick text-2xl font-bold tracking-wider scrapbook-shadow-lg transition-all"
                  >
                    <span>OPEN IT 💙</span>
                    <Sparkles className="w-6 h-6 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Opened Gift Box Exploded State */
              <motion.div
                key="opened-gift"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="torn-paper rounded-3xl p-6 sm:p-10 scrapbook-shadow-lg border-2 border-blue-300 bg-[#FCFBF7] text-center max-w-lg"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-4 rounded-full bg-blue-100 text-blue-600 animate-bounce">
                    <Heart className="w-14 h-14 fill-blue-500 text-blue-600" />
                  </div>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-black text-blue-950 mb-3">
                  A Box Full of Blessings 💙
                </h2>

                <p className="text-2xl sm:text-3xl font-handwriting font-bold text-blue-800 mb-6 leading-relaxed">
                  May your year be filled with infinite happiness, boundless peace, success, and zero bad hair days!
                </p>

                <button
                  onClick={onNext}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-patrick text-2xl font-bold tracking-wide scrapbook-shadow-lg transition-all"
                >
                  <span>SEE FINAL BIRTHDAY MESSAGE</span>
                  <ArrowRight className="w-6 h-6" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
