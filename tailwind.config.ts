import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Scan folder app
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Scan folder components
    "./ui/**/*.{js,ts,jsx,tsx,mdx}", // Scan folder ui (jika ada di root)
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Scan folder src (jika pakai src)
  ],
  darkMode: 'class', // PENTING: Untuk fitur dark mode manual kita
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;