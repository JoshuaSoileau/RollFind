const plugin = require("tailwindcss/plugin");
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
      spacing: {
        "1/2": "50%",
        "2/3": "66.66%",
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
    require("tailwindcss-truncate-multiline")(),
    plugin(({ addVariant, e }) => {
      addVariant("empty", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.empty${e(separator + className)}:empty`;
        });
      });
    }),
  ],
};
