const path = require('path');

module.exports = {
    stories: ['../src/components/**/*.stories.js'],
    addons: [{
        name: '@storybook/preset-scss',
        options: {
            sassLoaderOptions : {
                sourceMap: true,
                additionalData: '@import "variables";',
                sassOptions:{
                    includePaths: [path.join(__dirname, '../src/components')]
                }
                
          }
        }
      },
      '@storybook/addon-knobs',
      {
        name: '@storybook/addon-essentials',
        options: {
          "controls": false,
        },
        }
    ],
  };