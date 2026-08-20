import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Trophy, ArrowRight, RotateCcw, Sparkles, Award } from 'lucide-react';
import { BirthdayConfig } from '../../config/birthdayConfig';
import {
  WatercolorButterfly,
  WatercolorFlower,
  DoodleStar,
  WashiTape,
  WatercolorSeal,
} from '../WatercolorDoodles';
import { soundEngine } from '../../utils/audioSoundtrack';

interface Page6BestieGameProps {
  config: BirthdayConfig;
  onNext: () => void;
  onStarFound: () => void;
}

export const Page6BestieGame: React.FC<Page6BestieGameProps> = ({
  config,
  onNext,
  onStarFound,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      question: 'Who starts the random conversations at 1 AM?',
      options: [
        { text: `${config.myName} (no sleep schedule)`, isCorrect: true },
        { text: `${config.bestFriendName} (always awake)`, isCorrect: true },
        { text: 'Both of us equally! 😂', isCorrect: true },
      ],
      reactionCorrect: 'YOU KNOW ME TOO WELL 😭💙',
      reactionWrong: 'Excuse me??? We need to talk. 😂',
    },
    {
      id: 2,
      question: 'Who gets dramatic first over the tiniest inconvenience? 😂',
      options: [
        { text: `Definitely ${config.bestFriendName} (Oscar winning)`, isCorrect: true },
        { text: `${config.myName} for sure`, isCorrect: true },
        { text: 'A tie of theatrical excellence 🎭', isCorrect: true },
      ],
      reactionCorrect: 'Accurate and unprovoked! 😭💙',
      reactionWrong: 'Lies! Pure defamation! 😂',
    },
    {
      id: 3,
      question: 'Who sends 50+ unhinged Instagram reels every single day?',
      options: [
        { text: `${config.bestFriendName} (Reels curator)`, isCorrect: true },
        { text: `${config.myName} (Spam master)`, isCorrect: true },
        { text: 'Our DM is basically a meme landfill 🗑️', isCorrect: true },
      ],
      reactionCorrect: 'YOU KNOW ME TOO WELL 😭💙',
      reactionWrong: 'Excuse me??? Check your inbox! 😂',
    },
    {
      id: 4,
      question: 'Who would survive longer without their phone on a deserted island?',
      options: [
        { text: `${config.bestFriendName} (zen mode)`, isCorrect: false },
        { text: `${config.myName} (maybe 10 minutes)`, isCorrect: false },
        { text: 'Neither, we’d both perish in 2 hours 💀', isCorrect: true },
      ],
      reactionCorrect: '100% facts! We are doomed together! 💙',
      reactionWrong: 'Be realistic bestie... we wouldn’t survive! 😂',
    },
    {
      id: 5,
      question: 'Who is the ultimate best friend in the entire universe?',
      options: [
        { text: `${config.bestFriendName} of course! 👑`, isCorrect: true },
        { text: `Both of us together = unstoppable! 💙✨`, isCorrect: true },
      ],
      reactionCorrect: 'YOU KNOW ME TOO WELL 😭💙',
      reactionWrong: 'Wrong answer! Try again! 😂',
    },
  ];

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number, opt: any) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);

    if (opt.isCorrect) {
      soundEngine.playTwinkle();
      setScore((s) => s + 1);
      setFeedback({ isCorrect: true, text: currentQ.reactionCorrect });
    } else {
      soundEngine.playWrongBuzz();
      setFeedback({ isCorrect: false, text: currentQ.reactionWrong });
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((c) => c + 1);
        setSelectedOption(null);
        setFeedback(null);
      } else {
        setIsCompleted(true);
        soundEngine.playConfettiPop();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#3B82F6', '#60A5FA', '#93C5FD', '#FEF08A', '#1E40AF'],
        });
      }
    }, 1600);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setFeedback(null);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-10 select-none">
      {/* Easter Egg Star */}
      <div className="absolute top-8 right-12 animate-sparkle">
        <DoodleStar
          size={28}
          color="#60A5FA"
          onClick={onStarFound}
          className="cursor-pointer"
        />
      </div>

      {/* Floating illustrations */}
      <div className="absolute top-6 left-8 animate-flutter">
        <WatercolorButterfly color="sky" size={54} />
      </div>
      <div className="absolute bottom-6 right-8 hidden sm:block">
        <WatercolorFlower size={50} rotation={-25} />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <div className="flex justify-center mb-3">
          <WashiTape type="navy" width="w-44" rotation={1.5} />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-black text-blue-950 tracking-tight leading-tight mb-2"
        >
          Okay bestie... <br />
          <span className="text-blue-600">let&apos;s see how well you know us 👀</span>
        </motion.h1>

        <p className="text-xl sm:text-2xl font-handwriting font-bold text-blue-800 mb-6">
          A quick 5-question friendship test. No pressure, but your title is on the line.
        </p>

        {!isCompleted ? (
          /* Game Card */
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="torn-paper rounded-3xl p-6 sm:p-10 scrapbook-shadow-lg border-2 border-blue-200 bg-[#FAF7F0] text-center relative overflow-hidden"
          >
            {/* Progress counter */}
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-100 text-blue-900 font-handwriting text-lg font-bold mb-4 border border-blue-300">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>
                Question {currentIndex + 1} of {questions.length}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-patrick font-bold text-blue-950 mb-6 leading-snug">
              {currentQ.question}
            </h2>

            {/* Big Option Buttons */}
            <div className="space-y-3 sm:space-y-4">
              {currentQ.options.map((option, idx) => {
                const isChosen = selectedOption === idx;
                return (
                  <button
                    key={idx}
                    disabled={selectedOption !== null}
                    onClick={() => handleSelectOption(idx, option)}
                    className={`w-full py-4 px-6 rounded-2xl border-2 text-xl sm:text-2xl font-patrick font-bold transition-all text-left flex items-center justify-between shadow-xs ${
                      isChosen
                        ? option.isCorrect
                          ? 'bg-blue-600 border-blue-700 text-white scale-102 shadow-md'
                          : 'bg-red-500 border-red-600 text-white scale-98'
                        : 'bg-white hover:bg-blue-50 border-blue-200 text-blue-950 hover:border-blue-400 active:scale-98'
                    }`}
                  >
                    <span>{option.text}</span>
                    {isChosen && (
                      <span>{option.isCorrect ? '💙' : '😂'}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Feedback Banner */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mt-5 p-4 rounded-2xl border font-handwriting text-2xl font-bold ${
                    feedback.isCorrect
                      ? 'bg-blue-100 border-blue-400 text-blue-950'
                      : 'bg-amber-100 border-amber-400 text-amber-950'
                  }`}
                >
                  {feedback.text}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Game Completed - Legendary Trophy */
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 16 }}
            className="torn-paper rounded-3xl p-8 sm:p-12 scrapbook-shadow-lg border-2 border-blue-200 bg-[#FAF7F0] text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="p-5 rounded-full bg-blue-100 text-blue-600 animate-bounce">
                <Trophy className="w-16 h-16 text-blue-600" />
              </div>
            </div>

            <h2 className="text-4xl sm:text-5xl font-serif-display font-black text-blue-950 mb-2">
              Bestie Level: LEGENDARY 🏆
            </h2>

            <p className="text-2xl sm:text-3xl font-handwriting font-bold text-blue-800 mb-6">
              You scored {score}/{questions.length}! You officially own the honorary Master’s
              Degree in being {config.myName}&apos;s favorite person.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-blue-300 text-blue-900 font-patrick text-xl font-bold hover:bg-blue-50 transition-all shadow-xs"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Play Again</span>
              </button>
              <button
                onClick={onNext}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-patrick text-2xl font-bold tracking-wide shadow-md transition-all"
              >
                <span>A FEW THINGS I NEVER SAY</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
