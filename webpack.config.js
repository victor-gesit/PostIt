const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, './template/build'),
    filename: './bundle.js',
    publicPath: 'template'
  },
  watch: true,
  devtool: 'source-map',
  devServer: {
    contentBase: 'template'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader'
      }, 
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'raw-loader'
      }
    ]
  }
};

