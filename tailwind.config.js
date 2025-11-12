export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mincho: ['"Shippori Mincho B1"', "serif"],
        poppins: ['"Poppins"', "sans-serif"],
      },
      colors: {
        mint: "#a8d8d1",
        amber: "#e8b37e",
        night: "#12100d",
      },
    },
  },
  plugins: [],
};
