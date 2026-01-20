/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        lg: "1140px",
        xl: "1320px",
      },
      screens: {
        xs: "380px", // Extra small devices
        sm: "576px", // Small devices
        md: "768px", // Medium devices
        lg: "1224px", // Large devices
        xl: "1320px", // Extra large devices
        "2xl": "3080px", // Extra large devices
      },
      colors: {
        theme: "#8F8933", // Website Theme Color
        primary: "#3C3C3B", // Text Like black
        secondary: "#fff", // text White
        tertiary: "#6d6c74",
        quaternary : "#F4F4F5",
        static : "#1A1A34",
        themeDeep : "#978C21",
        lightThemeBg : "#E5F2FF", // for light theme background color
        buttonHover :"#e89405",
        borderColor : "#CCCCCC",
        skeletonLoading : "#cbd5e1"
      },
      padding: {
        'sectionSm': '60px',
        'sectionMd': '60px',
        'sectionLg': '80px',
      },
      fontFamily: {
        primary: ["Montserrat", "sans-serif"],
        secondary: ["DM Sans", "sans-serif"],
      },
      keyframes: {
        "bounce-top": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "bounce-left": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-15px)" },
        },
         rotateCircle: {
      '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
      '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
    },
    shrink: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0)', opacity: '0' },
        },
        grow: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },

         spread: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '70%': { opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shrinking: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0)', opacity: '0' },
        }
      },
      animation: {
        "bounce-top": "bounce-top 4s ease-in-out infinite",
        "bounce-left": "bounce-left 6s ease-in-out infinite",
         'circle-spin': 'rotateCircle 10s linear infinite',
          'shrink': 'shrink 1s forwards ease-in-out',
        'grow': 'grow 1s forwards ease-in-out',
        'spread': 'spread 0.4s ease-out forwards',
        'shrinking': 'shrink 0.4s ease-in forwards',
      },
      boxShadow: {
        primary: "0px 0px 3px 0px ", // Add your custom shadow here
      },
  
    },
  },
  plugins: [],
}