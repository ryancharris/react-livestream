import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";

const config = {
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    format: "cjs"
  },
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**"
    })
  ],
  external: ["react"]
};

export default config;
