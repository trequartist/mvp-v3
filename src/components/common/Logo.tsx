import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "w-8 h-8", showText = false }) => (
  <div className="flex items-center gap-2">
    <div className={`relative ${className}`}>
      {/* Base circle with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-kiwi via-kiwi-light to-kiwi-dark rounded-full opacity-90" />
      
      {/* Inner glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-white/20 to-white/40 rounded-full" />
      
      {/* Q symbol */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="relative text-[140%] text-white transform translate-y-[-4%] translate-x-[-2%]" 
          style={{ 
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            letterSpacing: '0em',
            fontStretch: '125%',
            fontFeatureSettings: '"ss01" 1, "ss02" 1',
            fontOpticalSizing: 'auto',
            fontVariationSettings: '"wdth" 125',
            textRendering: 'geometricPrecision'
          }}
        >
          Q
          {/* Custom tail extension */}
          <div 
            className="absolute bottom-0 right-0 w-[0.3em] h-[0.15em] bg-white transform rotate-[-30deg] translate-x-[60%] translate-y-[-20%] rounded-full"
            style={{
              transformOrigin: 'left center'
            }}
          />
        </div>
      </div>

      {/* Sparkle effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent_70%)] rounded-full" />
      
      {/* Pulsing rings */}
      <motion.div
        className="absolute -inset-1 rounded-full bg-gradient-to-br from-kiwi-light to-kiwi"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0, 0.15]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute -inset-2 rounded-full bg-gradient-to-br from-kiwi-light to-kiwi"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0, 0.1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3
        }}
      />
    </div>

    {showText && (
      <div className="flex flex-col">
        <span className="text-2xl font-bold tracking-tight text-white">ContentQ</span>
        <span className="text-sm text-gray-400">powered by KiwiQ AI</span>
      </div>
    )}
  </div>
);

export default Logo;