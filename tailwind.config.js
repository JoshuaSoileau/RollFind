module.exports = {
  purge: ["./src/**/*.js"],
  theme: {
    extend: {
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
    display: ["responsive", "empty"],
    opacity: [
      "responsive",
      "group-hover",
      "focus-within",
      "hover",
      "focus",
      "empty",
    ],
  },
  plugins: [
    require("tailwindcss-empty")(),
    require("tailwindcss-truncate-multiline")(),
  ],
};
