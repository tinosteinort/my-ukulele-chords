const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './site/js/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build/js'),
  },
  plugins: [
    new CopyWebpackPlugin({
        patterns: [
          { from: 'site/index.html', to: '..' }
        ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  mode: 'production'
};
