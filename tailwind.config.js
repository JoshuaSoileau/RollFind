const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        "2xs": ["0.7rem", ".85rem"],
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
    },
    truncate: {
      lines: {
        3: "3",
        5: "5",
        8: "8",
      },
    },
  },
  variants: {
    extend: {
      display: ["empty"],
      margin: ["first", "last"],
      opacity: ["empty"],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-empty")(),
    require("tailwindcss-truncate-multiline")(),
  ],
};
