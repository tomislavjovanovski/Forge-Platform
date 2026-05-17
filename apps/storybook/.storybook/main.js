const path = require('path');

module.exports = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../../../packages/ui/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  docs: {
    autodocs: 'tag',
  },

  options: {
    storySort: {
      order: ['Engineering', 'Foundations', 'Components'],
    },
  },

  async viteFinal(config) {
    return {
      ...config,
      cacheDir: path.resolve(__dirname, '../node_modules/.cache/sb-vite-react19'),
      optimizeDeps: {
        ...(config.optimizeDeps || {}),
        force: true,
      },
      resolve: {
        ...config.resolve,
        alias: [
          ...(Array.isArray(config.resolve?.alias)
            ? config.resolve.alias
            : Object.entries(config.resolve?.alias || {}).map(([find, replacement]) => ({
                find,
                replacement,
              }))),
          {
            // Storybook 7 falls back to the legacy react-dom API on React 19.
            // Force the modern root-based shim so preview unmounts work again.
            find: '@storybook/react-dom-shim',
            replacement: path.resolve(
              __dirname,
              '../../../node_modules/@storybook/react-dom-shim/dist/react-18.mjs'
            ),
          },
          {
            find: '@forge/ui',
            replacement: path.resolve(__dirname, '../../../packages/ui/src'),
          },
          {
            find: '@forge/testing',
            replacement: path.resolve(__dirname, '../../../packages/testing/src'),
          },
          {
            find: '@forge/monitoring',
            replacement: path.resolve(__dirname, '../../../packages/monitoring/src'),
          },
          {
            find: '@forge/analytics',
            replacement: path.resolve(__dirname, '../../../packages/analytics/src'),
          },
        ],
      },
    };
  },
};
