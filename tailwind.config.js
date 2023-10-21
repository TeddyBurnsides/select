/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx,js,jsx}"],
  theme: {
    extend: {
		minWidth: {
			36: "9rem",
			40: "10rem"
		}
	},
  },
  plugins: [],
}