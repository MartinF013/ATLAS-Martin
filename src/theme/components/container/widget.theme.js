const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addComponents, theme }) {
  addComponents({
    ".widget": {
      "@apply w-[300px] bg-white rounded !fixed": {},
      "@apply max-sm:!left-auto max-sm:!top-[calc(100vh-240px)]": {},
      "@apply max-sm:min-w-full max-sm:!h-[-webkit-fill-available]": {},
      ".widget__scrool": {
        "@apply overflow-y-scroll h-[calc(100%-32px)] rounded-b-md": {},
        "&::-webkit-scrollbar": {
          "@apply block w-3 h-1 bg-white": {},
        },
        "&::-webkit-scrollbar-thumb": {
          "@apply bg-blue-300": {},
        },
        "div": {
          "footer": {
            "button":{
              "@apply bg-blue-300 rounded text-white": {}
            }
          }
        }

      },
      ".widget_xy_scrool": {
            "@apply overflow-y-scroll overflow-x-scroll h-[calc(100%-32px)] rounded-b-md": {},  // Agregamos overflow-x-auto
            "&::-webkit-scrollbar": {
              "@apply block w-3 h-1 bg-white": {},
            },
            "&::-webkit-scrollbar-thumb": {
              "@apply bg-blue-300": {},
            },
            "div": {
              "footer": {
                "button": {
                  "@apply bg-blue-300 rounded text-white": {}
                }
              }
            }
        },
      ".widget__content": {
        "@apply p-3 flex flex-col text-xs sm:text-sm": {},
        ".widget__content--element": {
          "@apply flex flex-col mb-4": {},
        },
        ".widget__content--button": {
          "@apply h-[30px] flex flex-row justify-around": {},
          button: {
            "@apply h-full w-[30px] shadow-md": {},
            "@apply bg-gray-500 hover:bg-blue-300": {},
          },
        },
        ".widget__content--table": {
          "@apply h-[100px] overflow-auto": {},
          "&::-webkit-scrollbar": {
            "@apply block w-1 h-1 bg-gray-300": {},
          },
          "&::-webkit-scrollbar-thumb": {
            "@apply bg-blue-300": {},
          },
        },
      },
      ".table-kml": {
        "@apply w-full": {},
        thead: {
          "@apply w-full h-5 sticky left-0 top-0": {},
          "@apply grid grid-cols-3": {},
          "@apply rounded-t-md bg-blue-300 text-sm text-white": {},
          tr: {
            "@apply h-full text-center": {},
          },
        },
        tbody: {
          "@apply h-[60px]": {},
          tr: {
            "@apply h-5 grid grid-cols-3 text-xs": {},
            "@apply border-b-2 border-x-2 border-blue-300": {},
            td: {
              "@apply h-full px-2 truncate": {},
            },
          },
        },
      },
    },
  });
});
