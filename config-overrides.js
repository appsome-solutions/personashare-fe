/* eslint-disable @typescript-eslint/no-var-requires */
const { override, addWebpackModuleRule, addBabelPlugin } = require('customize-cra');

module.exports = override(
  addWebpackModuleRule({
    test: /\.worker\.js$/,
    use: { loader: 'worker-loader', options: { inline: true } },
  }),
  addBabelPlugin('@babel/plugin-proposal-optional-chaining')
);
