import React from 'react';

interface CamaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function CamaLogo({ className = '', size = 'md' }: CamaLogoProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      <svg 
        viewBox="0 0 500 250" 
        className="w-full h-full drop-shadow-md select-none"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sun Glow Gradient */}
          <radialGradient id="sunGlow" cx="250" cy="90" r="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF275" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#FFAA00" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFAA00" stopOpacity="0" />
          </radialGradient>
          
          {/* Wing Metallic Gradient */}
          <linearGradient id="wingGrad" x1="0" y1="0" x2="500" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Shield Border Gold Gradient */}
          <linearGradient id="shieldGold" x1="220" y1="110" x2="280" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFE07D" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#AA7C11" />
          </linearGradient>

          {/* Texts Curved Paths */}
          {/* Path for Arabic text curved upwards/downwards */}
          <path id="arabicArc" d="M 120 180 A 150 150 0 0 0 380 180" />
          <path id="englishArc" d="M 80 195 A 190 190 0 0 0 420 195" />
        </defs>

        {/* 1. Sun & Rays (Top Central Sun) */}
        <circle cx="250" cy="95" r="70" fill="url(#sunGlow)" />
        <circle cx="250" cy="95" r="45" fill="#FFDE4D" stroke="#AA7C11" strokeWidth="1.5" />
        
        {/* Sun Rays */}
        <g stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round">
          <line x1="250" y1="42" x2="250" y2="20" /> {/* Top Vertical */}
          <line x1="205" y1="50" x2="178" y2="28" />
          <line x1="168" y1="72" x2="132" y2="52" />
          <line x1="148" y1="105" x2="110" y2="105" />
          <line x1="295" y1="50" x2="322" y2="28" />
          <line x1="332" y1="72" x2="368" y2="52" />
          <line x1="352" y1="105" x2="390" y2="105" />
        </g>

        {/* 2. Meteorological Cloud & Dotted Rain inside Sun */}
        <path 
          d="M 225 105 
             a 10 10 0 0 1 12 -5 
             a 16 16 0 0 1 26 -6 
             a 12 12 0 0 1 18 5 
             a 8 8 0 0 1 -2 12 
             l -50 0 
             a 8 8 0 0 1 -4 -6 Z" 
          fill="#FFFFFF" 
          stroke="#1E293B" 
          strokeWidth="1.5" 
          strokeLinejoin="round" 
        />
        {/* Rain Drops */}
        <g stroke="#0369A1" strokeWidth="2" strokeLinecap="round" opacity="0.8">
          <line x1="228" y1="114" x2="225" y2="124" strokeDasharray="1.5 3" />
          <line x1="236" y1="116" x2="233" y2="126" strokeDasharray="1.5 3" />
          <line x1="244" y1="117" x2="241" y2="127" strokeDasharray="1.5 3" />
          <line x1="252" y1="117" x2="249" y2="127" strokeDasharray="1.5 3" />
          <line x1="260" y1="116" x2="257" y2="126" strokeDasharray="1.5 3" />
          <line x1="268" y1="114" x2="265" y2="124" strokeDasharray="1.5 3" />
        </g>

        {/* 3. Dark Blue Horizontal Aviation Bars (Back Wings) */}
        <g fill="#1E40AF">
          {/* Left Dark Blue Wing Horizontal Bars */}
          <path d="M 190 100 H 15 V 110 H 190 Z" opacity="0.9" />
          <path d="M 180 114 H 30 V 124 H 180 Z" opacity="0.9" />
          <path d="M 170 128 H 45 V 138 H 170 Z" opacity="0.9" />
          <path d="M 160 142 H 60 V 150 H 160 Z" opacity="0.9" />

          {/* Right Dark Blue Wing Horizontal Bars */}
          <path d="M 310 100 H 485 V 110 H 310 Z" opacity="0.9" />
          <path d="M 320 114 H 470 V 124 H 320 Z" opacity="0.9" />
          <path d="M 330 128 H 455 V 138 H 330 Z" opacity="0.9" />
          <path d="M 340 142 H 440 V 150 H 340 Z" opacity="0.9" />
        </g>

        {/* 4. Large Elegant White/Silver Aviation Wings (Middle Overlay) */}
        {/* Left White Wing */}
        <path 
          d="M 230 135 
             C 170 120, 140 110, 115 110 
             C 90 110, 115 130, 150 145 
             C 175 155, 195 160, 215 160 
             C 215 160, 205 150, 230 135 Z" 
          fill="url(#wingGrad)" 
          stroke="#0F172A" 
          strokeWidth="1.5" 
          strokeLinejoin="round" 
        />
        <path 
          d="M 115 110 
             C 125 125, 145 138, 175 145" 
          stroke="#94A3B8" 
          strokeWidth="1" 
        />
        
        {/* Right White Wing */}
        <path 
          d="M 270 135 
             C 330 120, 360 110, 385 110 
             C 410 110, 385 130, 350 145 
             C 325 155, 305 160, 285 160 
             C 285 160, 295 150, 270 135 Z" 
          fill="url(#wingGrad)" 
          stroke="#0F172A" 
          strokeWidth="1.5" 
          strokeLinejoin="round" 
        />
        <path 
          d="M 385 110 
             C 375 125, 355 138, 325 145" 
          stroke="#94A3B8" 
          strokeWidth="1" 
        />

        {/* Small White Feathers Below Wings */}
        <path d="M 195 155 C 185 160, 175 168, 172 174 C 180 171, 192 165, 198 159 Z" fill="#E2E8F0" stroke="#0F172A" strokeWidth="1" />
        <path d="M 208 158 C 200 163, 190 172, 188 178 C 196 174, 206 166, 210 161 Z" fill="#E2E8F0" stroke="#0F172A" strokeWidth="1" />
        
        <path d="M 305 155 C 315 160, 325 168, 328 174 C 320 171, 308 165, 302 159 Z" fill="#E2E8F0" stroke="#0F172A" strokeWidth="1" />
        <path d="M 292 158 C 300 163, 310 172, 312 178 C 304 174, 294 166, 290 161 Z" fill="#E2E8F0" stroke="#0F172A" strokeWidth="1" />

        {/* 5. Center Shield (Yemen Flag & Flight Security Shield) */}
        {/* Shield Back and Border */}
        <path 
          d="M 224 133 
             C 224 133, 250 125, 276 133 
             C 276 133, 278 172, 250 195 
             C 222 172, 224 133, 224 133 Z" 
          fill="#FFFFFF" 
          stroke="url(#shieldGold)" 
          strokeWidth="3.5" 
          strokeLinejoin="round" 
        />
        
        {/* Inner Shield Flag Coloring */}
        {/* We divide the shield into vertical stripes: Black (Left), White (Center), Red (Right) */}
        <g>
          <clipPath id="shieldClip">
            <path d="M 224 133 C 224 133, 250 125, 276 133 C 276 133, 278 172, 250 195 C 222 172, 224 133, 224 133 Z" />
          </clipPath>
          
          <g clipPath="url(#shieldClip)">
            {/* Left third: Black */}
            <rect x="210" y="110" width="27" height="100" fill="#000000" />
            
            {/* Center third: White */}
            <rect x="237" y="110" width="26" height="100" fill="#FFFFFF" />
            
            {/* Right third: Red */}
            <rect x="263" y="110" width="27" height="100" fill="#CE1126" />
            
            {/* Gold Eagle Emblem or Stars (Subtle Center Badge in White Strip) */}
            <path d="M 250 148 L 252 153 L 257 153 L 253 156 L 255 161 L 250 158 L 245 161 L 247 156 L 243 153 L 248 153 Z" fill="#D4AF37" />
          </g>
        </g>
        
        {/* Outline for Flag Division within Shield */}
        <path 
          d="M 224 133 
             C 224 133, 250 125, 276 133 
             C 276 133, 278 172, 250 195 
             C 222 172, 224 133, 224 133 Z" 
          fill="none" 
          stroke="#0F172A" 
          strokeWidth="1.5" 
        />

        {/* 6. Beautiful Arched Texts along path */}
        {/* Arabic Text */}
        <text fontFamily="Segoe UI, Tahoma, sans-serif" fontWeight="bold" fontSize="13.5">
          <textPath href="#arabicArc" startOffset="50%" textAnchor="middle" fill="#D4AF37">
            الهيئة العامة للطيران المدني والأرصاد
          </textPath>
        </text>

        {/* English Text */}
        <text fontFamily="Segoe UI, Tahoma, Arial, sans-serif" fontWeight="bold" fontSize="11" letterSpacing="0.5">
          <textPath href="#englishArc" startOffset="50%" textAnchor="middle" fill="#3B82F6">
            CIVIL AVIATION & METEOROLOGY AUTHORITY
          </textPath>
        </text>
      </svg>
    </div>
  );
}
