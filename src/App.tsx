import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BirthdayConfig, initialBirthdayConfig } from './config/birthdayConfig';
import { NavigationRibbon } from './components/NavigationRibbon';
import { AudioPlayer } from './components/AudioPlayer';
import { EasterEggModal } from './components/EasterEggModal';
import { PersonalizeModal } from './components/PersonalizeModal';
import { soundEngine } from './utils/audioSoundtrack';

// 11 Chapters
import { Page1Opening } from './components/pages/Page1Opening';
import { Page2Secret } from './components/pages/Page2Secret';
import { Page3BirthdayReveal } from './components/pages/Page3BirthdayReveal';
import { Page4ThisIsUs } from './components/pages/Page4ThisIsUs';
import { Page5MemoryWall } from './components/pages/Page5MemoryWall';
import { Page6BestieGame } from './components/pages/Page6BestieGame';
import { Page7ThingsINeverSay } from './components/pages/Page7ThingsINeverSay';
import { Page8HandwrittenLetter } from './components/pages/Page8HandwrittenLetter';
import { Page9OurFuture } from './components/pages/Page9OurFuture';
import { Page10FinalGift } from './components/pages/Page10FinalGift';
import { Page11FinalMessage } from './components/pages/Page11FinalMessage';

const PAGE_TITLES = [
  'Hey Bestie...',
  'The Little Secret',
  'Birthday Reveal',
  'This Is Us',
  'Memory Wall',
  'Bestie Trivia Game',
  'Things I Never Say',
  'Handwritten Letter',
  'Our Little Future',
  'Final Gift Box',
  'Final Birthday Message',
];

const TOTAL_STARS = 6;

export default function App() {
  const [config, setConfig] = useState<BirthdayConfig>(() => {
    try {
      const saved = localStorage.getItem('bestie_birthday_config');
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialBirthdayConfig;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [foundStarsCount, setFoundStarsCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [showPersonalize, setShowPersonalize] = useState(false);

  const handleUpdateConfig = (newConfig: BirthdayConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('bestie_birthday_config', JSON.stringify(newConfig));
    } catch {}
  };

  const handleStarFound = () => {
    soundEngine.playTwinkle();
    setFoundStarsCount((prev) => Math.min(prev + 1, TOTAL_STARS));
    setShowEasterEgg(true);
  };

  const handleNextPage = () => {
    if (currentPage < PAGE_TITLES.length) {
      soundEngine.playPageTurn();
      setCurrentPage((p) => p + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRestart = () => {
    soundEngine.playPageTurn();
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen watercolor-canvas paper-texture text-[#1E3A5F] flex flex-col justify-between selection:bg-blue-200">
      {/* Top Navigation Ribbon Bar */}
      <NavigationRibbon
        currentPage={currentPage}
        totalPages={PAGE_TITLES.length}
        pageTitles={PAGE_TITLES}
        onPageChange={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPersonalize={() => setShowPersonalize(true)}
        foundStars={foundStarsCount}
        totalStars={TOTAL_STARS}
      />

      {/* Main Content View with Smooth Page Turns */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-3 sm:p-6 md:p-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            {currentPage === 1 && (
              <Page1Opening
                config={config}
                onNext={handleNextPage}
                onStarFound={handleStarFound}
              />
            )}
            {currentPage === 2 && (
              <Page2Secret
                config={config}
                onNext={handleNextPage}
                onStarFound={handleStarFound}
              />
            )}
            {currentPage === 3 && (
              <Page3BirthdayReveal
                config={config}
                onNext={handleNextPage}
                onStarFound={handleStarFound}
              />
            )}
            {currentPage === 4 && (
              <Page4ThisIsUs
                config={config}
                onNext={handleNextPage}
                onStarFound={handleStarFound}
              />
            )}
            {currentPage === 5 && (
              <Page5MemoryWall
                config={config}
                onUpdateConfig={handleUpdateConfig}
                onNext={handleNextPage}
                onStarFound={handleStarFound}
              />
            )}
            {currentPage === 6 && (
              <Page6BestieGame
                config={config}
                onNext={handleNextPage}
                onStarFound={handleStarFound}
              />
            )}
            {currentPage === 7 && (
              <Page7ThingsINeverSay
                config={config}
                onNext={handleNextPage}
                onStarFound={handleStarFound}
              />
            )}
            {currentPage === 8 && (
              <Page8HandwrittenLetter
                config={config}
                onNext={handleNextPage}
                onStarFound={handleStarFound}
              />
            )}
            {currentPage === 9 && (
              <Page9OurFuture
                config={config}
                onNext={handleNextPage}
                onStarFound={handleStarFound}
              />
            )}
            {currentPage === 10 && (
              <Page10FinalGift
                config={config}
                onNext={handleNextPage}
                onStarFound={handleStarFound}
              />
            )}
            {currentPage === 11 && (
              <Page11FinalMessage
                config={config}
                onRestart={handleRestart}
                onStarFound={handleStarFound}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Audio Soundtrack Player */}
      <AudioPlayer musicUrl={config.music} />

      {/* Easter Egg Modal */}
      <EasterEggModal
        isOpen={showEasterEgg}
        onClose={() => setShowEasterEgg(false)}
        foundCount={foundStarsCount}
        totalCount={TOTAL_STARS}
      />

      {/* Personalization Modal */}
      <PersonalizeModal
        isOpen={showPersonalize}
        onClose={() => setShowPersonalize(false)}
        config={config}
        onSave={handleUpdateConfig}
      />
    </div>
  );
}
