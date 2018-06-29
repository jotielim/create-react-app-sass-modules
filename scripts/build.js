'use strict';

const rewire = require('rewire');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { findCssTest } = require('./util');

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// use rewire to get `extractTextPluginOptions`
const extractTextPluginOptions = rewire('react-scripts/config/webpack.config.prod').__get__('extractTextPluginOptions');
const config = require('react-scripts/config/webpack.config.prod');

const { rules, index } = findCssTest(config.module.rules);

// add sass module loader
rules.splice(index + 1, 0, {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract(
    Object.assign(
      {
        fallback: {
          loader: require.resolve('style-loader'),
          options: {
            hmr: false,
          },
        },
        use: [
          {
            loader: require.resolve('css-loader'),
            options: {
              sourceMap: true,
              minimize: true,
              modules: true,
              importLoaders: 1,
              localIdentName: '[hash:base64:8]'
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
          },
        ],
      },
      extractTextPluginOptions
    )
  ),
  // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
});

// execute build script
require('react-scripts/scripts/build');
