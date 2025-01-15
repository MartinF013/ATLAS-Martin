/** @type {import('tailwindcss').Config} */
import baseTheme from "./src/theme/base/base.theme.js";
import esriTheme from "./src/theme/base/esri.theme.js";
import imageTheme from "./src/theme/base/image.theme.js";
import bannerTheme from "./src/theme/components/container/banner.theme.js";
import fileTheme from "./src/theme/components/container/file.theme.js";
import modalTheme from "./src/theme/components/container/modal.theme.js";
import storyTheme from "./src/theme/components/container/story.theme.js";
import widgetTheme from "./src/theme/components/container/widget.theme.js";
import inputTheme from "./src/theme/components/base/input.theme.js";
import selectTheme from "./src/theme/components/base/select.theme.js";
import homeTheme from "./src/theme/components/views/home.theme.js";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      dark: {
        gray: {
          500: "#2D2E2D",
          400: "#474847",
          300: "#626262",
          200: "#969696",
          100: "#CACBCA",
        },
      },
      blue: {
        100: "#407190",
        200: "#20597E",
        300: "#00416B",
        400: "#00395E",
        500: "#003150",
        light: {
          300: "#DFE7EC",
          400: "#BFD0DA",
          500: "#9FB8C7",
        },
      },
      gray: {
        100: "#BEC2C6",
        200: "#ADB3B7",
        300: "#9DA4A9",
        400: "#8C949A",
        500: "#7C858C",
        600: "#6D747B",
        700: "#5D6469",
        800: "#4E5358",
        900: "#3E4346",
        1000: "#2E3235",
      },
      golden: {
        500: "#E7AA4C",
        400: "#EAB562",
        300: "#EDBF79",
        200: "#F0CA8F",
        100: "#F6DFBC",
      },
      gradient:
        "conic-gradient(from 106.8deg at 32.33% 67.33%, rgba(42, 170, 225, 0.24) -52.37deg, rgba(231, 170, 76, 0.69) 41.88deg, rgba(231, 170, 76, 0.92) 112.78deg, rgba(231, 170, 76, 0.72) 173.26deg, rgba(42, 170, 225, 0.24) 307.63deg, rgba(231, 170, 76, 0.69) 401.88deg), linear-gradient(270deg, rgba(47, 75, 144, 0.5) 0%, rgba(42, 170, 225, 0.5) 49.27%)",
      light_gray: "#F1F2F2",
      //light_gray: "#F15D3C",
      navy: {
        500: "#2D2E64",
        400: "#474877",
        300: "#62628B",
        200: "#9696B2",
        100: "#CACBD8",
      },
      red: {
        100: "#C74652",
        200: "#C02F3C",
        300: "#BA1927",
        400: "#A71623",
        500: "#94141F",
      },
      royal: {
        500: "#2F4B90",
        400: "#49629E",
        300: "#6378AC",
        200: "#7D8FBA",
        100: "#B1BCD5",
      },
      sky: {
        500: "#2AAAE1",
        400: "#45B5E5",
        300: "#5FBFE8",
        200: "#95D4F0",
        100: "#CAEAF7",
      },
      white: "#FFFFFF",
    },
    fontFamily:  {
      helvetica_neue_regular: ["'HelveticaNeueRegular', sans-serif"],
      helvetica_neue_light: ["'HelveticaNeueLight', sans-serif"],
      nutmeg: ["'Nutmeg', regular"],
    },
    extend: {
      backgroundImage: {
        arrow_long_right: "url('@/assets/icons/arrow-long-right.svg')",
        buffer: "url('@/assets/icons/buffer.svg')",
        chevron_down_white: 'url("@/assets/icons/chevron-down-white.svg")',
        chevron_up_white: 'url("@/assets/icons/chevron-up-white.svg")',
        disk: "url('@/assets/icons/disk.svg')",
        layer: "url('@/assets/icons/layer.svg')",
        line_bar: "url('@/assets/icons/line_bar.svg')",
        line_bar_public: "url('@/assets/icons/line_bar_public.svg')",
        line_bar_private: "url('@/assets/icons/line_bar_private.svg')",
        play: "url('@/assets/icons/play.svg')",
        reload: "url('@/assets/icons/reload.svg')",
        x_mark: "url('@/assets/icons/x_mark.svg')",
      },
      height: {
        '110': '110%',
        '120': '120%',
        '130': '130%',
        '140': '140%',
        '150': '150%',
      },
    },
  },
  plugins: [
    baseTheme,
    esriTheme,
    imageTheme,
    bannerTheme,
    fileTheme,
    modalTheme,
    storyTheme,
    widgetTheme,
    inputTheme,
    selectTheme,
    homeTheme,
  ],
};
