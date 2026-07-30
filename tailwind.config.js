/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Sacred Saffron — Agni fire */
        saffron: {
          DEFAULT: '#E8823A',
          light:   '#F5A461',
          deep:    '#C46820',
          950:     '#2A1000',
          900:     '#3D1800',
          800:     '#5C2800',
        },
        /* Royal Gold — Divine ornaments */
        gold: {
          DEFAULT: '#F0B429',
          light:   '#FFD45E',
          deep:    '#B88A10',
          950:     '#1A1000',
          900:     '#2A1A00',
          800:     '#3D2800',
        },
        /* War Crimson — Battle, temples */
        crimson: {
          DEFAULT: '#8B1A2E',
          deep:    '#4A0E18',
          950:     '#130308',
          900:     '#200510',
          800:     '#350A1A',
        },
        /* Divine Ivory — Ancient parchment */
        ivory: {
          DEFAULT: '#F5E6CE',
          muted:   '#C8B08A',
          dark:    '#8A7060',
        },
        /* Lotus Blue — Rama's divine aura */
        lotus: {
          DEFAULT: '#2B5797',
          deep:    '#1A3A6E',
          950:     '#060E1C',
          900:     '#0A1828',
          800:     '#102240',
        },
        /* Ember — Battlefield fire sparks */
        ember: {
          DEFAULT: '#FF6B1A',
          light:   '#FF9B5A',
        },
        /* Dark surfaces */
        rama: {
          bg:      '#070108',
          surface: '#0E0210',
          card:    '#130318',
          alt:     '#1A0420',
          border:  '#2A0835',
        },
      },
      fontFamily: {
        cinzel:     ['"Cinzel Decorative"', 'Cinzel', 'serif'],
        'cinzel-sm':['Cinzel', 'serif'],
        lato:       ['Lato', 'system-ui', 'sans-serif'],
        sans:       ['Lato', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'rama-glow':   'radial-gradient(circle, rgba(240,180,41,0.2) 0%, transparent 70%)',
        'battle-sky':  'radial-gradient(ellipse at 20% 0%, #3D0A18 0%, #1A0410 35%, #07010C 70%, #030006 100%)',
        'divine-gold': 'linear-gradient(135deg, #F0B429 0%, #E8823A 50%, #B88A10 100%)',
        'sacred-fire': 'linear-gradient(to top, #FF6B1A, #F0B429, transparent)',
      },
      animation: {
        'ember-float':   'emberFloat 6s infinite ease-in-out',
        'arrow-fly':     'arrowFly1 12s infinite linear',
        'sacred-pulse':  'sacredAuraPulse 2.5s infinite ease-in-out',
        'war-shimmer':   'warShimmer 4s infinite ease-in-out',
        'divine-fadein': 'divineFadeIn 0.45s ease-out forwards',
        'golden-pulse':  'pulseSlow 2s infinite ease-in-out',
      },
      boxShadow: {
        'gold-glow':    '0 0 25px rgba(240,180,41,0.35), 0 0 60px rgba(240,180,41,0.12)',
        'saffron-glow': '0 0 25px rgba(232,130,58,0.40)',
        'crimson-glow': '0 0 25px rgba(139,26,46,0.45)',
        'lotus-glow':   '0 0 25px rgba(43,87,151,0.45)',
        'divine':       '0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(240,180,41,0.08)',
      },
    },
  },
  plugins: [],
}
