/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          "base-300": "#1b2123",
          "base-100": "#1b2123",
          primary: "#2c363a",
          "--btn-text-case": "normal",
          warning: "#751b37"
        }
      }
    ]
  }
};
