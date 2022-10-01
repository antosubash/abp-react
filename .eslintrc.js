module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-abpreact`
  extends: ["abpreact"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
