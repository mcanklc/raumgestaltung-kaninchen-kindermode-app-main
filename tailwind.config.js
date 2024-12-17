const generateColorClass = (variable) => {
  return ({ opacityValue }) => {
    return opacityValue !== undefined
      ? `rgba(var(${variable}), ${opacityValue})`
      : `rgb(var(${variable}))`;
  };
};

export default {
  corePlugins: {
    container: false,
  },
  content: [
    "./components/**/*.{vue,js,jsx,ts,tsx}",
    "./pages/**/*.{vue,js,jsx,ts,tsx}",
    "./formkit.config.ts",
    "./node_modules/@jrvs-de//**/*.{vue,js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      tablet: "768px",
      desktop: "1280px",
    },
    fontFamily: {
      display: ["'Baloo 2'", "cursive"],
      body: ["Open Sans", "sans-serif"],
    },
    extend: {
      colors: {
        bg: {
          primary: generateColorClass("--bg-primary"),
          secondary: generateColorClass("--bg-secondary"),
          tertiary: generateColorClass("--bg-tertiary"),
        },
        contrast: {
          primary: generateColorClass("--contrast-primary"),
          secondary: generateColorClass("--contrast-secondary"),
          tertiary: generateColorClass("--contrast-tertiary"),
        },
        ci: {
          primary: {
            DEFAULT: generateColorClass("--ci-primary"),
            hover: generateColorClass("--ci-primary-hover"),
            active: generateColorClass("--ci-primary-active"),
            contrast: generateColorClass("--ci-primary-contrast"),
          },
          secondary: generateColorClass("--ci-secondary"),
          basket: {
            DEFAULT: generateColorClass("--ci-basket"),
            hover: generateColorClass("--ci-basket-hover"),
            active: generateColorClass("--ci-basket-active"),
            contrast: generateColorClass("--ci-basket-contrast"),
          },
        },
      },
      aspectRatio: {
        "3/4": "3 / 4",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          margin: "0 auto",
          padding: "0 1rem",
          "@screen desktop": {
            maxWidth: "1280px",
          },
        },
      });
    },
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
