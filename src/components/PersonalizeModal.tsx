import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Sliders, Check } from 'lucide-react';
import { BirthdayConfig } from '../config/birthdayConfig';
import { WashiTape } from './WatercolorDoodles';

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BirthdayConfig;
  onSave: (newConfig: BirthdayConfig) => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [bestFriendName, setBestFriendName] = useState(config.bestFriendName);
  const [myName, setMyName] = useState(config.myName);
  const [birthdayDate, setBirthdayDate] = useState(config.birthdayDate);
  const [secretPin, setSecretPin] = useState(config.secretPin);
  const [hint, setHint] = useState(config.hint);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...config,
      bestFriendName: bestFriendName.trim() || config.bestFriendName,
      myName: myName.trim() || config.myName,
      birthdayDate: birthdayDate.trim() || config.birthdayDate,
      secretPin: secretPin.trim() || config.secretPin,
      hint: hint.trim() || config.hint,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative z-10 w-full max-w-lg bg-[#FAF7F0] border-2 border-blue-300 rounded-3xl p-6 sm:p-8 scrapbook-shadow-lg text-left max-h-[90vh] overflow-y-auto"
          >
            {/* Washi Tape */}
            <div className="washi-tape-striped w-36 h-5 absolute -top-2.5 left-1/2 -translate-x-1/2" />

            <div className="flex items-center justify-between mb-4 mt-1">
              <div>
                <span className="text-xs font-script font-bold text-blue-600">Quick Customizer</span>
                <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-blue-950">
                  Personalize This Scrapbook 💙
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-blue-100 text-blue-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm font-handwriting text-blue-800 font-bold mb-4">
              Update names and secret PIN instantly across all pages and letters!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold font-patrick text-blue-900 mb-1">
                  Best Friend&apos;s Name:
                </label>
                <input
                  type="text"
                  required
                  value={bestFriendName}
                  onChange={(e) => setBestFriendName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-blue-300 bg-white text-blue-950 font-sans text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold font-patrick text-blue-900 mb-1">
                  Your Name (Sender):
                </label>
                <input
                  type="text"
                  required
                  value={myName}
                  onChange={(e) => setMyName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-blue-300 bg-white text-blue-950 font-sans text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold font-patrick text-blue-900 mb-1">
                  Birthday Date (e.g. August 15):
                </label>
                <input
                  type="text"
                  required
                  value={birthdayDate}
                  onChange={(e) => setBirthdayDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-blue-300 bg-white text-blue-950 font-sans text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold font-patrick text-blue-900 mb-1">
                  Secret Lock PIN (Page 2):
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={secretPin}
                  onChange={(e) => setSecretPin(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-blue-300 bg-white text-blue-950 font-mono text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold font-patrick text-blue-900 mb-1">
                  PIN Hint for Bestie:
                </label>
                <input
                  type="text"
                  value={hint}
                  onChange={(e) => setHint(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-blue-300 bg-white text-blue-950 font-sans text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-blue-800 hover:bg-blue-100 font-patrick text-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-patrick font-bold text-lg shadow-md"
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Updated!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Apply Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
