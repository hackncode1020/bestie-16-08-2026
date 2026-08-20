import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Heart, Feather, Sparkles } from 'lucide-react';
import { BirthdayConfig } from '../../config/birthdayConfig';
import {
  WatercolorButterfly,
  WatercolorFlower,
  DoodleStar,
  WashiTape,
  WatercolorSeal,
} from '../WatercolorDoodles';

interface Page8HandwrittenLetterProps {
  config: BirthdayConfig;
  onNext: () => void;
  onStarFound: () => void;
}

export const Page8HandwrittenLetter: React.FC<Page8HandwrittenLetterProps> = ({
  config,
  onNext,
  onStarFound,
}) => {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 select-none">
      {/* Easter Egg Star */}
      <div className="absolute top-10 left-10 animate-sparkle">
        <DoodleStar
          size={28}
          color="#60A5FA"
          onClick={onStarFound}
          className="cursor-pointer"
        />
      </div>

      {/* Floating illustrations */}
      <div className="absolute top-6 right-8 animate-flutter">
        <WatercolorButterfly color="royal" size={56} />
      </div>
      <div className="absolute bottom-6 left-8 hidden sm:block">
        <WatercolorFlower size={52} rotation={-18} />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto">
        {/* Top Ribbon & Washi Tape */}
        <div className="flex justify-center mb-4">
          <WashiTape type="striped" width="w-52" rotation={-1} />
        </div>

        {/* Paper Letter Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="torn-paper rounded-3xl p-6 sm:p-10 md:p-12 scrapbook-shadow-lg border-2 border-blue-200/90 bg-[#FCFBF7] text-left relative overflow-hidden"
        >
          {/* Subtle lined paper texture */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(#93C5FD 1px, transparent 1px)',
              backgroundSize: '100% 32px',
            }}
          />

          {/* Letter Heading */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-blue-200/80 pb-5 mb-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 text-blue-600 font-script text-xl font-bold mb-1">
                <Feather className="w-5 h-5" />
                <span>Written with ink &amp; heart</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-black text-blue-950 tracking-tight">
                A LETTER FOR MY BESTIE
              </h1>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <WatercolorSeal text="💙" size={54} />
            </div>
          </div>

          {/* Letter Paragraphs - Large, legible, warm handwritten typography */}
          <div className="space-y-4 sm:space-y-5 text-blue-950 relative z-10 font-handwriting text-2xl sm:text-3xl font-semibold leading-relaxed">
            {config.customLetterParagraphs.map((para, idx) => (
              <p key={idx} className="transition-all hover:text-blue-900">
                {para}
              </p>
            ))}
          </div>

          {/* Letter Footer / Sign-off */}
          <div className="mt-8 pt-6 border-t-2 border-blue-200/80 relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-200/70">
              <p className="text-xl sm:text-2xl font-handwriting font-bold text-blue-900 mb-1">
                Always remember...
              </p>
              <p className="text-2xl sm:text-3xl font-patrick font-bold text-blue-950">
                You have someone who will always be cheering for you. 💙
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-lg font-script text-blue-600 block">Forever your best friend,</span>
              <span className="text-3xl sm:text-4xl font-handwriting font-bold text-blue-950">
                {config.myName} ✍🏻
              </span>
            </div>
          </div>
        </motion.div>

        {/* Next Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onNext}
            className="inline-flex items-center gap-3 px-10 py-4.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-patrick text-2xl font-bold tracking-wide scrapbook-shadow-lg transition-all"
          >
            <span>OUR LITTLE FUTURE</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
