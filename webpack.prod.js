const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "production",
  entry: [
    resolve(__dirname, 'src', 'index.jsx')
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [
            'styled-jsx/babel',
            ['transform-remove-console', { 'exclude': ['error', 'warn'] }]
          ]
        }
      },
      {
        test: /\.(png|gif|json|jp(e*)g|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8000,
            name: 'images/[hash]-[name].[ext]'
          }
        }
      },
      {
        test: /\.(wav)$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 12000,
            name: 'sounds/[hash]-[name].[ext]'
          }
        }
      }
    ]
  },

  devtool: '',

  plugins: [
    new HtmlWebpackPlugin({
      template: 'template.ejs',
      appMountId: 'react-app-root',
      title: 'Reddit Context Shuffler',
      favicon: './src/assets/images/favicon.png',
      filename: resolve(__dirname, "./", "index.html"),
      meta: {
        'viewport': 'width=device-width, height=device-height, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no',
        'mobile-web-app-capable': 'yes',
        'theme-color': '#004'
      }
    }),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: 'https://www.eggborne.com/rcs/dist/',
    filename: 'app.bundle.js'
  }
};