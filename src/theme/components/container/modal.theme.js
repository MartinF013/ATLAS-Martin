const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addComponents, theme }) {
  addComponents({
    ".modal": {
      "@apply fixed z-[99999] top-0 left-0 w-full h-full": {},
      "@apply bg-dark-gray-200/40 flex justify-center items-center": {},
      ".modal__container": {
        "@apply w-full sm:w-[450px] h-full sm:h-auto sm:m-auto": {},
        "@apply flex flex-col bg-light_gray shadow-lg rounded": {},
        ".modal__container--header": {
          "@apply relative h-20 border-b-2 border-navy-500 rounded-t": {},
          "@apply flex flex-row items-center": {},
          img: {
            "@apply h-full p-3": {},
          },
          button: {
            "@apply absolute right-5 top-3 bg-navy-500 hover:bg-sky-500 transition ease-in-out duration-300 rounded-3xl":
              {},
          },
        },
        ".modal__container--body": {
          "@apply p-5 flex flex-col gap-3": {},
          button: {
            "@apply bg-navy-500 hover:bg-sky-500 transition ease-in-out duration-300 rounded mx-[20%] shadow hover:shadow-lg":
              {},
          },
        },
      },
      ".modal__message": {
        "@apply flex flex-col items-center w-[330px] h-auto m-auto p-5": {},
        "@apply bg-light_gray rounded-md": {},
        transition: "all 0.3s ease",
        p: {
          padding: "20px 0",
        },
        button: {
          "@apply w-[50%] rounded": {},
        },
      },
    },
  });
});

// const plugin = require("tailwindcss/plugin");

// module.exports = plugin(function ({ addComponents, theme }) {
//   addComponents({
//     ".modal": {
//       position: "fixed",
//       display: "flex",
//       zIndex: "9998",
//       top: "0",
//       left: "0",
//       width: "100%",
//       height: "100%",
//       backgroundColor: theme("colors.gradient.black"),
//       transition: "opacity 0.3s ease",
//       ".modal-container": {
//         width: "450px",
//         margin: "auto",
//         backgroundColor: theme("colors.white"),
//         borderRadius: "20px",
//         transition: "all 0.3s ease",
//         "@media (max-width: 850px)": {
//           width: "60%",
//         },
//         "@media (max-width: 545px)": {
//           width: "100%",
//           margin: "0",
//         },
//         ".modal-header": {
//           height: "7rem",
//           cursor: "pointer",
//           color: theme("colors.white"),
//           backgroundColor: theme("colors.gray.500"),
//           borderTopLeftRadius: "1rem" /* 16px */,
//           borderTopRightRadius: "1rem" /* 16px */,
//           display: "flex",
//           flexDirection: "column",
//           position: "relative",
//           ".modal-header__img": {
//             width: "6rem",
//             height: "6rem",
//             margin: "auto",
//           },
//           ".modal-header__button": {
//             position: "absolute",
//             right: "5px",
//             zIndex: "1",
//             top: "5px",
//             width: "30px",
//             height: "30px",
//             "&:hover": {
//               backgroundColor: theme("colors.gray.700"),
//             },
//           },
//         },
//         ".modal-body": {
//           margin: "20px 20px",
//         },
//         ".modal-footer": {
//           margin: "20px 25%",
//         },
//       },
//       ".modal__consult": {
//         width: "100%",
//         height: "100%",
//         backgroundColor: theme("colors.white"),
//         padding: "20px",
//         margin: "auto",
//         borderRadius: "20px",
//         transition: "all 0.3s ease",
//         overflowY: "scroll",
//         "&::-webkit-scrollbar": {
//           display: "initial",
//           width: "5px",
//           height: "5px",
//           borderRadius: "5px",
//           backgroundColor: theme("colors.blue.100"),
//         },
//         "&::-webkit-scrollbar-thumb": {
//           borderRadius: "5px",
//           backgroundColor: theme("colors.blue.300"),
//         },
//         h3: {
//           fontSize: "1.125rem" /* 24px */,
//           lineHeight: "1.75rem" /* 32px */,
//           fontWeight: "500",
//           margin: "10px 0",
//         },
//         ".consult--header": {
//           display: "flex",
//           height: "auto",
//           justifyContent: "space-between",
//           svg: {
//             height: "20px",
//             width: "20px",
//           },
//         },
//         ".consult--form": {
//           display: "grid",
//           gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
//           gap: "1.25rem" /* 20px */,
//           ".error > .v3ti-content > .v3ti-new-tag": {
//             borderColor: `${theme("colors.red.500")} !important`,
//           },
//           ".consult-form__tags, .v3ti": {
//             position: "relative",
//             width: "100%",
//             padding: "60px 5px 10px 5px",
//             border: "none",
//             boxShadow: "none",

//             "&:focus + label, &:not(:placeholder-shown) + label": {
//               transform: `translate(-1px, -1.3rem) scale(0.9, 0.9)`,
//               fontWeight: "400",
//               fontSize: "12px",
//               lineHeight: "16px",
//             },
//             ".v3ti-content": {
//               height: "auto",
//               maxHeight: "48px",
//               overflowX: "hidden",
//               overflowY: "scroll",
//               ".v3ti-tag": {
//                 fontSize: "0.75rem" /* 12px */,
//                 lineHeight: "1rem" /* 16px */,
//                 background: theme("colors.blue.300"),
//               },
//               ".v3ti-new-tag": {
//                 position: "absolute",
//                 padding: "8px 12px",
//                 left: "0px",
//                 top: "0px",
//                 margin: "0",
//                 height: "48px",
//                 border: `0.5px solid ${theme("colors.gray.500")}`,
//                 "&:focus": {
//                   outline: "2px solid transparent",
//                   outlineOffset: "2px",
//                   padding: "8px 15px",
//                   border: "2px solid",
//                   borderRadius: "4px",
//                   borderColor: theme("colors.blue.300"),
//                 },
//               },
//               "&::-webkit-scrollbar": {
//                 display: "none",
//                 width: "5px",
//                 height: "5px",
//                 borderRadius: "5px",
//                 backgroundColor: theme("colors.blue.100"),
//               },
//               "&:hover::-webkit-scrollbar": {
//                 display: "initial",
//               },
//               "&::-webkit-scrollbar-thumb": {
//                 borderRadius: "5px",
//                 backgroundColor: theme("colors.blue.300"),
//               },
//             },
//           },
//           ".consult--form__buttons": {
//             gridColumn: "1 / span 1",
//             marginTop: "20px",
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             button: {
//               width: "45%",
//             },
//             ".buttons__clean": {
//               backgroundColor: theme("colors.red.300"),
//               "&:hover": {
//                 backgroundColor: theme("colors.red.500"),
//               },
//             },
//             ".buttons__succes": {
//               backgroundColor: theme("colors.green.300"),
//             },
//           },
//         },
//         "@media (min-width: 1200px)": {
//           width: "70%",
//         },
//         /* Tablets en horizonal y escritorios normales */
//         "@media (min-width: 1024px) and (max-width: 1200px)": {
//           width: "80%",
//         },
//         "@media (min-width: 768px) and (max-width: 1024px)": {
//           width: "90%",
//         },
//         // "@media (min-width: 640px) and (max-width: 768px)": {
//         // width: '100%',
//         // },
//         "@media (min-width: 640px)": {
//           height: "auto",
//           overflowY: "hidden",
//           h3: {
//             fontSize: "0.875rem" /* 20px */,
//             lineHeight: "1.25rem" /* 28px */,
//           },
//           ".consult--form": {
//             gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
//             ".consult--form__buttons": {
//               gridColumn: "2 / span 1",
//             },
//           },
//         },
//       },
//       ".modal__message": {
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         width: "330px",
//         margin: "auto",
//         padding: "20px",
//         backgroundColor: theme("colors.white"),
//         borderRadius: "20px",
//         transition: "all 0.3s ease",
//         height: "auto",
//         p: {
//           padding: "20px 0",
//         },
//         button: {
//           width: "50%",
//         },
//       },
//     },
//   });
// });
