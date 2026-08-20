import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Heart, Smile } from 'lucide-react';
import { WatercolorButterfly, WatercolorFlower } from './WatercolorDoodles';

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
  foundCount: number;
  totalCount: number;
}

export const EasterEggModal: React.FC<EasterEggModalProps> = ({
  isOpen,
  onClose,
  foundCount,
  totalCount,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/40 backdrop-blur-sm">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20, rotate: -2 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20, rotate: 2 }}
            transition={{ type: 'spring', damping: 22, stiffness: 260 }}
            className="relative z-10 w-full max-w-md bg-[#FAF7F0] border-2 border-blue-200 rounded-3xl p-7 md:p-8 scrapbook-shadow-lg text-center overflow-hidden"
          >
            {/* Washi tape on top */}
            <div className="washi-tape-navy w-32 h-6 absolute -top-2 left-1/2 -translate-x-1/2 -rotate-1 shadow-sm" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-blue-800 hover:text-blue-950 bg-blue-100/70 hover:bg-blue-200/80 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Floating illustrations */}
            <div className="absolute -top-3 -left-3 animate-flutter">
              <WatercolorButterfly color="sky" size={56} />
            </div>
            <div className="absolute -bottom-4 -right-2">
              <WatercolorFlower size={52} rotation={25} />
            </div>

            {/* Sparkle badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-300 text-blue-900 text-sm font-handwriting font-bold tracking-wide mb-3 shadow-inner">
              <Sparkles className="w-4 h-4 text-blue-600 animate-spin" style={{ animationDuration: '4s' }} />
              <span>SECRET STAR DISCOVERED! ({foundCount}/{totalCount})</span>
            </div>

            {/* Big Headline */}
            <h2 className="text-3xl md:text-4xl font-bold font-serif-display text-blue-950 tracking-tight leading-tight mt-1 mb-4">
              YOU FOUND MY SECRET! 👀
            </h2>

            {/* Heartwarming handwritten message */}
            <div className="bg-white/75 border border-blue-200/80 rounded-2xl p-5 md:p-6 mb-6 shadow-xs relative">
              <p className="font-handwriting text-2xl md:text-3xl text-blue-900 leading-relaxed font-semibold">
                &ldquo;Okay fine... <br />
                You&apos;re actually one of my favorite people ever. <br />
                <span className="text-blue-600 font-bold block mt-2 text-xl md:text-2xl font-patrick">
                  Don&apos;t let this make you arrogant. 😂💙
                </span>
                &rdquo;
              </p>
            </div>

            {/* Playful button */}
            <button
              onClick={onClose}
              className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-patrick text-xl tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>I won&apos;t tell anyone (maybe) 🫶🏻</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
