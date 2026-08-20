// Tailwind 4 entra pelo PostCSS; não há tailwind.config.js — a configuração vive no CSS,
// no bloco `@theme` de src/styles/globals.css.
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
