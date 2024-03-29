const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

let makeShadow = (name, rgb) => {
  let obj = {};

  obj[name + "-xs"] = `0 0 0 1px rgba(${rgb}, 0.05)`;
  obj[name + "-xs"] = `0 0 0 1px rgba(${rgb}, 0.05)`;
  obj[name + "-sm"] = `0 1px 2px 0 rgba(${rgb}, 0.05)`;
  obj[name] = `0 1px 3px 0 rgba(${rgb}, 0.1), 0 1px 2px 0 rgba(${rgb}, 0.06)`;
  obj[
    name + "-md"
  ] = `0 4px 6px -1px rgba(${rgb}, 0.1), 0 2px 4px -1px rgba(${rgb}, 0.06)`;
  obj[
    name + "-lg"
  ] = `0 10px 15px -3px rgba(${rgb}, 0.1), 0 4px 6px -2px rgba(${rgb}, 0.05)`;
  obj[
    name + "-xl"
  ] = `0 20px 25px -5px rgba(${rgb}, 0.1), 0 10px 10px -5px rgba(${rgb}, 0.04)`;
  obj[name + "-2xl"] = `0 25px 50px -12px rgba(${rgb}, 0.25)`;
  obj[name + "-inner"] = `inset 0 2px 4px 0 rgba(${rgb}, 0.06)`;
  return obj;
};

module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    extend: {
      boxShadow: (theme) => ({
        xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        default:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        outline: "0 0 0 3px rgba(66, 153, 225, 0.5)",
        none: "none",
        // Build on top of our existing colors
        ...Object.entries(theme("colors"))
          .map(([key, value]) => makeShadow(key, value))
          .reduce((acc, cur) => ({ ...acc, ...cur }), {}),
      }),
      fontFamily: {
        "sans-special": ["Noto Sans", ...defaultTheme.fontFamily.sans],
        sans: ["Varela Round", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        "2xs": ["0.7rem", ".85rem"],
      },
      minWidth: {
        0: "0",
        "1/6": "16.66%",
        "1/4": "25%",
        "3/4": "75%",
        "1/2": "50%",
        "1/3": "33.33%",
        "2/3": "66.66%",
        full: "100%",
      },
      maxWidth: {
        0: "0",
        "1/6": "16.66%",
        "1/4": "25%",
        "3/4": "75%",
        "1/2": "50%",
        "1/3": "33.33%",
        "2/3": "66.66%",
        full: "100%",
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
      margin: ["first", "last", "empty"],
      opacity: ["empty"],
      padding: ["empty"],
      scale: ["active", "group-hover"],
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
