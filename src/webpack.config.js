const path = require('path');

module.exports = {


  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "fs": false
    }
  },



  module: {
    rules: [
    
        {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },

  // Other webpack configurations...

  // Your entry point file
  entry: './src/index.js',

  // Output file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
