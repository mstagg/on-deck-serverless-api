const path = require('path');
const slsw = require('serverless-webpack');

module.exports = {
  entry: './src/handler.ts',
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    libraryTarget: 'commonjs',
    filename: 'src/handler.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
