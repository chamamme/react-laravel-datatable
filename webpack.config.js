var path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  entry: './src/index.js',
  mode: 'none',
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'index.js',
    libraryTarget: 'commonjs2' 
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env',{
                plugins: [
                  '@babel/plugin-proposal-class-properties'
                ]
              }],

          }
        }
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
    }
    ]
  },
  externals: {
    'react': 'commonjs react'
  },
  plugins: [
    // new BundleAnalyzerPlugin()
  ]
};

