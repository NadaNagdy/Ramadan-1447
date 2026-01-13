import type React from 'react';

export const CrescentMoon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M66.75,23.333C50.083,16.667,33.417,23.333,25.083,36.667C16.75,50,21.75,66.667,35.083,75 C51.75,83.333,68.417,76.667,76.75,60C85.083,43.333,83.417,30,66.75,23.333Z M58.417,31.667C65.083,38.333,65.083,53.333,56.75,61.667C48.417,70,35.083,70,28.417,61.667C21.75,53.333,23.417,40,31.75,31.667C40.083,23.333,51.75,23.333,58.417,31.667Z" />
  </svg>
);

export const Lantern: React.FC<{ className?: string, style?: React.CSSProperties }> = ({ className = "", style }) => (
  <svg className={className} style={style} viewBox="0 0 64 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 6C34.7614 6 37 3.76142 37 1C37 -1.76142 34.7614 -4 32 -4C29.2386 -4 27 -1.76142 27 1C27 3.76142 29.2386 6 32 6Z" />
    <path d="M42 10H22C20.8954 10 20 10.8954 20 12V16H44V12C44 10.8954 43.1046 10 42 10Z" />
    <path d="M48 20H16C13.7909 20 12 21.7909 12 24V76C12 80.4183 15.5817 84 20 84H44C48.4183 84 52 80.4183 52 76V24C52 21.7909 50.2091 20 48 20ZM38 70H26V30H38V70Z" />
    <path d="M32 98C36.4183 98 40 94.4183 40 90H24C24 94.4183 27.5817 98 32 98Z" />
  </svg>
);

export const FloatingStars: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute top-[10%] left-[10%] animate-twinkle text-gold opacity-30 text-xs">★</div>
    <div className="absolute top-[20%] right-[15%] animate-twinkle text-gold opacity-20 text-lg" style={{ animationDelay: '1s' }}>★</div>
    <div className="absolute top-[40%] left-[20%] animate-twinkle text-gold opacity-25 text-base" style={{ animationDelay: '2s' }}>★</div>
    <div className="absolute bottom-[30%] right-[25%] animate-twinkle text-gold opacity-15 text-sm" style={{ animationDelay: '0.5s' }}>★</div>
    <div className="absolute bottom-[10%] left-[30%] animate-twinkle text-gold opacity-20 text-xl" style={{ animationDelay: '1.5s' }}>★</div>
    <div className="absolute top-[60%] right-[5%] animate-twinkle text-gold opacity-20" style={{animationDelay: '2.5s'}}>★</div>
  </div>
);

export const DecorativeDivider: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`flex items-center justify-center gap-4 ${className}`}>
    <div className="h-px w-16 bg-gradient-to-l from-gold/50 to-transparent" />
    <span className="text-gold text-lg">✦</span>
    <div className="h-px w-16 bg-gradient-to-r from-gold/50 to-transparent" />
  </div>
);
