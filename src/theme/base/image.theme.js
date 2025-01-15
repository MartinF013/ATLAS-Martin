const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addUtilities, theme }) {
  addUtilities({
    ".icon": {
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center",
      "&_arrow_long_right": {
        backgroundImage: theme("backgroundImage.arrow_long_right"),
      },
      "&_buffer": {
        backgroundImage: theme("backgroundImage.buffer"),
      },
      "&_chevron_down_white": {
        backgroundImage: theme("backgroundImage.chevron_down_white"),
      },
      "&_chevron_up_white": {
        backgroundImage: theme("backgroundImage.chevron_up_white"),
      },
      "&_disk": {
        backgroundImage: theme("backgroundImage.disk"),
      },
      "&_layer": {
        backgroundImage: theme("backgroundImage.layer"),
      },
      "&_play": {
        backgroundImage: theme("backgroundImage.play"),
      },
      "&_reload": {
        backgroundImage: theme("backgroundImage.reload"),
      },
      "&_x_mark": {
        backgroundImage: theme("backgroundImage.x_mark"),
      },
    },
  });
});
