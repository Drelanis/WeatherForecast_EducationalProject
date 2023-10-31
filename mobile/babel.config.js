module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            common: './src/common',
            context: './src/context',
            components: './src/components',
            hooks: './src/hooks',
            screens: './src/screens',
            lib: './src/lib',
            apollo: './apollo',
            assets: './assets',
          },
        },
      ],
    ],
  };
};
