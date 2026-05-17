module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        node: true,
        process: true,
        require: true,
        module: true,
        __dirname: true,
        __filename: true,
        console: true,
        setTimeout: true,
        clearTimeout: true,
        setInterval: true,
        clearInterval: true,
      },
      ecmaVersion: 2022,
      sourceType: "commonjs",
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-undef": "off",
    },
  },
];
