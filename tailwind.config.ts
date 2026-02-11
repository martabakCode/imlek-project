import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'calligraphy': ['"Ma Shan Zheng"', 'cursive'],
        'serif-cn': ['"Noto Serif SC"', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'rise': 'rise 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'swing': 'swing 3s ease-in-out infinite',
        'rotate-3d': 'rotate3d 3s linear infinite',
        'shine': 'shine 2s linear infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'tail-sway': 'tailSway 2s ease-in-out infinite',
        'wing-flap': 'wingFlap 1.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'flame-border': 'flameBorder 3s linear infinite',
      },
      keyframes: {
        rise: {
          '0%': { transform: 'translateY(100%) translateX(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-100vh) translateX(20px)', opacity: '0' },
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 20px rgba(251, 191, 36, 0.5)' },
          '50%': { textShadow: '0 0 40px rgba(251, 191, 36, 1), 0 0 60px rgba(239, 68, 68, 0.5)' },
        },
        swing: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        rotate3d: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        shine: {
          '0%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.3)' },
          '100%': { filter: 'brightness(1)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        tailSway: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        wingFlap: {
          '0%, 100%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(30deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        flameBorder: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      backgroundImage: {
        'fire-gradient': 'linear-gradient(to top, #dc2626, #f97316, #facc15)',
        'phoenix-gradient': 'linear-gradient(to bottom right, #4c1d95, #be185d, #ea580c)',
        'emperor-gradient': 'linear-gradient(to bottom, #7f1d1d, #991b1b)',
      },
    },
  },
  plugins: [],
}

export default config
