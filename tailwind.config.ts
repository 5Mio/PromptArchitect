import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0C0C0E',
        surface: '#141417',
        's2': '#1C1C20',
        's3': '#242428',
        accent: '#FF4D00',
        'accent-subtle': 'rgba(255,77,0,0.08)',
        gold: '#F59E0B',
        'gold-subtle': 'rgba(245,158,11,0.10)',
        green: '#10B981',
        blue: '#3B82F6',
        'blue-subtle': 'rgba(59,130,246,0.10)',
        text: '#F4F4F6',
        'text-secondary': '#A1A1AA',
        'text-muted': '#52525B',
        border: 'rgba(255,255,255,0.07)',
        'border-2': 'rgba(255,255,255,0.12)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '14px', letterSpacing: '0.05em' }],
        'xs': ['11px', { lineHeight: '16px' }],
        'sm': ['12px', { lineHeight: '18px' }],
        'base': ['13px', { lineHeight: '20px' }],
        'md': ['14px', { lineHeight: '20px' }],
        'lg': ['16px', { lineHeight: '24px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['32px', { lineHeight: '40px' }],
      },
      borderRadius: {
        'sm': '4px',
        DEFAULT: '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        'full': '9999px',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        tooltipFade: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        recBannerIn: {
          '0%': { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        tagGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255,77,0,0)' },
          '50%': { boxShadow: '0 0 0 3px rgba(255,77,0,0.2)' },
        },
        slideProgress: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.35s ease forwards',
        'tooltip-fade': 'tooltipFade 0.15s ease forwards',
        'rec-banner': 'recBannerIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
        'pulse-slow': 'pulse 1.2s ease-in-out infinite',
        'tag-glow': 'tagGlow 2.5s ease-in-out infinite',
        'slide-progress': 'slideProgress 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
