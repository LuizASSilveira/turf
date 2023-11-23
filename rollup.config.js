const typescript = require("./rollup-plugins/typescript-export");

module.exports = {
  input: "index.js",
  output: [
    { file: "dist/js/index.js", format: "cjs" },
    { file: "dist/es/index.js", format: "es" },
  ],
  plugins: [typescript()],
};
