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
    extend: {
      borderWidth: {
        "3": "3px",
      },
      fontFamily: {
        // sans: `Inter`,
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
      fontSize: {
        "sm-": "0.8125rem", // 13 px
        "lg-": "1.0625rem", // 17 px
        lgg: "1.1875rem", // 19 px
        "1-5xl": "1.375rem", // 22 px
        "2-5xl": "1.6875rem",
        "4-5xl": "2.625rem",
        "7xl": "5rem",
        "8xl": "6rem",
      },
      height: {
        11: "2.75rem",
        28: "7rem",
        36: "9rem",
      },
      colors: {
        gray: {
          // Default
          // "100": "#F7FAFC",
          // "200": "#EDF2F7",
          // "300": "#E2E8F0",
          // "400": "#CBD5E0",
          // "500": "#A0AEC0",
          // "600": "#718096",
          // "700": "#4A5568",
          // "800": "#2D3748",
          // "900": "#1A202C0",

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

          // Warm: https://hihayk.github.io/scale/#4/4/82/91/0/0/0/0/bdbcb7/189/188/183
          // "100": "#F9F9F9",
          // "200": "#EAEAE8",
          // "300": "#DBDBD8",
          // "400": "#CCCBC7",
          // "500": "#BDBCB7",
          // "600": "#969692",
          // "700": "#706F6C",
          // "800": "#494847",
          // "900": "#222221",

          // Warm
          // "100": "#FAF9F7",
          // "200": "#E8E6E1",
          // "300": "#D3CEC4",
          // "400": "#B8B2A7",
          // "500": "#A39E93",
          // "600": "#857F72",
          // "700": "#625D52",
          // "800": "#504A40",
          // "900": "#423D33",
          // "1000": "#27241D",
          // Neutral
          // "100": "#f5f5f5",
          // "200": "#eeeeee",
          // "300": "#e0e0e0",
          // "400": "#bdbdbd",
          // "500": "#9e9e9e",
          // "600": "#757575",
          // "700": "#616161",
          // "800": "#424242",
          // "900": "#212121",
          // Cool
          // "100": "#F5F7FA",
          // "200": "#E4E7EB",
          // "300": "#CBD2D9",
          // "400": "#9AA5B1",
          // "500": "#7B8794",
          // "600": "#616E7C",
          // "700": "#52606D",
          // "800": "#3E4C59",
          // // "900": "#323F4B",
          // "900": "#1F2933",
        },
      },
    },
  },

  corePlugins: {
    fontSize: false, // fonts added below
  },

  plugins: [
    function({ addUtilities, theme }) {
      const fontSizes = theme("fontSize", {})

      Object.keys(fontSizes).forEach(key => {
        let fontSize = fontSizes[key]
        let pixels = +fontSize.replace("rem", "") * 16
        let tracking = -0.0223 + 0.185 * Math.exp(-0.1745 * pixels)

        addUtilities(
          {
            [`.text-${key}`]: {
              "font-size": fontSize,
              "letter-spacing": `${tracking}rem`,
            },
          },
          ["responsive"]
        )
      })
    },
  ],
}
