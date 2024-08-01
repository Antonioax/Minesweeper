module.exports = {
  scripts: {
    "build:css": "postcss css/styles.css -o css/tailwind.css",
    "watch:css": "postcss css/styles.css -o css/tailwind.css --watch",
  },
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
