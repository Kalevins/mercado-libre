const config = {
  root: true,
  extends: ["@repo/eslint/eslint.api.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};

export default config;
