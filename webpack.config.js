const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const port = 8080

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    bundle: [path.resolve(__dirname, 'src/index.js')],
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  // 可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)$/,

        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#3399cc',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },

      {
        test: /\.html$/,
        // 处理html中的img(负责引入img,从而能被url-loader进行处理)
        use: 'html-loader',
      },
      {
        test: /\.(png|jpeg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: 'img/[name].[ext]',
              publicPath: '/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      favicon: path.resolve(__dirname, 'public/whtitleicon.jpg'),
      inject: 'body',
      hash: true,
    }),

    new CleanWebpackPlugin(),
    new ESLintPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new WebpackBar({
      name: '微呼科技',
      color: '#3399cc',
      reporter: {
        done() {
          console.log(`http://localhost:${port}`)
        },
      },
    }),
  ],

  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    inline: true,
    historyApiFallback: true,
    compress: true,
    hot: true,
    watchContentBase: true,
    quiet: true,
    stats: 'errors-only',
    port,
    proxy: {
      '/cluster': {
        target: 'http://119.3.177.131:8081/',
        changeOrigin: true,
        secure: false,
        ws: false,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.jsx'],
  },
}
