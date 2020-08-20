function px(pixels) {
  return `${pixels / 16}rem`;
}

module.exports = {
  theme: {
    screens: {
      xs: "375px",
      smm: "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },

    fontSize: {
      xs: px(12),
      "sm-": px(13),
      sm: px(14),
      base: px(16),
      "lg-": px(17),
      lg: px(18),
      lgg: px(19),
      xl: px(20),
      "1-5xl": px(22),
      "2xl": px(24),
      "2-5xl": px(27),
      "3xl": px(30),
      "4xl": px(36),
      "4-5xl": px(42),
      "5xl": px(48),
      "6xl": px(64),
      "7xl": px(80),
      "8xl": px(96),
    },

    extend: {
      backgroundImage: {
        none: "none",
      },
      borderWidth: {
        "3": "3px",
      },
      fontFamily: {
        sans: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
      },
      spacing: {
        "escape-xl": "calc((100vw -528px)/2)",
      },
      lineHeight: {
        tighter: "1.15",
      },
      maxWidth: {
        measure: "34em",
        "7xl": "80rem",
      },
      width: {
        28: "7rem",
        36: "9rem",
      },
      letterSpacing: {
        "tight-": "-0.0125em",
      },
      height: {
        11: "2.75rem",
        28: "7rem",
        36: "9rem",
      },
      colors: {
        "black.85": "rgba(0,0,0,0.85)",
        gray: {
          // Cool, but less cool than default: https://hihayk.github.io/scale/#4/4/82/91/0/0/-19/-5/a6afb9/166/175/185
          // "100": "#F7F8F9",
          // "200": "#E3E6E8",
          // "300": "#CFD3D8",
          // "400": "#BBC1C9",
          // "500": "#A6AFB9",
          // "600": "#848B93",
          // "700": "#62676D",
          // "800": "#404347",
          // "900": "#1E2021",

          // Another (darker darks): https://hihayk.github.io/scale/#4/4/91/91/0/0/-19/-5/a6afb9/166/175/185
          // But swapped 900 with above
          "100": "#F7F8F9",
          "200": "#E3E6E8",
          "300": "#CFD3D8",
          "400": "#BBC1C9",
          "500": "#A6AFB9",
          "600": "#80878F",
          "700": "#5B5F65",
          "800": "#35383B",
          "900": "#1E2021",
        },
      },
    },
  },

  corePlugins: {
    fontSize: false, // fonts added below
  },

  plugins: [
    function ({ addUtilities, theme }) {
      const fontSizes = theme("fontSize", {});

      Object.keys(fontSizes).forEach((key) => {
        let fontSize = fontSizes[key];
        let pixels = +fontSize.replace("rem", "") * 16;
        let tracking = -0.0223 + 0.185 * Math.exp(-0.1745 * pixels);

        addUtilities(
          {
            [`.text-${key}`]: {
              "font-size": fontSize,
              "letter-spacing": `${tracking}rem`,
            },
          },
          ["responsive"]
        );
      });
    },
  ],
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
