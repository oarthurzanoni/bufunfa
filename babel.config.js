module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ts", ".tsx", ".jsx", ".js", ".json"],
          alias: {
            // This needs to be mirrored in tsconfig.json
            components: "./src/components",
            components: "src/components/index",
            contexts: "./src/contexts",
            contexts: "src/contexts/index",
            screens: "./src/screens",
            screens: "./src/screens/index",
            hooks: "./src/hooks",
            hooks: "./src/hooks/index",
          },
        },
      ],
    ],
  };
};
