const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addComponents, theme }) {
  addComponents({
    ".home": {
      "@apply h-[calc(100vh-50px)] grid grid-cols-1 sm:grid-cols-2 md:mx-[5%] md:mx-[15%]":
        {},
      "@apply bg-light_gray": {},
      ".home__image": {
        // "@apply ": {},
        "@apply h-full hidden sm:flex flex-col justify-center items-center": {},
      },
      ".home__body": {
        "@apply h-full px-5 text-dark-gray-400": {},
        "@apply flex flex-col justify-center items-start gap-4": {},
        ".home__body--title": {
          "@apply text-xl font-medium": {},
        },
        ".home__body--content": {
          "@apply text-justify": {},
        },
        ".home__body--button": {
          "@apply w-full grid grid-cols-2": {},
          button: {
            "@apply col-start-2 h-10 w-full rounded": {},
            "@apply bg-navy-500 hover:bg-sky-500 transition ease-in-out duration-300":
              {},
            "@apply text-light_gray font-semibold": {},
          },
        },
      },
    },
  });
});
