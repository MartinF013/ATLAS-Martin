const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addBase, theme }) {
  addBase({
    "html, body, #app": {
      position: "relative",
      fontFamily: theme("fontFamily.helvetica_neue_light"),
      fontStyle: "normal",
      color: theme("colors.royal.500"),
      padding: "0",
      margin: "0",
      minHeight: "100vh",
      height: "100%",
      minWidth: "350px",
      "@apply bg-light_gray": {},
    },
    ".v-enter-active, .v-leave-active": {
      transition: "opacity 0.5s ease",
    },
    ".v-enter-from, .v-leave-to": {
      opacity: "0",
    },
  });
});
