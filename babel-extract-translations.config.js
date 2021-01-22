module.exports = {
  presets: ["babel-preset-gatsby"],
  plugins: [
    [
      "i18next-extract",
      {
        locales: ["us", "de", "fr"],
        keySeparator: null,
        nsSeparator: null,
        keyAsDefaultValue: ["us"],
        useI18nextDefaultValue: ["us"],
        discardOldKeys: true,
        outputPath: "locales/{{locale}}/{{ns}}.json",
        customTransComponents: [["gatsby-plugin-react-i18next", "Trans"]],
        customUseTranslationHooks: [
          ["gatsby-plugin-react-i18next", "useTranslation"],
        ],
      },
    ],
  ],
  overrides: [
    {
      test: [`**/*.ts`, `**/*.tsx`],
      plugins: [[`@babel/plugin-transform-typescript`, { isTSX: true }]],
    },
  ],
};
