import React from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { RotateCcw, Sparkles, Heart, Award, Share2 } from 'lucide-react';
import { BirthdayConfig } from '../../config/birthdayConfig';
import {
  WatercolorButterfly,
  WatercolorCloud,
  WatercolorFlower,
  DoodleStar,
  WashiTape,
  WatercolorSeal,
} from '../WatercolorDoodles';
import { soundEngine } from '../../utils/audioSoundtrack';

interface Page11FinalMessageProps {
  config: BirthdayConfig;
  onRestart: () => void;
  onStarFound: () => void;
}

export const Page11FinalMessage: React.FC<Page11FinalMessageProps> = ({
  config,
  onRestart,
  onStarFound,
}) => {
  const triggerCelebration = () => {
    soundEngine.playConfettiPop();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#60A5FA', '#3B82F6', '#93C5FD', '#1D4ED8', '#FEF08A'],
    });
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 select-none overflow-hidden">
      {/* Drifting Clouds on Edges */}
      <div className="absolute top-0 left-0 w-80 md:w-96 animate-float-cloud opacity-45">
        <WatercolorCloud />
      </div>
      <div className="absolute bottom-0 right-0 w-88 md:w-112 animate-float-cloud opacity-45" style={{ animationDelay: '-6s' }}>
        <WatercolorCloud />
      </div>

      {/* Easter Egg Star */}
      <div className="absolute top-10 left-12 animate-sparkle">
        <DoodleStar
          size={28}
          color="#60A5FA"
          onClick={onStarFound}
          className="cursor-pointer"
        />
      </div>

      {/* Floating Butterflies */}
      <div className="absolute top-8 right-12 animate-flutter">
        <WatercolorButterfly color="sky" size={60} />
      </div>
      <div className="absolute bottom-10 left-10 animate-flutter" style={{ animationDelay: '2s' }}>
        <WatercolorButterfly color="royal" size={54} />
      </div>

      {/* Main Parchment Spread */}
      <div className="relative z-10 w-full max-w-3xl mx-auto">
        <div className="flex justify-center mb-4">
          <WashiTape type="striped" width="w-56" rotation={-1} />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="torn-paper rounded-3xl p-6 sm:p-10 md:p-14 scrapbook-shadow-lg border-2 border-blue-200 bg-[#FCFBF7] text-center relative overflow-hidden"
        >
          {/* Top Seal Badge */}
          <div className="flex justify-center mb-4">
            <WatercolorSeal text="💙" size={68} className="animate-pulse-glow" />
          </div>

          {/* HUGE Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-display font-black text-blue-950 tracking-tight leading-none mb-4">
            HAPPY BIRTHDAY, <br />
            <span className="text-blue-600 underline decoration-blue-300 decoration-wavy decoration-2">
              {config.bestFriendName.toUpperCase()}
            </span>{' '}
            💙
          </h1>

          {/* Section 1 */}
          <p className="text-2xl sm:text-3xl md:text-4xl font-handwriting font-bold text-blue-900 mb-6 leading-relaxed">
            Thank you for being one of the most beautiful parts of my life.
          </p>

          {/* Section 2 - Highlight box */}
          <div className="bg-blue-50/80 border border-blue-200/90 rounded-2xl p-5 sm:p-6 mb-6">
            <p className="text-xl sm:text-2xl font-handwriting text-blue-950 font-bold leading-relaxed">
              For every laugh. <br />
              For every memory. <br />
              For every stupid conversation. <br />
              For every single moment.
            </p>
          </div>

          {/* Section 3 - HUGE statement */}
          <div className="my-6 py-4 px-4 bg-blue-600 text-white rounded-2xl scrapbook-shadow">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-black tracking-tight leading-tight">
              THANK YOU <br />
              FOR BEING MY BEST FRIEND.
            </h2>
          </div>

          {/* Section 4 */}
          <p className="text-2xl sm:text-3xl font-handwriting font-bold text-blue-950 mb-3">
            I hope this year brings you everything you&apos;ve been wishing for.
          </p>

          <p className="text-2xl sm:text-3xl font-script text-blue-600 font-bold mb-6">
            Stay happy. Stay crazy. Stay YOU. 🦋
          </p>

          {/* Signature */}
          <div className="border-t-2 border-blue-200 pt-5 mt-4">
            <p className="text-xl font-script text-blue-700">With lots of love,</p>
            <p className="text-3xl sm:text-4xl font-handwriting font-black text-blue-950 mt-1">
              {config.myName} 💙
            </p>
          </div>
        </motion.div>

        {/* Bottom Interactive Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={triggerCelebration}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-100 hover:bg-blue-200 text-blue-900 font-patrick text-xl font-bold border border-blue-300 shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span>More Confetti! 🎉</span>
          </button>

          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-patrick text-xl font-bold scrapbook-shadow transition-all hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Read From Beginning 📖</span>
          </button>
        </div>
      </div>
    </div>
  );
};
