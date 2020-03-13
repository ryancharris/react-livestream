import babel from "rollup-plugin-babel";
// import resolve from "@rollup/plugin-node-resolve";
// import commonjs from "@rollup/plugin-commonjs";

const config = {
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    format: "cjs"
  },
  plugins: [
    // resolve(),
    // commonjs(),
    babel()
    // babel({
    //   exclude: "node_modules/**"
    // })
  ],
  // external: ["react"],
  watch: {
    include: "src/**",
    exclude: "node_modules/**"
  }
};

export default config;
