/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        accent:{
          "light": "#F1F2EB",
          "orange": "#FF7853",
        },
        "primary-black": "#0d0f14",
        "primary-red": "#A50F01",
      }

    },
  },
  plugins: [
    import('flowbite/plugin'),
  ],
}
