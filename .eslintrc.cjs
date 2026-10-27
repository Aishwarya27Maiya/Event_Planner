module.exports = {
  root: true,
  ignorePatterns: [
    "dist/",
    "src/TotalCost.jsx",
    "src/avSlice.js",
    "src/mealsSlice.js",
  ],
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["react", "react-refresh"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  rules: {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  },
};
