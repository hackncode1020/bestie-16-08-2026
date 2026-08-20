import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Cake, PartyPopper } from 'lucide-react';
import { BirthdayConfig } from '../../config/birthdayConfig';
import {
  WatercolorButterfly,
  WatercolorFlower,
  DoodleStar,
  HandDrawnCake,
  WatercolorSeal,
  WashiTape,
} from '../WatercolorDoodles';
import { soundEngine } from '../../utils/audioSoundtrack';

interface Page3BirthdayRevealProps {
  config: BirthdayConfig;
  onNext: () => void;
  onStarFound: () => void;
}

export const Page3BirthdayReveal: React.FC<Page3BirthdayRevealProps> = ({
  config,
  onNext,
  onStarFound,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);

  const handleOpenCard = () => {
    if (!isOpen) {
      soundEngine.playPageTurn();
      setIsOpen(true);
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#60A5FA', '#3B82F6', '#93C5FD', '#1D4ED8', '#FEF08A'],
      });
    }
  };

  const handleBlowCandles = () => {
    if (!candlesBlown) {
      soundEngine.playConfettiPop();
      setCandlesBlown(true);
      confetti({
        particleCount: 90,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#93C5FD', '#60A5FA', '#DBEAFE', '#2563EB', '#FDE047'],
      });
    }
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-8 select-none">
      {/* Easter Egg Star */}
      <div className="absolute bottom-8 right-10 animate-sparkle">
        <DoodleStar
          size={28}
          color="#93C5FD"
          onClick={onStarFound}
          className="cursor-pointer"
        />
      </div>

      {/* Floating butterflies & flowers */}
      <div className="absolute top-6 left-6 animate-flutter">
        <WatercolorButterfly color="cyan" size={54} />
      </div>
      <div className="absolute top-10 right-8 hidden sm:block">
        <WatercolorFlower size={50} rotation={-15} />
      </div>
      <div className="absolute bottom-10 left-12 hidden sm:block">
        <WatercolorFlower size={46} rotation={40} />
      </div>

      <div className="relative z-10 max-w-2xl w-full mx-auto">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Card Closed State - Handmade Cover */
            <motion.div
              key="closed-card"
              initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.95, opacity: 0, rotateY: 90 }}
              transition={{ duration: 0.6 }}
              onClick={handleOpenCard}
              className="group cursor-pointer relative torn-paper rounded-3xl p-8 sm:p-12 scrapbook-shadow-lg border-2 border-blue-200/80 bg-[#FCFBF7] max-w-lg mx-auto text-center transform hover:-translate-y-1 transition-all"
            >
              {/* Tape accents */}
              <div className="absolute -top-3 left-8">
                <WashiTape type="blue" width="w-24" rotation={-4} />
              </div>
              <div className="absolute -top-3 right-8">
                <WashiTape type="navy" width="w-24" rotation={5} />
              </div>

              {/* Hand-painted envelope ribbon art */}
              <div className="my-3 flex justify-center">
                <WatercolorSeal text="✨" size={68} className="animate-pulse" />
              </div>

              <div className="space-y-2 mt-4 mb-6">
                <span className="inline-block text-blue-600 font-script text-2xl sm:text-3xl font-bold">
                  Exclusive Handmade Edition
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-black text-blue-950 tracking-tight leading-tight">
                  FOR YOU
                </h2>
                <div className="w-16 h-1 bg-blue-400 mx-auto rounded-full my-2" />
                <p className="text-2xl sm:text-3xl font-handwriting font-bold text-blue-800">
                  THE MOST SPECIAL BESTIE 💙
                </p>
              </div>

              <div className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-blue-600 group-hover:bg-blue-700 text-white font-patrick text-xl font-bold tracking-wide shadow-md transition-all">
                <span>TAP TO OPEN CARD</span>
                <PartyPopper className="w-5 h-5" />
              </div>
            </motion.div>
          ) : (
            /* Card Opened State - Handmade Spread */
            <motion.div
              key="opened-card"
              initial={{ scale: 0.85, opacity: 0, rotateY: -70 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.7, type: 'spring', damping: 18 }}
              className="torn-paper rounded-3xl p-6 sm:p-10 md:p-12 scrapbook-shadow-lg border-2 border-blue-200/90 bg-[#FAF7F0] text-center relative overflow-hidden"
            >
              {/* Corner tapes */}
              <div className="absolute -top-3 left-10">
                <WashiTape type="striped" width="w-28" rotation={-3} />
              </div>
              <div className="absolute -top-3 right-10">
                <WashiTape type="blue" width="w-28" rotation={4} />
              </div>

              {/* Sparkle badge */}
              <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-blue-100 border border-blue-300 text-blue-900 text-base md:text-lg font-handwriting font-bold mb-3 shadow-inner">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Special Date: {config.birthdayDate}</span>
              </div>

              {/* HUGE Typography for Name */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-display font-black text-blue-950 tracking-tight leading-none mb-4">
                HAPPY BIRTHDAY, <br />
                <span className="text-blue-600 underline decoration-blue-300 decoration-wavy decoration-2">
                  {config.bestFriendName.toUpperCase()}
                </span>{' '}
                💙
              </h1>

              {/* Cake interactive */}
              <div className="my-4 flex justify-center">
                <HandDrawnCake
                  size={150}
                  candlesBlown={candlesBlown}
                  onBlowCandles={handleBlowCandles}
                />
              </div>

              {/* Meaningful message */}
              <div className="max-w-lg mx-auto bg-white/70 rounded-2xl p-5 border border-blue-200/70 mb-6 shadow-xs">
                <p className="text-2xl sm:text-3xl font-handwriting text-blue-950 font-bold leading-relaxed mb-2">
                  &ldquo;Today isn&apos;t just another day...&rdquo;
                </p>
                <p className="text-xl sm:text-2xl font-handwriting text-blue-800 font-semibold leading-relaxed">
                  Today is the day one of my absolute favorite humans was born.
                </p>
              </div>

              {/* Next page button */}
              <button
                onClick={onNext}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-patrick text-2xl font-bold tracking-wide scrapbook-shadow-lg transition-all"
              >
                <span>EXPLORE OUR SCRAPBOOK</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
