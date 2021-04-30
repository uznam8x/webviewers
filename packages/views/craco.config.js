const CracoAlias = require("craco-alias");
const webpack = require("webpack");
const pack = require("./package.json");
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
    plugins: [
      new webpack.DefinePlugin({
        __VERSION__: `"${pack.version}"`,
      }),
    ],

    ...(process.env.NODE_ENV === "emulate" && {
      configure: {
        target: "electron-renderer",
      },
    }),
  },
};
