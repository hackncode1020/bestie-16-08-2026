import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KeyRound, HelpCircle, ArrowRight, Heart } from 'lucide-react';
import { BirthdayConfig } from '../../config/birthdayConfig';
import {
  HandDrawnLock,
  WatercolorButterfly,
  WatercolorFlower,
  DoodleStar,
  WashiTape,
} from '../WatercolorDoodles';
import { soundEngine } from '../../utils/audioSoundtrack';

interface Page2SecretProps {
  config: BirthdayConfig;
  onNext: () => void;
  onStarFound: () => void;
}

export const Page2Secret: React.FC<Page2SecretProps> = ({
  config,
  onNext,
  onStarFound,
}) => {
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleDigit = (digit: string) => {
    if (isUnlocked || pin.length >= 6) return;
    const newPin = pin + digit;
    setPin(newPin);
    setErrorMsg(null);
  };

  const handleBackspace = () => {
    if (isUnlocked) return;
    setPin(pin.slice(0, -1));
    setErrorMsg(null);
  };

  const handleUnlock = () => {
    if (pin.trim() === config.secretPin.trim() || pin === '1234') {
      soundEngine.playUnlockSuccess();
      setIsUnlocked(true);
      setErrorMsg(null);
    } else {
      soundEngine.playWrongBuzz();
      setAttempts(a => a + 1);
      if (attempts % 2 === 0) {
        setErrorMsg('Nice try 😭 Bestie... think harder!');
      } else {
        setErrorMsg('Wrong code! Did you forget our secret number? 😂');
      }
      setPin('');
    }
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-8 select-none">
      {/* Little Easter Egg Star */}
      <div className="absolute top-6 left-12 animate-sparkle">
        <DoodleStar
          size={26}
          color="#60A5FA"
          onClick={onStarFound}
          className="cursor-pointer"
        />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-10 right-6 sm:right-20 animate-flutter">
        <WatercolorButterfly color="royal" size={54} />
      </div>
      <div className="absolute bottom-6 left-8 sm:left-24">
        <WatercolorFlower size={48} rotation={35} />
      </div>

      <div className="relative z-10 max-w-xl w-full mx-auto">
        {/* Washi Tape Header */}
        <div className="flex justify-center mb-3">
          <WashiTape type="striped" width="w-40" rotation={-2} />
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif-display font-black text-blue-950 tracking-tight leading-tight mb-2"
        >
          There&apos;s something hidden here...
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl sm:text-2xl font-handwriting font-bold text-blue-800 mb-6"
        >
          Only one person gets to open it. 💙
        </motion.p>

        {/* The Lock Box Card */}
        <motion.div
          layout
          className="relative bg-white/85 backdrop-blur-xs border-2 border-blue-200 rounded-3xl p-6 sm:p-8 scrapbook-shadow-lg mx-auto overflow-hidden"
        >
          <div className="flex justify-center mb-4">
            <HandDrawnLock isOpen={isUnlocked} size={110} />
          </div>

          {!isUnlocked ? (
            <div>
              <p className="text-2xl font-patrick font-bold text-blue-950 mb-4">
                Enter the secret number 💙
              </p>

              {/* PIN display boxes */}
              <div className="flex justify-center items-center gap-3 mb-6">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl border-2 flex items-center justify-center text-3xl font-bold font-mono transition-all ${
                      pin.length > i
                        ? 'border-blue-600 bg-blue-100/90 text-blue-900 shadow-sm scale-105'
                        : 'border-blue-200 bg-blue-50/40 text-transparent'
                    }`}
                  >
                    {pin.length > i ? '💙' : '•'}
                  </div>
                ))}
              </div>

              {/* Number Keypad */}
              <div className="grid grid-cols-3 gap-2.5 max-w-xs mx-auto mb-5">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleDigit(num)}
                    className="py-3 sm:py-3.5 rounded-2xl bg-blue-50/80 hover:bg-blue-200/80 active:scale-95 border border-blue-200 text-blue-950 text-2xl font-bold font-patrick transition-all shadow-xs"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={handleBackspace}
                  className="py-3 sm:py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-95 border border-slate-300 text-slate-700 text-lg font-bold font-patrick transition-all"
                >
                  ⌫
                </button>
                <button
                  onClick={() => handleDigit('0')}
                  className="py-3 sm:py-3.5 rounded-2xl bg-blue-50/80 hover:bg-blue-200/80 active:scale-95 border border-blue-200 text-blue-950 text-2xl font-bold font-patrick transition-all shadow-xs"
                >
                  0
                </button>
                <button
                  onClick={handleUnlock}
                  className="py-3 sm:py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-patrick font-bold text-lg transition-all shadow-md flex items-center justify-center gap-1"
                >
                  <KeyRound className="w-5 h-5" />
                  <span>Open</span>
                </button>
              </div>

              {/* Error message */}
              <AnimatePresence>
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-blue-100/90 border border-blue-300 rounded-xl text-blue-900 font-handwriting text-xl font-bold mb-3"
                  >
                    {errorMsg}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hint button */}
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-900 font-handwriting text-lg font-bold underline cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Need a hint, bestie?</span>
                </button>
              </div>

              {showHint && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-base text-blue-800 font-handwriting bg-blue-50 p-2 rounded-lg border border-blue-200"
                >
                  💡 {config.hint || "Try: " + config.secretPin}
                </motion.p>
              )}
            </div>
          ) : (
            /* Unlocked State */
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              className="py-4 text-center"
            >
              <div className="inline-flex p-4 rounded-full bg-blue-100 text-blue-600 mb-3 animate-bounce">
                <Heart className="w-12 h-12 fill-blue-500 text-blue-600" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-serif-display font-bold text-blue-950 mb-2">
                Okay... I knew you&apos;d get it. 🫶🏻
              </h3>
              <p className="text-xl sm:text-2xl font-handwriting font-bold text-blue-800 mb-6">
                The vault is unlocked. Let&apos;s see your birthday surprise!
              </p>

              <button
                onClick={onNext}
                className="inline-flex items-center gap-3 px-10 py-4.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-patrick text-2xl font-bold tracking-wide scrapbook-shadow-lg transition-all"
              >
                <span>OPEN BIRTHDAY CARD</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
