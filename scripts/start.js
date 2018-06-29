'use strict';

const autoprefixer = require('autoprefixer');
const { findCssTest } = require('./util');

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const config = require('react-scripts/config/webpack.config.dev');

const { rules, index } = findCssTest(config.module.rules);

// add sass module loader
rules.splice(index + 1, 0, {
  test: /\.scss$/,
  use: [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        sourceMap: true,
        minimize: true,
        modules: true,
        importLoaders: 1,
        localIdentName: '[name]__[local]__[hash:base64:6]'
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        sourceMap: true,
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
    {
      loader: require.resolve('sass-loader'),
      options: {
        sourceMap: true
      }
    }
  ],
});

// execute start script
require('react-scripts/scripts/start');
