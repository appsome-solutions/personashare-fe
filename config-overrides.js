/* eslint-disable @typescript-eslint/no-var-requires */
const { override, addWebpackModuleRule, addBabelPlugin } = require('customize-cra');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const bundleAnalyzerPlugin = config => {
  // config.plugins.push(new BundleAnalyzerPlugin());
  return config;
};

module.exports = override(
  bundleAnalyzerPlugin,
  addWebpackModuleRule({
    test: /\.worker\.js$/,
    use: { loader: 'worker-loader', options: { inline: true } },
  }),
  addBabelPlugin('@babel/plugin-proposal-optional-chaining'),
  addBabelPlugin('@babel/plugin-proposal-nullish-coalescing-operator')
);
