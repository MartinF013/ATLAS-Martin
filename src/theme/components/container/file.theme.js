const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addComponents, theme }) {
  addComponents({
    ".file-select": {
      "@apply relative h-10 inline-block": {},
      "&::before": {
        "@apply text-navy-500 truncate cursor-pointer": {},
        "@apply border-2 border-navy-500 rounded": {},
        "@apply flex justify-start items-center": {},
        "@apply absolute inset-0 px-2": {},
        content: "attr(data-content)",
      },
      "input[type='file']": {
        opacity: "0",
        "@apply inline-block w-full h-full": {},
      },
      label: {
        "@apply absolute left-[10px] top-[-8px] bg-light_gray": {},
        "@apply font-normal text-xs text-navy-500 py-0 px-1": {},
      },
    },
  });
});
