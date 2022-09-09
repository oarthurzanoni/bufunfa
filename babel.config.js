module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            // This needs to be mirrored in tsconfig.json
            translations: "./src/translations",
            components: "./src/components",
            contexts: "./src/contexts",
            navigation: "./src/navigation",
            utils: "./src/utils",
            hooks: "./src/hooks",
          },
          extensions: [".js", ".jsx", ".tsx", ".ts"],
        },
      ],
    ],
  };
};
