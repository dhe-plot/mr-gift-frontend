module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom backdrop blur utilities with vendor prefixes
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
    },
  },
  plugins: [
    // Custom plugin to add vendor prefixes for compatibility
    function({ addUtilities }) {
      const newUtilities = {
        // Backdrop filter utilities with vendor prefixes
        '.backdrop-blur-none': {
          '-webkit-backdrop-filter': 'none',
          'backdrop-filter': 'none',
        },
        '.backdrop-blur-sm': {
          '-webkit-backdrop-filter': 'blur(4px)',
          'backdrop-filter': 'blur(4px)',
        },
        '.backdrop-blur': {
          '-webkit-backdrop-filter': 'blur(8px)',
          'backdrop-filter': 'blur(8px)',
        },
        '.backdrop-blur-md': {
          '-webkit-backdrop-filter': 'blur(12px)',
          'backdrop-filter': 'blur(12px)',
        },
        '.backdrop-blur-lg': {
          '-webkit-backdrop-filter': 'blur(16px)',
          'backdrop-filter': 'blur(16px)',
        },
        '.backdrop-blur-xl': {
          '-webkit-backdrop-filter': 'blur(24px)',
          'backdrop-filter': 'blur(24px)',
        },
        // User select utilities with vendor prefixes
        '.select-none': {
          '-webkit-user-select': 'none',
          '-moz-user-select': 'none',
          '-ms-user-select': 'none',
          'user-select': 'none',
        },
        '.select-text': {
          '-webkit-user-select': 'text',
          '-moz-user-select': 'text',
          '-ms-user-select': 'text',
          'user-select': 'text',
        },
        '.select-all': {
          '-webkit-user-select': 'all',
          '-moz-user-select': 'all',
          '-ms-user-select': 'all',
          'user-select': 'all',
        },
      }

      addUtilities(newUtilities)
    }
  ],
}
