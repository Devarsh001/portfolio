module.exports = {
  content: [
    "./*.html",
    "./projects/**/*.html",
    "./src/**/*.{js,html}"
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          'bg': '#faf9f6',      // Off-white / Cream
          'text': '#1c1917',    // Deep charcoal
          'accent': '#9c7b64',  // Muted terracotta/earthy tone
          'border': '#e5e3de'   // Soft gray for borders
        }
      },
      fontFamily: {
        'display': ['"Playfair Display"', 'serif'],
        'sans': ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}