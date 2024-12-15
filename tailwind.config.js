/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          // regular: "#276dff",
          // light: "#E9F2FF",
          // text: "#2563EB",
          regular: "#267DFF",
          light: "#DAE6FF",
          dark: "#00173A",
        },
        // primary: {
        //   regular: "#60a5fa",
        //   light: "#bfdbfe",
        //   text: "#2563eb",
        // },

        // primary: {
        //   regular: "#0C66E4",
        //   light: "#E9F2FF",
        //   text: "#0C66E4",
        // },
        warning: {
          regular: "#F5CD47",
          light: "#FFF7D680",
        },
        danger: {
          regular: "#C9372C",
          light: "#FFECEB",
        },
        discovery: {
          regular: "#5E4DB2",
          light: "#F3F0FF",
        },
        success: {
          regular: "#1F845A",
          light: "#DCFFF1",
        },
        default: {
          light: "#091E420F",
          dark: "#172B4D",
        },
      },
    },
  },
  plugins: [],
};
