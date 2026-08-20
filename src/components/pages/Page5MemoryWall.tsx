import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, ZoomIn, ArrowRight, Heart, Sparkles, Image as ImageIcon } from 'lucide-react';
import { BirthdayConfig } from '../../config/birthdayConfig';
import {
  WatercolorButterfly,
  WatercolorFlower,
  DoodleStar,
  WashiTape,
  WatercolorSeal,
} from '../WatercolorDoodles';
import { soundEngine } from '../../utils/audioSoundtrack';

interface Page5MemoryWallProps {
  config: BirthdayConfig;
  onUpdateConfig: (newConfig: BirthdayConfig) => void;
  onNext: () => void;
  onStarFound: () => void;
}

export const Page5MemoryWall: React.FC<Page5MemoryWallProps> = ({
  config,
  onUpdateConfig,
  onNext,
  onStarFound,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newDate, setNewDate] = useState('');

  const handlePhotoClick = (photo: any) => {
    soundEngine.playPageTurn();
    setSelectedPhoto(photo);
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim() || !newCaption.trim()) return;

    const newPhotoItem = {
      id: Date.now().toString(),
      url: newUrl.trim(),
      caption: newCaption.trim(),
      date: newDate.trim() || 'A Precious Memory',
      rotation: Math.floor(Math.random() * 8) - 4,
      tapeColor: (['blue', 'navy', 'striped'] as const)[Math.floor(Math.random() * 3)],
    };

    onUpdateConfig({
      ...config,
      photos: [newPhotoItem, ...config.photos],
    });

    setNewUrl('');
    setNewCaption('');
    setNewDate('');
    setShowAddModal(false);
    soundEngine.playTwinkle();
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-10 select-none">
      {/* Hidden Easter Egg Star */}
      <div className="absolute top-10 left-8 sm:left-20 animate-sparkle">
        <DoodleStar
          size={28}
          color="#60A5FA"
          onClick={onStarFound}
          className="cursor-pointer"
        />
      </div>

      {/* Floating illustrations */}
      <div className="absolute top-6 right-10 animate-flutter">
        <WatercolorButterfly color="sky" size={56} />
      </div>
      <div className="absolute bottom-6 left-8 hidden sm:block">
        <WatercolorFlower size={52} rotation={12} />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Header Ribbon */}
        <div className="flex justify-center mb-3">
          <WashiTape type="striped" width="w-48" rotation={-1.5} />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-black text-blue-950 tracking-tight leading-tight mb-2"
        >
          WATERCOLOUR MEMORY WALL 💙
        </motion.h1>

        <p className="text-xl sm:text-2xl font-handwriting font-bold text-blue-800 mb-6">
          Every picture holds a thousand chaotic memories with you. Tap any photo to inspect!
        </p>

        {/* Add Memory Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-100/90 hover:bg-blue-200 border-2 border-blue-300 text-blue-900 font-patrick text-xl font-bold tracking-wide shadow-sm hover:scale-105 transition-all"
          >
            <Plus className="w-5 h-5 text-blue-700" />
            <span>Pin Another Memory 📸</span>
          </button>
        </div>

        {/* Polaroid Scrapbook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 my-4">
          {config.photos.map((photo, idx) => (
            <motion.div
              key={photo.id || idx}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.04, rotate: 0, zIndex: 30 }}
              onClick={() => handlePhotoClick(photo)}
              className="group cursor-pointer polaroid-frame p-4 pb-6 rounded-xl border border-blue-200/80 bg-white relative transition-all duration-300 flex flex-col items-center"
              style={{ transform: `rotate(${photo.rotation ?? (idx % 2 === 0 ? -2.5 : 2.5)}deg)` }}
            >
              {/* Tape on top of Polaroid */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <WashiTape
                  type={photo.tapeColor || (idx % 3 === 0 ? 'blue' : idx % 3 === 1 ? 'navy' : 'striped')}
                  width="w-24"
                  rotation={(idx % 2 === 0 ? -3 : 3)}
                />
              </div>

              {/* Photo Image Frame */}
              <div className="relative w-full aspect-4/3 overflow-hidden rounded-lg bg-blue-50 border border-blue-100 mt-2">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  onError={(e) => {
                    // Graceful fallback for local or missing paths
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/15 transition-colors flex items-center justify-center">
                  <div className="p-2 rounded-full bg-white/90 text-blue-900 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Handwritten Caption */}
              <div className="mt-3.5 text-center px-1">
                <p className="text-xl sm:text-2xl font-handwriting font-bold text-blue-950 leading-tight">
                  {photo.caption}
                </p>
                {photo.date && (
                  <span className="inline-block mt-1 text-xs font-script font-bold text-blue-600">
                    ~ {photo.date}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Next Step CTA */}
        <div className="mt-12">
          <button
            onClick={onNext}
            className="inline-flex items-center gap-3 px-10 py-4.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-patrick text-2xl font-bold tracking-wide scrapbook-shadow-lg transition-all"
          >
            <span>PLAY BESTIE TRIVIA GAME</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Polaroid Detailed Inspect Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="absolute inset-0"
            />
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              className="relative z-10 max-w-lg w-full polaroid-frame p-6 pb-8 rounded-2xl bg-white border-2 border-blue-200 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full aspect-4/3 rounded-lg overflow-hidden bg-blue-50 border border-blue-100 mb-4">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-handwriting font-bold text-blue-950 leading-snug">
                  {selectedPhoto.caption}
                </p>
                {selectedPhoto.date && (
                  <p className="text-lg font-script font-bold text-blue-600 mt-1">
                    📅 {selectedPhoto.date}
                  </p>
                )}
                <div className="mt-4 flex justify-center">
                  <WatercolorSeal text="💙" size={48} />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Memory Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 max-w-md w-full bg-[#FAF7F0] rounded-3xl p-6 sm:p-8 border-2 border-blue-300 scrapbook-shadow-lg text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-serif-display font-bold text-blue-950">
                  Add a New Polaroid 📸
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1.5 rounded-full hover:bg-blue-100 text-blue-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddMemory} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold font-patrick text-blue-900 mb-1">
                    Photo URL (or /photos/photo1.jpg):
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="https://... or /photos/your-image.jpg"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-blue-300 bg-white text-blue-950 font-sans text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold font-patrick text-blue-900 mb-1">
                    Handwritten Caption:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. That time we got lost laughing 💙"
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-blue-300 bg-white text-blue-950 font-sans text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold font-patrick text-blue-900 mb-1">
                    Date or Tag (optional):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Summer Vacation, 2024"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-blue-300 bg-white text-blue-950 font-sans text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-blue-800 hover:bg-blue-100 font-patrick text-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-patrick font-bold text-lg shadow-sm"
                  >
                    Tape into Scrapbook
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
