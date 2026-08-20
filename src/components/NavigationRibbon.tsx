import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Settings, Sparkles, Star } from 'lucide-react';
import { soundEngine } from '../utils/audioSoundtrack';

interface NavigationRibbonProps {
  currentPage: number;
  totalPages: number;
  pageTitles: string[];
  onPageChange: (page: number) => void;
  onOpenPersonalize: () => void;
  foundStars: number;
  totalStars: number;
}

export const NavigationRibbon: React.FC<NavigationRibbonProps> = ({
  currentPage,
  totalPages,
  pageTitles,
  onPageChange,
  onOpenPersonalize,
  foundStars,
  totalStars,
}) => {
  const [showChapters, setShowChapters] = useState(false);

  const handlePrev = () => {
    if (currentPage > 1) {
      soundEngine.playPageTurn();
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      soundEngine.playPageTurn();
      onPageChange(currentPage + 1);
    }
  };

  const handleJump = (page: number) => {
    soundEngine.playPageTurn();
    onPageChange(page);
    setShowChapters(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F0]/90 backdrop-blur-md border-b border-blue-200/80 px-3 sm:px-6 py-2.5 shadow-xs select-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Previous Page */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs sm:text-sm font-patrick font-bold transition-all ${
            currentPage === 1
              ? 'opacity-30 border-transparent text-slate-400 cursor-not-allowed'
              : 'border-blue-300 bg-white/80 hover:bg-blue-100 text-blue-900 shadow-xs'
          }`}
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden xs:inline">Prev</span>
        </button>

        {/* Center: Chapter Info & Jump trigger */}
        <div className="relative">
          <button
            onClick={() => setShowChapters(!showChapters)}
            className="flex items-center gap-2 px-3 sm:px-4 py-1 rounded-full bg-blue-100/80 hover:bg-blue-200/80 border border-blue-300 text-blue-950 transition-colors shadow-inner"
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-700 shrink-0" />
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-blue-700">
                  Page {currentPage}/{totalPages}:
                </span>
                <span className="text-xs sm:text-sm font-patrick font-bold text-blue-950 truncate max-w-[130px] sm:max-w-[220px]">
                  {pageTitles[currentPage - 1]}
                </span>
              </div>
            </div>
          </button>

          {/* Chapter Jump Dropdown */}
          {showChapters && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 sm:w-72 bg-[#FAF7F0] border-2 border-blue-300 rounded-2xl shadow-xl p-3 z-50 max-h-80 overflow-y-auto">
              <p className="text-xs font-handwriting font-bold text-blue-900 mb-2 px-2">
                Turn directly to page:
              </p>
              <div className="space-y-1">
                {pageTitles.map((title, idx) => {
                  const pageNum = idx + 1;
                  const isActive = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handleJump(pageNum)}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs sm:text-sm font-patrick font-bold transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-blue-100 text-blue-950'
                      }`}
                    >
                      <span className="truncate">
                        {pageNum}. {title}
                      </span>
                      {isActive && <span className="text-xs">📖</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Actions: Easter Egg Count, Personalize & Next Page */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Secret Star Badge */}
          <div
            className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-handwriting font-bold"
            title={`${foundStars} of ${totalStars} secret stars discovered!`}
          >
            <Star className="w-3.5 h-3.5 fill-blue-400 text-blue-500" />
            <span>
              {foundStars}/{totalStars} Stars
            </span>
          </div>

          {/* Personalize Button */}
          <button
            onClick={onOpenPersonalize}
            className="p-1.5 sm:px-3 sm:py-1 rounded-full bg-blue-100/90 hover:bg-blue-200 border border-blue-300 text-blue-900 transition-all font-patrick text-xs sm:text-sm font-bold flex items-center gap-1"
            title="Edit Names / Date / PIN"
          >
            <Settings className="w-4 h-4 text-blue-700" />
            <span className="hidden sm:inline">Customize</span>
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs sm:text-sm font-patrick font-bold transition-all ${
              currentPage === totalPages
                ? 'opacity-30 border-transparent text-slate-400 cursor-not-allowed'
                : 'border-blue-300 bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
            }`}
            title="Next Page"
          >
            <span className="hidden xs:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
