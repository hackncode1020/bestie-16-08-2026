import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Compass, Heart, Stars } from 'lucide-react';
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

interface Page9OurFutureProps {
  config: BirthdayConfig;
  onNext: () => void;
  onStarFound: () => void;
}

export const Page9OurFuture: React.FC<Page9OurFutureProps> = ({
  config,
  onNext,
  onStarFound,
}) => {
  const [clickedTags, setClickedTags] = useState<number[]>([]);

  const futureNotes = [
    { id: 1, text: 'More laughing until we cry 😂', color: 'bg-white/95 border-blue-200', tape: 'blue' as const, rot: -3 },
    { id: 2, text: 'More spontaneous roadtrips 🚗', color: 'bg-blue-50/95 border-blue-300', tape: 'navy' as const, rot: 2.5 },
    { id: 3, text: 'More blurry & candid photos 📸', color: 'bg-sky-50/95 border-sky-300', tape: 'striped' as const, rot: -2 },
    { id: 4, text: 'More late-night deep talks 🌙', color: 'bg-indigo-50/90 border-blue-300', tape: 'navy' as const, rot: 3 },
    { id: 5, text: 'More questionable life decisions 🤪', color: 'bg-white/95 border-blue-200', tape: 'blue' as const, rot: -2.5 },
    { id: 6, text: 'More celebrating each other’s wins 🥂', color: 'bg-blue-100/90 border-blue-400', tape: 'striped' as const, rot: 2 },
    { id: 7, text: 'More birthdays together forever 🎂💙', color: 'bg-blue-600 text-white border-blue-700', tape: 'blue' as const, rot: 0 },
  ];

  const handleTagClick = (id: number) => {
    soundEngine.playTwinkle();
    if (!clickedTags.includes(id)) {
      setClickedTags([...clickedTags, id]);
    }
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 select-none overflow-hidden">
      {/* Drifting Clouds */}
      <div className="absolute top-4 left-0 w-80 md:w-96 animate-float-cloud opacity-45">
        <WatercolorCloud />
      </div>
      <div className="absolute bottom-4 right-0 w-88 md:w-112 animate-float-cloud opacity-45" style={{ animationDelay: '-5s' }}>
        <WatercolorCloud />
      </div>

      {/* Secret Easter Egg Star */}
      <div className="absolute bottom-12 left-12 animate-sparkle">
        <DoodleStar
          size={28}
          color="#60A5FA"
          onClick={onStarFound}
          className="cursor-pointer"
        />
      </div>

      {/* Floating Butterflies */}
      <div className="absolute top-10 right-14 animate-flutter">
        <WatercolorButterfly color="sky" size={56} />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <div className="flex justify-center mb-3">
          <WashiTape type="striped" width="w-48" rotation={1} />
        </div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-black text-blue-950 tracking-tight leading-tight mb-2"
        >
          MORE MEMORIES TO COME...
        </motion.h1>

        <p className="text-xl sm:text-2xl font-handwriting font-bold text-blue-800 mb-8">
          The scrapbook of our friendship is just getting started. Tap each promise! ✨
        </p>

        {/* Floating Scrapbook Promise Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 my-6">
          {futureNotes.map((note, idx) => {
            const isClicked = clickedTags.includes(note.id);
            return (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 0 }}
                onClick={() => handleTagClick(note.id)}
                className={`group cursor-pointer relative p-5 rounded-2xl border ${note.color} scrapbook-shadow transition-all text-center flex flex-col items-center justify-center min-h-[110px] ${
                  isClicked ? 'ring-2 ring-blue-500' : ''
                }`}
                style={{ transform: `rotate(${note.rot}deg)` }}
              >
                {/* Washi Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <WashiTape type={note.tape} width="w-20" rotation={note.rot * -1.5} />
                </div>

                <p className={`text-2xl sm:text-3xl font-patrick font-bold leading-snug ${note.id === 7 ? 'text-white' : 'text-blue-950'}`}>
                  {note.text}
                </p>
                {isClicked && (
                  <span className="text-xs font-handwriting font-bold text-blue-600 bg-white/90 px-2 py-0.5 rounded-full mt-1 border border-blue-200">
                    Locked in! 🔒
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Big Climax Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 mb-8 inline-block bg-white/80 backdrop-blur-xs border-2 border-blue-300 rounded-3xl p-6 sm:p-8 scrapbook-shadow-lg"
        >
          <div className="flex justify-center mb-2">
            <WatercolorSeal text="🚀" size={54} />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-black text-blue-950 tracking-tight">
            TO BE CONTINUED... 💙
          </h2>
          <p className="text-2xl sm:text-3xl font-handwriting font-bold text-blue-800 mt-2">
            Chapter {new Date().getFullYear()} is going to be our best one yet.
          </p>
        </motion.div>

        {/* Next Button */}
        <div>
          <button
            onClick={onNext}
            className="inline-flex items-center gap-3 px-10 py-4.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-patrick text-2xl font-bold tracking-wide scrapbook-shadow-lg transition-all"
          >
            <span>OPEN FINAL SURPRISE GIFT</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
