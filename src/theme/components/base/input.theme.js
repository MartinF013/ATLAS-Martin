const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addComponents, theme }) {
  addComponents({
    ".field": {
      position: "relative",
      display: "flex",
      height: "4rem",
      width: "100%",
      ".error": {
        borderColor: theme("colors.red.300"),
        "&:focus": {
          borderColor: theme("colors.red.500"),
        },
      },
      input: {
        "@apply absolute left-0 top-0 w-full h-12 py-2 px-3": {},
        "@apply border-[0.5px] border-navy-500 rounded bg-light_gray shadow-md":
          {},
        "@apply text-base font-normal": {},
        "&:focus": {
          outline: "2px solid transparent",
          outlineOffset: "2px",
          "@apply py-2 px-3 border-[2px] border-royal-500 rounded": {},
        },
        "&:focus + label, &:not(:placeholder-shown) + label": {
          transform: `translate(-1px, -1.3rem) scale(0.9, 0.9)`,
          "@apply text-xs font-normal": {},
        },
        "&:disabled": {
          "@apply text-dark-gray-500 bg-dark-gray-100 cursor-no-drop": {},
          "& + label": {
            color: theme("colors.dark.gray.900"),
            backgroundColor: theme("colors.transparent"),
          },
        },
      },
      label: {
        "@apply absolute left-[10px] top-[13px] py-0 px-1": {},
        "@apply bg-light_gray text-sm font-normal": {},
      },
      "label, input": {
        transition: "all 150ms ease-in-out",
      },
      ".visible": {
        position: "absolute",
        bottom: "-3px",
        left: "10px",
        fontSize: "0.75rem",
        lineHeight: "1rem",
        color: theme("colors.red.500"),
        transition: "all 150ms ease-in-out",
      },
      ".check-good": {
        position: "absolute",
        right: "10px",
        top: "10px",
        width: "30px",
        height: "30px",
        backgroundImage: theme("backgroundImage.check"),
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "all 150ms ease-in-out",
      },
      ".check-bad": {
        position: "absolute",
        right: "10px",
        top: "15px",
        width: "20px",
        height: "20px",
        backgroundImage: theme("backgroundImage.bad"),
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "all 150ms ease-in-out",
      },
    },
  });
});
