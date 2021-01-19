const path = require('path');
const webpack = require('webpack');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {

  // Set WEBPACK env variable to true to include styles when compiling and skip them if server rendering
  config.plugins.push(
    new webpack.DefinePlugin({
			'process.env': {
				WEBPACK: true,
			}
		})
  );

  config.module.rules.push({
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', "@babel/preset-react"],
        "plugins": [
          "@babel/plugin-proposal-export-default-from",
          "@babel/plugin-proposal-class-properties"
        ]
      }
    }
  },
  {
    test: /\.scss$/,
    use: [
      {
        loader: "sass-loader",
        options: {
          sourceMap: true,
          data: '@import "variables";',
          includePaths: [
            path.join(__dirname, '../src/components')
          ]
        }
    }
    ]
  },
  {
    test: /\.stories\.js$/,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre',
    include: path.resolve(__dirname, '../src/components')
});

  // Return the altered config
  return config;
};
