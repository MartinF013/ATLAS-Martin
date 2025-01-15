const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addComponents, theme }) {
  addComponents({
    ".select": {
      "@apply block relative h-16 cursor-pointer": {},
      input: {
        "@apply absolute opacity-0": {},
        "&:checked ~ .error": {
          "@apply border-red-500": {},
        },
        "&:checked ~ .none": {
          "@apply border-royal-500": {},
        },
        "&:checked ~ .header": {
          "@apply border-2": {},
        },
        "&:checked ~ .options": {
          "@apply block overflow-y-scroll z-[2] opacity-100 border-2": {},
          "&::-webkit-scrollbar": {
            "@apply block w-[5px] h-[5px] rounded-[5px] bg-royal-100": {},
          },
          "&::-webkit-scrollbar-thumb": {
            "@apply rounded-[5px] bg-royal-500": {},
          },
        },
      },
      ".header": {
        "@apply grid grid-flow-col grid-cols-1 items-center rounded": {},
        "@apply h-12 py-2 px-2.5 shadow-md": {},
        "@apply rounded border-[0.5px] border-royal-500 bg-light_gray": {},
        "@apply text-sm font-normal": {},
        span: {
          "@apply w-fit bg-light_gray": {},
          transition: "all 150ms ease-in-out",
        },
        "&.invalid": {
          "@apply border-royal-500": {},
        },
      },
      ".options": {
        "@apply absolute hidden left-0 mt-[5px] w-full max-h-[130px] overflow-hidden opacity-0":
          {},
        transition: "all 150ms ease-in-out",
        "@apply bg-light_gray rounded border-[1px]": {},
        "@apply border-royal-500": {},
        li: {
          "@apply p-1.5 h-8": {},
          "&:hover": {
            "@apply bg-dark-gray-100 rounded": {},
          },
        },
      },
      ".disabled": {
        "@apply bg-dark-gray-500 text-royal-500 border-dark-gray-500 cursor-not-allowed":
          {},
        span: {
          "@apply bg-dark-gray-100": {},
          transition: "all 150ms ease-in-out",
        },
      },
      ".error": {
        "@apply border-red-500": {},
      },
      ".none": {
        "@apply border-navy-500": {},
      },
    },
  });
});
