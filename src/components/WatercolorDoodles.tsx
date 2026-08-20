import React from 'react';

// Watercolor Butterfly
export const WatercolorButterfly: React.FC<{ className?: string; color?: 'sky' | 'royal' | 'cyan'; size?: number }> = ({
  className = '',
  color = 'sky',
  size = 48
}) => {
  const gradients = {
    sky: { top: '#60A5FA', mid: '#93C5FD', bottom: '#BFDBFE', stroke: '#2563EB' },
    royal: { top: '#1D4ED8', mid: '#3B82F6', bottom: '#60A5FA', stroke: '#1E3A8A' },
    cyan: { top: '#0284C7', mid: '#38BDF8', bottom: '#BAE6FD', stroke: '#0369A1' },
  }[color];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`filter drop-shadow-sm select-none pointer-events-none ${className}`}
    >
      <defs>
        <linearGradient id={`bf-grad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradients.top} stopOpacity="0.85" />
          <stop offset="50%" stopColor={gradients.mid} stopOpacity="0.7" />
          <stop offset="100%" stopColor={gradients.bottom} stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id={`bf-glow-${color}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={gradients.bottom} stopOpacity="0.6" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Wings - Upper Left */}
      <path
        d="M50 50 C40 25, 10 15, 8 35 C6 55, 30 65, 50 52"
        fill={`url(#bf-grad-${color})`}
        stroke={gradients.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.92"
      />
      {/* Wings - Upper Right */}
      <path
        d="M50 50 C60 25, 90 15, 92 35 C94 55, 70 65, 50 52"
        fill={`url(#bf-grad-${color})`}
        stroke={gradients.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.92"
      />
      {/* Wings - Lower Left */}
      <path
        d="M50 52 C35 60, 18 68, 22 84 C26 95, 45 80, 50 60"
        fill={`url(#bf-grad-${color})`}
        stroke={gradients.stroke}
        strokeWidth="1.2"
        opacity="0.8"
      />
      {/* Wings - Lower Right */}
      <path
        d="M50 52 C65 60, 82 68, 78 84 C74 95, 55 80, 50 60"
        fill={`url(#bf-grad-${color})`}
        stroke={gradients.stroke}
        strokeWidth="1.2"
        opacity="0.8"
      />
      {/* Wing Patterns */}
      <circle cx="28" cy="38" r="4" fill="white" opacity="0.6" />
      <circle cx="72" cy="38" r="4" fill="white" opacity="0.6" />
      <circle cx="32" cy="74" r="2.5" fill="white" opacity="0.5" />
      <circle cx="68" cy="74" r="2.5" fill="white" opacity="0.5" />

      {/* Body & Antennae */}
      <path d="M50 36 L50 64" stroke={gradients.stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M49 37 C45 28, 38 24, 34 26" stroke={gradients.stroke} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M51 37 C55 28, 62 24, 66 26" stroke={gradients.stroke} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
};

// Hand-Drawn Watercolor Cloud
export const WatercolorCloud: React.FC<{ className?: string; opacity?: number }> = ({ className = '', opacity = 0.5 }) => (
  <svg
    viewBox="0 0 240 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
    style={{ opacity }}
  >
    <defs>
      <radialGradient id="cloud-grad-1" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.8" />
        <stop offset="60%" stopColor="#E0F2FE" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#FAF7F0" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="cloud-grad-2" cx="65%" cy="35%" r="50%">
        <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.7" />
        <stop offset="70%" stopColor="#DBEAFE" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#FAF7F0" stopOpacity="0" />
      </radialGradient>
    </defs>
    <path
      d="M40 75 C20 75 10 55 25 40 C35 25 65 25 75 35 C90 15 130 15 145 35 C160 20 195 25 205 45 C225 50 230 75 205 85 C190 92 60 92 40 75 Z"
      fill="url(#cloud-grad-1)"
    />
    <path
      d="M50 70 C35 70 25 55 38 42 C48 30 72 32 82 40 C95 24 125 22 138 38 C152 26 180 30 190 48 C208 52 210 72 192 80 C175 86 68 86 50 70 Z"
      fill="url(#cloud-grad-2)"
    />
  </svg>
);

// Hand-Drawn Blue Botanical Flower
export const WatercolorFlower: React.FC<{ className?: string; size?: number; rotation?: number }> = ({
  className = '',
  size = 40,
  rotation = 0
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: `rotate(${rotation}deg)` }}
    className={`pointer-events-none select-none filter drop-shadow-xs ${className}`}
  >
    <defs>
      <radialGradient id="petal-blue" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.9" />
        <stop offset="60%" stopColor="#60A5FA" stopOpacity="0.75" />
        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.9" />
      </radialGradient>
      <radialGradient id="center-gold" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="70%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </radialGradient>
    </defs>
    {/* 5 Petals */}
    {[0, 72, 144, 216, 288].map((angle, i) => (
      <path
        key={i}
        d="M50 50 C42 30, 40 12, 50 10 C60 12, 58 30, 50 50"
        fill="url(#petal-blue)"
        stroke="#2563EB"
        strokeWidth="1.2"
        strokeLinecap="round"
        transform={`rotate(${angle} 50 50)`}
      />
    ))}
    {/* Center */}
    <circle cx="50" cy="50" r="9" fill="url(#center-gold)" stroke="#B45309" strokeWidth="1" />
    <circle cx="48" cy="48" r="2" fill="white" opacity="0.8" />
  </svg>
);

// Little Hand-Drawn Doodle Stars
export const DoodleStar: React.FC<{
  className?: string;
  size?: number;
  color?: string;
  onClick?: () => void;
}> = ({ className = '', size = 24, color = '#60A5FA', onClick }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    className={`transition-transform hover:scale-125 ${onClick ? 'cursor-pointer' : 'pointer-events-none'} ${className}`}
  >
    <path
      d="M25 4 L29 18 C30 20 32 20 35 21 L47 23 C49 24 49 26 47 27 L37 34 C35 35 35 37 36 39 L40 47 C40 49 38 50 36 49 L27 42 C25 41 24 41 22 42 L13 49 C11 50 9 49 10 47 L14 39 C15 37 14 35 13 34 L3 27 C1 26 1 24 3 23 L15 21 C17 20 19 20 20 18 L24 4 C24 2 25 2 25 4 Z"
      fill={color}
      stroke="#1E40AF"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

// Hand-Drawn Blue Lock and Key
export const HandDrawnLock: React.FC<{ isOpen?: boolean; size?: number; className?: string }> = ({
  isOpen = false,
  size = 100,
  className = ''
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-700 filter drop-shadow-md ${className}`}
  >
    <defs>
      <linearGradient id="lock-body" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#1E3A8A" />
      </linearGradient>
      <linearGradient id="shackle" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#93C5FD" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>

    {/* Shackle */}
    <path
      d={
        isOpen
          ? 'M40 55 V35 C40 22 50 14 62 14 C74 14 84 22 84 35 V42'
          : 'M38 58 V35 C38 20 48 12 60 12 C72 12 82 20 82 35 V58'
      }
      stroke="url(#shackle)"
      strokeWidth="9"
      strokeLinecap="round"
      fill="none"
      className="transition-all duration-700"
    />

    {/* Lock Body */}
    <rect
      x="24"
      y="52"
      width="72"
      height="56"
      rx="14"
      fill="url(#lock-body)"
      stroke="#172554"
      strokeWidth="2.5"
    />

    {/* Keyhole */}
    <circle cx="60" cy="74" r="6" fill="#FAF7F0" stroke="#0F172A" strokeWidth="1.5" />
    <path d="M57 76 L55 90 H65 L63 76 Z" fill="#FAF7F0" stroke="#0F172A" strokeWidth="1.5" />

    {/* Hand-drawn scribble highlight */}
    <path d="M34 60 Q60 62 76 60" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
  </svg>
);

// Hand-Drawn Birthday Cake with Flickering Candle
export const HandDrawnCake: React.FC<{
  className?: string;
  size?: number;
  candlesBlown?: boolean;
  onBlowCandles?: () => void;
}> = ({ className = '', size = 160, candlesBlown = false, onBlowCandles }) => (
  <div
    className={`relative inline-block cursor-pointer select-none group ${className}`}
    onClick={onBlowCandles}
    title={candlesBlown ? "Candles blown! ✨" : "Click cake to blow out candles! 🎂"}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="filter drop-shadow-lg"
    >
      <defs>
        <linearGradient id="cake-icing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DBEAFE" />
          <stop offset="100%" stopColor="#93C5FD" />
        </linearGradient>
        <linearGradient id="cake-base" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="cake-plate" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
      </defs>

      {/* Plate */}
      <ellipse cx="100" cy="180" rx="85" ry="14" fill="url(#cake-plate)" stroke="#475569" strokeWidth="2" />

      {/* Bottom Tier */}
      <rect x="35" y="125" width="130" height="50" rx="8" fill="url(#cake-base)" stroke="#1E3A8A" strokeWidth="2" />
      {/* Bottom Cream Drips */}
      <path
        d="M35 130 C45 145, 55 125, 65 140 C75 125, 85 145, 100 135 C115 145, 125 125, 135 140 C145 125, 155 142, 165 130 V125 H35 Z"
        fill="url(#cake-icing)"
        stroke="#1D4ED8"
        strokeWidth="1.5"
      />

      {/* Top Tier */}
      <rect x="55" y="80" width="90" height="46" rx="6" fill="url(#cake-base)" stroke="#1E3A8A" strokeWidth="2" />
      {/* Top Cream Drips */}
      <path
        d="M55 85 C65 98, 75 83, 85 96 C95 83, 105 98, 115 88 C125 98, 135 85, 145 85 V80 H55 Z"
        fill="url(#cake-icing)"
        stroke="#1D4ED8"
        strokeWidth="1.5"
      />

      {/* Candles */}
      {[75, 100, 125].map((x, i) => (
        <g key={i}>
          {/* Candle stick */}
          <rect x={x - 3} y="45" width="6" height="35" rx="2" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.2" />
          <line x1={x - 2} y1="52" x2={x + 2} y2="58" stroke="#3B82F6" strokeWidth="1.2" />
          <line x1={x - 2} y1="62" x2={x + 2} y2="68" stroke="#3B82F6" strokeWidth="1.2" />

          {/* Candle Flame / Smoke */}
          {!candlesBlown ? (
            <g className="animate-pulse-glow">
              <path
                d={`M${x} 44 C${x - 6} 34, ${x - 5} 24, ${x} 18 C${x + 5} 24, ${x + 6} 34, ${x} 44 Z`}
                fill="#FBBF24"
                stroke="#D97706"
                strokeWidth="1"
              />
              <circle cx={x} cy="32" r="3" fill="#FEF08A" />
            </g>
          ) : (
            <g className="opacity-60 transition-opacity">
              {/* Little smoke puff */}
              <path
                d={`M${x} 42 Q${x - 4} 34 ${x + 2} 26 T${x} 14`}
                stroke="#94A3B8"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}
        </g>
      ))}

      {/* Decorative pearls/berries */}
      <circle cx="50" cy="165" r="3.5" fill="#BFDBFE" />
      <circle cx="100" cy="165" r="3.5" fill="#BFDBFE" />
      <circle cx="150" cy="165" r="3.5" fill="#BFDBFE" />
      <circle cx="75" cy="115" r="3" fill="#BFDBFE" />
      <circle cx="125" cy="115" r="3" fill="#BFDBFE" />
    </svg>
    {!candlesBlown && (
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blue-900/80 backdrop-blur-xs text-white text-[11px] font-handwriting px-2.5 py-0.5 rounded-full border border-blue-300 shadow-sm opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all">
        tap to make a wish & blow! 🕯️
      </div>
    )}
  </div>
);

// Hand-Drawn Washi Tape Bar
export const WashiTape: React.FC<{
  type?: 'blue' | 'navy' | 'striped';
  width?: string;
  rotation?: number;
  className?: string;
}> = ({ type = 'blue', width = 'w-24', rotation = 0, className = '' }) => {
  const typeClass = {
    blue: 'washi-tape-blue',
    navy: 'washi-tape-navy',
    striped: 'washi-tape-striped',
  }[type];

  return (
    <div
      className={`h-5 ${width} ${typeClass} select-none pointer-events-none rounded-xs ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    />
  );
};

// Hand-Drawn Blue Wax Seal Stamp
export const WatercolorSeal: React.FC<{ text?: string; size?: number; className?: string }> = ({
  text = '💙',
  size = 54,
  className = ''
}) => (
  <div
    style={{ width: size, height: size }}
    className={`rounded-full bg-radial from-blue-400 via-blue-600 to-blue-900 text-white font-script flex items-center justify-center shadow-lg border-2 border-blue-200/60 select-none ${className}`}
  >
    <span className="text-xl filter drop-shadow-sm">{text}</span>
  </div>
);
