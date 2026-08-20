import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Camera, MessageCircleHeart, Sparkles, Smile, Laugh } from 'lucide-react';
import { BirthdayConfig } from '../../config/birthdayConfig';
import {
  WatercolorButterfly,
  WatercolorFlower,
  DoodleStar,
  WashiTape,
  WatercolorSeal,
} from '../WatercolorDoodles';

interface Page4ThisIsUsProps {
  config: BirthdayConfig;
  onNext: () => void;
  onStarFound: () => void;
}

export const Page4ThisIsUs: React.FC<Page4ThisIsUsProps> = ({
  config,
  onNext,
  onStarFound,
}) => {
  const scraps = [
    {
      id: 1,
      text: 'too many jokes 😂',
      sub: 'half of them make zero sense',
      color: 'bg-blue-50/95 border-blue-300',
      tape: 'blue' as const,
      pos: 'top-0 left-2 sm:left-6 md:left-12',
      rotate: -4,
      icon: Laugh,
    },
    {
      id: 2,
      text: 'too many photos 📸',
      sub: 'mostly blurry & unflattering',
      color: 'bg-white/95 border-blue-200',
      tape: 'navy' as const,
      pos: 'top-0 right-2 sm:right-6 md:right-12',
      rotate: 3,
      icon: Camera,
    },
    {
      id: 3,
      text: 'too many random conversations 💬',
      sub: 'from 2 PM philosophy to 2 AM memes',
      color: 'bg-sky-50/95 border-sky-300',
      tape: 'striped' as const,
      pos: 'bottom-20 left-1 sm:left-8 md:left-16',
      rotate: 2,
      icon: MessageCircleHeart,
    },
    {
      id: 4,
      text: 'too much chaos 🌪️',
      sub: 'we cannot be left unsupervised',
      color: 'bg-blue-100/90 border-blue-400',
      tape: 'blue' as const,
      pos: 'bottom-20 right-1 sm:right-8 md:right-16',
      rotate: -3,
      icon: Smile,
    },
  ];

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 select-none">
      {/* Hidden Easter Egg Star */}
      <div className="absolute top-12 right-20 animate-sparkle">
        <DoodleStar
          size={26}
          color="#60A5FA"
          onClick={onStarFound}
          className="cursor-pointer"
        />
      </div>

      {/* Fluttering Butterflies */}
      <div className="absolute top-6 left-12 animate-flutter">
        <WatercolorButterfly color="sky" size={54} />
      </div>
      <div className="absolute bottom-8 right-12 hidden sm:block">
        <WatercolorFlower size={52} rotation={22} />
      </div>

      {/* Main Journal Board */}
      <div className="relative z-10 w-full max-w-4xl mx-auto py-8">
        {/* Top Washi Tape */}
        <div className="flex justify-center mb-4">
          <WashiTape type="striped" width="w-48" rotation={1} />
        </div>

        {/* Centerpiece Journal Canvas */}
        <div className="relative bg-white/70 backdrop-blur-xs border-2 border-blue-200/90 rounded-3xl p-6 sm:p-10 scrapbook-shadow-lg min-h-[460px] flex flex-col items-center justify-center">
          {/* Subtle grid pattern / journal lines */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none rounded-3xl"
            style={{
              backgroundImage: 'linear-gradient(#93C5FD 1px, transparent 1px)',
              backgroundSize: '100% 28px',
            }}
          />

          {/* Central Typography Header */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-20 text-center my-6"
          >
            <div className="flex justify-center mb-2">
              <WatercolorSeal text="👯‍♀️" size={60} />
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif-display font-black text-blue-950 tracking-tight leading-tight">
              THIS IS US
            </h1>
            <p className="text-2xl sm:text-3xl font-handwriting font-bold text-blue-700 mt-1">
              {config.bestFriendName} &amp; {config.myName}
            </p>
          </motion.div>

          {/* Scrapbook Note Cards scattered dynamically */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-3xl my-6 z-20">
            {scraps.map((scrap, index) => {
              const Icon = scrap.icon;
              return (
                <motion.div
                  key={scrap.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                  whileHover={{ scale: 1.03, rotate: 0 }}
                  className={`relative p-5 rounded-2xl border ${scrap.color} scrapbook-shadow transition-all text-left flex items-start gap-3`}
                  style={{ transform: `rotate(${scrap.rotate}deg)` }}
                >
                  {/* Top Tape */}
                  <div className="absolute -top-3 left-6">
                    <WashiTape type={scrap.tape} width="w-20" rotation={scrap.rotate * -1.5} />
                  </div>

                  <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700 shrink-0 mt-1">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-patrick font-bold text-blue-950 leading-snug">
                      {scrap.text}
                    </h3>
                    <p className="text-lg font-handwriting font-bold text-blue-800/90 mt-0.5">
                      {scrap.sub}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Emotional Bottom Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="relative z-20 mt-4 max-w-lg bg-blue-600 text-white rounded-2xl p-4 sm:p-5 scrapbook-shadow text-center"
          >
            <p className="text-xl sm:text-2xl font-handwriting font-bold mb-1">
              &ldquo;...and somehow...&rdquo;
            </p>
            <p className="text-2xl sm:text-3xl font-patrick font-bold tracking-wide">
              THE PERFECT FRIENDSHIP 💙
            </p>
          </motion.div>
        </div>

        {/* Next Button */}
        <div className="mt-8">
          <button
            onClick={onNext}
            className="inline-flex items-center gap-3 px-10 py-4.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-patrick text-2xl font-bold tracking-wide scrapbook-shadow-lg transition-all"
          >
            <span>VIEW MEMORY WALL</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
