const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addComponents, theme }) {
  addComponents({
    ".story": {
      "@apply w-full sm:w-[240px] md:w-[270px] lg:w-[300px]  max-[640px]:h-44 z-30":
        {},
      "@apply absolute bottom-0 sm:top-[74px] sm:bottom-[20px] left-0 sm:left-[20px]": {},
      "@apply bg-light_gray rounded-md": {},
      ".story__widget": {
        "@apply w-full h-full relative flex flex-col items-center gap-0": {},
        ".story__widget--up": {
          "@apply h-5 sm:h-7 w-full": {},
          button: {
            "@apply rounded-t-md bg-golden-500 hover:bg-sky-500 transition ease-in-out duration-300 h-full w-full p-0 sm:p-1.5":
              {},
          },
        },
        ".story__widget--content": {
          "@apply h-full w-full py-2 px-2 flex items-start overflow-y-auto": {},
          "&::-webkit-scrollbar": {
            "@apply block w-1.5 h-1 bg-golden-100": {},
          },
          "&::-webkit-scrollbar-thumb": {
            "@apply bg-golden-500": {},
          },
        },
        ".story__widget--down": {
          "@apply h-5 sm:h-7 w-full": {},
          button: {
            "@apply rounded-b-md bg-golden-500 hover:bg-sky-500 transition ease-in-out duration-300 h-full w-full p-0 sm:p-1.5":
              {},
          },
        },
      },
    },
    ".layers": {
      "@apply w-full relative flex flex-col gap-1": {},
      ".layers__tree": {
        "@apply w-full h-auto pr-2": {},
        ".layers__tree--item": {
          "@apply pt-3 pl-[8px] w-max max-w-full flex flex-col gap-1": {},
          label: {
            "@apply h-auto min-h-[20px] relative py-0.5 pr-1.5 pl-1": {},
            "@apply text-sm font-medium": {},
            "@apply flex flex-col justify-start items-start gap-1": {},
            ".item__header": {
              "@apply h-auto min-h-[20px] my-auto w-full": {},
              "@apply flex flex-col items-start gap-1 flex-nowrap": {},
              button: {
                "@apply w-4 h-6 absolute my-auto top-0 left-[-22px] rounded-2xl":
                  {},
                svg: {
                  "@apply w-4 h-4": {},
                },
              },
              span: {
                "@apply text-justify hover:underline pl-2": {},
              },
            },
            ".item__description": {
              "@apply text-xs font-extralight text-justify pl-3 text-dark-gray-500":
                {},
            },
          },
        },
      },
    },
  });
});
