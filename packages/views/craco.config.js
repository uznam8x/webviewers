const CracoAlias = require("craco-alias");
const webpack = require("webpack");
module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "options",
        baseUrl: "./src",
        aliases: {
          "~": ".",
        },
      },
    },
  ],
  babel: {
    presets: ["@emotion/babel-preset-css-prop"],
    plugins: ["@emotion"],
  },
  webpack: {
    plugins: [],

    ...(process.env.NODE_ENV === "emulate" && {
      configure: {
        target: "electron-renderer",
      },
    }),
  },
};
