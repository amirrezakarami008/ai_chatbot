// tailwind.config.mjs
export default {
    content: [
      "./app/**/*.{js,jsx}",
      "./components/**/*.{js,jsx}",
    ],
    theme: {
      extend: {
        screens: {
          smMd: { min: "640px", max: "1080px" },
        },
      },
    },
    plugins: [],
  };
  