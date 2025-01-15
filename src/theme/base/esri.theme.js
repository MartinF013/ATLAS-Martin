const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addBase, theme }) {
  addBase({
    ".esri-ui-corner .esri-component": {
      "@apply bg-navy-500 text-royal-500 rounded-2xl border border-navy-500":
        {},
      ".esri-popup__button": {
        color: theme("colors.royal.500"),
        "&:hover": {
          backgroundColor: theme("colors.navy.500"),
          borderRadius: "15px",
        },
      },
    },
    ".esri-popup__main-container": {
      "@apply mr-10 mb-10 bg-light_gray text-royal-500 rounded-2xl": {},
    },
    ".esri-popup__button, .esri-popup__header-container--button": {
      color: theme("colors.royal.500"),
      "&:hover": {
        backgroundColor: theme("colors.navy.500"),
        borderRadius: "15px",
      },
    },
    ".esri-popup__navigation": {
      backgroundColor: theme("colors.navy.500"),
    },
    ".esri-popup--feature-menu-open .esri-popup__feature-menu-button": {
      "@apply bg-light_gray text-navy-500": {},
    },
    "[class*=esri-popup--is-docked-bottom-].esri-popup--is-docked .esri-popup__feature-menu":
      {
        "@apply bg-light_gray text-sm font-medium text-navy-500 border-t-8": {},
      },
    ".esri-popup--feature-menu-open .esri-popup__feature-menu-header": {
      "@apply bg-light_gray text-sm font-medium text-navy-500 border-t-8": {},
    },
    ".esri-popup__footer": {
      "@apply bg-light_gray text-sm font-medium text-navy-500": {},
    },
    ".esri-widget": {
      "@apply bg-light_gray": {},
      ".esri-sketch__panel": {
        "@apply flex justify-center": {},
      },
      ".esri-sketch__info-panel": {
        "@apply hidden": {},
      },
    },
    "h2.esri-widget__heading": {
      color: theme("colors.royal.500"),
    },
    ".esri-widget--button": {
      borderRadius: "15px",
      backgroundColor: `${theme("colors.navy.500")} !important`,
      "&:hover": {
        backgroundColor: `${theme("colors.sky.500")} !important`,
      },
      "&:hover": {
        backgroundColor: `${theme("colors.sky.500")} !important`,
      },
      "&:hover > span": {
        color: `${theme("colors.dark.gray.500")}`,
      },
      "& > span": {
        color: theme("colors.light_gray"),
        fontWeight: "400",
      },
    },

    ".esri-search__sources-button [class^=esri-icon-], .esri-search__sources-button .esri-building-level-picker__arrow-up, .esri-search__sources-button .esri-building-level-picker__arrow-down, .esri-search__sources-button .esri-building-phase-picker__arrow-left, .esri-search__sources-button .esri-building-phase-picker__arrow-right ":
      {
        color: theme("colors.light_gray"),
      },
    "[class^=esri-icon-], .esri-building-phase-picker__arrow-left, .esri-building-phase-picker__arrow-right, .esri-building-level-picker__arrow-up, .esri-building-level-picker__arrow-down":
      {
        color: theme("colors.light_gray"),
      },
    ".esri-search--multiple-sources .esri-search__input": {
      outline: "none !important",
    },
    ".esri-view .esri-view-surface--inset-outline:focus::after": {
      outline: "none !important",
    },
    ".esri-view-width-greater-than-xsmall .esri-expand--auto .esri-expand__content":
      {
        bottom: "40px",
        right: "0px",
        "@media (max-width: 725px)": {
          bottom: "0px",
          top: "0px",
          right: "35px",
        },
      },
    ".esri-layer-list__item": {
      fontWeight: "500",
      backgroundColor: theme("colors.navy.500"),
      boxShadow: theme("boxShadow.md"),
      borderRadius: "10px",
      "&:hover": {
        boxShadow: theme("boxShadow.lg"),
      },
      "&-container": {
        ".esri-layer-list__item": {
          "&&-label": {
            span: {
              color: theme("colors.dark.gray.500"),
            },
          },
        },
      },
    },
    "[class^=esri-icon-]": {
      color: theme("colors.dark.gray.500"),
    },
    ".esri-expand__content .esri-widget": {
      backgroundColor: theme("colors.light_gray"),
      borderRadius: "5px",
      "& > ul > li": {
        "& > div": {
          color: theme("colors.dark.gray.500"),
        },
        backgroundColor: theme("colors.light_gray"),
        "&:hover": {
          backgroundColor: theme("colors.light_gray"),
        },
      },
      "&::-webkit-scrollbar": {
        display: "initial",
        width: "5px",
        height: "5px",
        backgroundColor: theme("colors.dark.gray.100"),
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: "5px",
        backgroundColor: theme("colors.navy.500"),
      },
    },
    ".esri-basemap-gallery__item": {
      "&:hover": {
        borderInlineStartColor: `${theme("colors.sky.500")} !important`,
      },
    },
    ".esri-layer-list__item-actions-menu-item": {
      borderRadius: "3px",
      padding: "3px",
      "&--active:hover": {
        backgroundColor: theme("colors.dark.gray.100"),
      },
      "&:first-of-type": {
        "& > span": {
          color: theme("colors.dark.gray.500"),
        },
      },
      "&:hover": {
        backgroundColor: `${theme("colors.sky.100")} !important`,
      },
      ".esri-layer-list__item-action-icon": {
        color: `${theme("colors.dark.gray.500")} !important`,
      },
    },
    // ".esri-layer-list__item--selectable .esri-layer-list__item-container:hover":
    //   {
    //     borderLeftColor: `${theme("colors.sky.500")} !important`,
    //   },
    ".esri-layer-list__item .esri-layer-list__item--has-children, .esri-layer-list__item-container":
      {
        "@apply bg-light_gray": {},
        borderLeftColor: `${theme("colors.navy.500")} !important`,
        "&:hover": {
          borderLeftColor: `${theme("colors.golden.500")} !important`,
        },
      },
    ".esri-layer-list__item-label": {
      "@apply text-navy-500": {},
      "&:hover": {
        "@apply text-golden-500": {},
        ".esri-layer-list__item-toggle": {
          ".esri-icon-visible": {
            "@apply text-navy-500": {},
            "&:hover": {
              "@apply text-golden-500": {},
            },
          },
        },
      },
    },
    //Responsive Toolbar
    "@media (max-width: 725px)": {
      ".esri-ui-corner": {
        flexDirection: "column !important",
      },
      ".esri-ui-bottom-right": {
        top: "60px",
      },
      ".esri-ui-bottom-right .esri-component": {
        marginBottom: "10px",
      },
    },
  });
});
