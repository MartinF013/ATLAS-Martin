const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addComponents, theme }) {
  addComponents({
    ".banner": {
      "@apply relative h-[50px] w-full": {},
      ".banner__bg": {
        "@apply w-full h-full": {},
        "@apply bg-no-repeat bg-cover bg-center bg-line_bar": {},
        "@media (max-width: 640px)": {
          display: "none",
        },
      },
      ".banner__bg_public": {
        "@apply w-full h-full": {},
        "@apply bg-no-repeat bg-cover bg-center bg-line_bar_public": {},
        "@media (max-width: 640px)": {
          display: "none",
        },
      },
      ".banner__bg_private": {
        "@apply w-full h-full": {},
        "@apply bg-no-repeat bg-cover bg-center bg-line_bar_private": {},
        "@media (max-width: 640px)": {
          display: "none",
        },
      },
      ".banner__title": {
        "@apply absolute top-0 right-0 h-full w-[200px] p-1": {},
        "@apply flex justify-center items-center font-helvetica_neue_light": {},
        "@apply bg-light_gray text-dark-gray-400 text-lg font-semibold": {},
        borderBottomLeftRadius: "80px",

        "@media (max-width: 640px)": {
          display: "none",
        },
      },
      ".banner__logos": {
        "@apply absolute top-0 left-0 z-[2] w-full h-[50px]": {},
        "@apply bg-light_gray border-b-2 border-navy-500": {},
        ".img": {
          "&__banner": {
            "@apply py-2.5 px-5 h-full": {},
          },
        },
        "@media (min-width: 640px)": {
          "@apply h-[70px] w-60": {},
          "@apply bg-light_gray shadow-xl rounded-br-xl border-r-2": {},
        },
      },
    },
    // footer: {
    //   "@apply absolute bottom-0 left-0 right-0 h-9": {},
    //   "@apply bg-no-repeat bg-cover bg-center bg-line_bar": {},
    // },
  });
});
