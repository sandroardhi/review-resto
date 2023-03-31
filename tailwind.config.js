/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backfaceVisibility: {
        'visible': 'visible',
        'hidden': 'hidden',
      },
      translateZ: {
        '0': '0',
        '1': '1px',
        '2': '2px',
        '4': '4px',
        '8': '8px',
      },
    }
  },
  variants: {
    extend: {
      backfaceVisibility: ['hover', 'focus'],
      translateZ: ['hover', 'focus'],
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.backface-visible': {
          'backface-visibility': 'visible',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
        '.translate-z': {
          'transform': 'translateZ(var(--translate-z))',
        },
      }
      for (let key in theme.translateZ) {
        const value = theme.translateZ[key]
        newUtilities[`.translate-z-${key}`] = {
          '--translate-z': value,
        }
      }
      addUtilities(newUtilities, ['hover', 'focus'])
    }
  ],
}
