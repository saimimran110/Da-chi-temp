/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JS/TS/React files in the src folder
    "./public/index.html",        // Include the HTML file if needed
    "./node_modules/@components/**/*.{js,jsx,ts,tsx}", // Add custom component paths if applicable
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8", // Example: Add a primary color
        secondary: "#9333EA", // Example: Add a secondary color
      },
      spacing: {
        128: "32rem", // Example: Add custom spacing
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Add Tailwind CSS forms plugin
    require('@tailwindcss/typography'), // Add Tailwind CSS typography plugin
  ],
};