import { STYLE } from '@omni-door/tpl-utils';

export default function (config: {
  ts: boolean;
  style: STYLE;
  configFileName: string;
}) {
  const { ts, style, configFileName } = config;

  return `'use strict';

const path = require('path');
const WebpackBar = require('webpackbar');

const cliConfig = require(path.resolve(__dirname, '../${configFileName}'));
const hash = cliConfig && cliConfig.build && cliConfig.build.hash;


module.exports = {
  module: {
    rules: [
      {
        test: ${ts ? /\\.(js|jsx|ts|tsx)$/ : /\\.(js|jsx)$/},
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\\.(woff|woff2|eot|ttf|svg|jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: hash ? \`assets/[name].[\${typeof hash === 'string' ? hash : 'contenthash'}:8].[ext]\` : 'assets/[name].[ext]'
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new WebpackBar()
  ],
  resolve: {
    extensions: [${ts ? '".ts", ".tsx", ' : ''}".js", ".jsx", ${style ? (style === 'css' ? '".css"' : (style === 'less' ? '".less", ".css"' : style === 'scss' ? '".scss", ".css", ".sass"' : '".scss", ".less", ".css", ".sass"')) : ''}]
  }
};`;
}