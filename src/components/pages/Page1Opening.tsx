import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { BirthdayConfig } from '../../config/birthdayConfig';
import {
  WatercolorButterfly,
  WatercolorCloud,
  WatercolorFlower,
  DoodleStar,
} from '../WatercolorDoodles';

interface Page1OpeningProps {
  config: BirthdayConfig;
  onNext: () => void;
  onStarFound: () => void;
}

export const Page1Opening: React.FC<Page1OpeningProps> = ({
  config,
  onNext,
  onStarFound,
}) => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(2), 1400);
    const t2 = setTimeout(() => setStep(3), 2800);
    const t3 = setTimeout(() => setStep(4), 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 overflow-hidden select-none">
      {/* Dreamy watercolor clouds drifting */}
      <div className="absolute top-4 left-0 w-72 md:w-96 animate-float-cloud">
        <WatercolorCloud opacity={0.45} />
      </div>
      <div className="absolute bottom-10 right-0 w-80 md:w-112 animate-float-cloud" style={{ animationDelay: '-6s' }}>
        <WatercolorCloud opacity={0.4} />
      </div>

      {/* Fluttering Butterflies */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, -15, 0],
          rotate: [0, 10, -5, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-12 left-8 md:left-24"
      >
        <WatercolorButterfly color="sky" size={56} />
      </motion.div>

      <motion.div
        animate={{
          x: [0, -50, 20, 0],
          y: [0, -20, -40, 0],
          rotate: [0, -8, 12, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-20 right-8 md:right-28"
      >
        <WatercolorButterfly color="royal" size={62} />
      </motion.div>

      {/* Hand-drawn blue flowers at corners */}
      <div className="absolute top-8 right-12 hidden sm:block animate-float-gentle">
        <WatercolorFlower size={48} rotation={15} />
      </div>
      <div className="absolute bottom-12 left-10 hidden sm:block animate-float-gentle" style={{ animationDelay: '2s' }}>
        <WatercolorFlower size={52} rotation={-20} />
      </div>

      {/* Secret Easter Egg Star hidden in plain sight */}
      <div className="absolute top-16 right-20 sm:right-32 animate-sparkle">
        <DoodleStar
          size={28}
          color="#93C5FD"
          onClick={onStarFound}
          className="cursor-pointer hover:rotate-45"
        />
      </div>

      {/* Central Content with Dramatic, Large, Beautiful Typography */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Line 1 */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="mb-4"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-lg md:text-xl font-handwriting font-bold tracking-wide shadow-xs">
            A handmade memory book for {config.bestFriendName}
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-display font-black text-blue-950 tracking-tight mt-3 leading-tight filter drop-shadow-xs">
            Hey Bestie... 💙
          </h1>
        </motion.div>

        {/* Line 2 */}
        {step >= 2 && (
          <motion.p
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="text-2xl sm:text-3xl md:text-4xl font-handwriting text-blue-900/90 font-bold mb-3 leading-relaxed"
          >
            I made a tiny little world for you.
          </motion.p>
        )}

        {/* Line 3 */}
        {step >= 3 && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl sm:text-2xl md:text-3xl font-script text-blue-600 font-bold mb-8 italic"
          >
            Don&apos;t leave yet...
          </motion.p>
        )}

        {/* Large Button */}
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 200 }}
            className="mt-2"
          >
            <button
              onClick={onNext}
              className="group relative inline-flex items-center gap-4 px-10 py-5 sm:px-12 sm:py-6 rounded-3xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-patrick text-2xl sm:text-3xl font-bold tracking-wider scrapbook-shadow-lg hover:shadow-blue-400/40 transition-all duration-300 border-2 border-blue-300"
            >
              <span>LET&apos;S BEGIN</span>
              <Sparkles className="w-7 h-7 text-yellow-300 group-hover:rotate-45 transition-transform" />
              <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
            </button>
            <p className="font-handwriting text-blue-800/80 text-lg mt-3">
              (Turn up your volume for the full experience 🎵)
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
