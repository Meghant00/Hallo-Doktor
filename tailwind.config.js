module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: { active: "#00ff00" },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
