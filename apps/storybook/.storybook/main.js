const path = require('path');

module.exports = {
  stories: [
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

  async viteFinal(config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...(config.resolve?.alias || {}),
          '@forge/ui': path.resolve(__dirname, '../../../packages/ui/src'),
          '@forge/testing': path.resolve(__dirname, '../../../packages/testing/src'),
          '@forge/monitoring': path.resolve(__dirname, '../../../packages/monitoring/src'),
          '@forge/analytics': path.resolve(__dirname, '../../../packages/analytics/src'),
        },
      },
    };
  },
};