import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Heart } from 'lucide-react';
import { BirthdayConfig } from '../../config/birthdayConfig';
import {
  WatercolorButterfly,
  WatercolorCloud,
  WatercolorFlower,
  DoodleStar,
  WatercolorSeal,
} from '../WatercolorDoodles';

interface Page7ThingsINeverSayProps {
  config: BirthdayConfig;
  onNext: () => void;
  onStarFound: () => void;
}

export const Page7ThingsINeverSay: React.FC<Page7ThingsINeverSayProps> = ({
  config,
  onNext,
  onStarFound,
}) => {
  const [lineIndex, setLineIndex] = useState(0);

  const gratitudeLines = [
    'Thank you for listening.',
    'Thank you for understanding.',
    'Thank you for staying.',
    'Thank you for making me laugh.',
    'Thank you for being there.',
  ];

  useEffect(() => {
    if (lineIndex < gratitudeLines.length + 2) {
      const timer = setTimeout(() => {
        setLineIndex((prev) => prev + 1);
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [lineIndex, gratitudeLines.length]);

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 select-none overflow-hidden">
      {/* Easter Egg Star */}
      <div className="absolute top-10 right-10 animate-sparkle">
        <DoodleStar
          size={28}
          color="#93C5FD"
          onClick={onStarFound}
          className="cursor-pointer"
        />
      </div>

      {/* Soft floating clouds */}
      <div className="absolute top-0 left-0 w-80 md:w-96 animate-float-cloud opacity-40">
        <WatercolorCloud />
      </div>
      <div className="absolute bottom-0 right-0 w-88 md:w-112 animate-float-cloud opacity-40" style={{ animationDelay: '-7s' }}>
        <WatercolorCloud />
      </div>

      {/* Soft butterfly */}
      <div className="absolute top-14 left-10 animate-flutter">
        <WatercolorButterfly color="sky" size={54} />
      </div>

      <div className="relative z-10 max-w-2xl w-full mx-auto flex flex-col items-center">
        {/* Mood Setting Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="text-xl sm:text-2xl font-script text-blue-600 font-bold block mb-2">
            A quiet moment from the heart
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-black text-blue-950 tracking-tight leading-tight">
            Okay... <br />
            <span className="text-blue-800 italic">no jokes for a minute.</span>
          </h1>
        </motion.div>

        {/* Gratitude Lines Container */}
        <div className="w-full max-w-xl bg-white/60 backdrop-blur-xs border border-blue-200/80 rounded-3xl p-6 sm:p-10 scrapbook-shadow-lg mb-8 space-y-4 text-center">
          {gratitudeLines.map((line, idx) => (
            <AnimatePresence key={idx}>
              {lineIndex > idx && (
                <motion.div
                  initial={{ opacity: 0, x: -15, y: 5 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center justify-center gap-3 py-1"
                >
                  <span className="text-blue-500 text-lg">✦</span>
                  <p className="text-2xl sm:text-3xl font-handwriting font-bold text-blue-950">
                    {line}
                  </p>
                  <span className="text-blue-500 text-lg">✦</span>
                </motion.div>
              )}
            </AnimatePresence>
          ))}

          {/* Emotional Turning Statement */}
          {lineIndex >= gratitudeLines.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="pt-6 border-t border-blue-200/60 mt-4"
            >
              <p className="text-2xl sm:text-3xl font-serif-display text-blue-900 leading-relaxed font-semibold italic">
                &ldquo;Some people enter your life... <br />
                and somehow make it better without even trying.&rdquo;
              </p>
            </motion.div>
          )}

          {/* Final Large Statement */}
          {lineIndex >= gratitudeLines.length + 1 && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', damping: 14 }}
              className="pt-4"
            >
              <div className="inline-block bg-blue-600 text-white rounded-2xl px-6 py-3.5 shadow-md">
                <p className="text-3xl sm:text-4xl md:text-5xl font-patrick font-bold tracking-wide flex items-center justify-center gap-3">
                  <span>You&apos;re one of those people. 💙</span>
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Next Button */}
        {lineIndex >= gratitudeLines.length + 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={onNext}
              className="inline-flex items-center gap-3 px-10 py-4.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-patrick text-2xl font-bold tracking-wide scrapbook-shadow-lg transition-all"
            >
              <span>READ MY LETTER TO YOU</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
