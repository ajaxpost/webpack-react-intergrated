const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'src/index.js'),
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
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'less-loader',
            // 当前需要加上options,否则报错
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
              // 图片小于8kb，就会被base64处理
              // 优点: 减少请求数量(减轻服务器压力)
              // 缺点：图片体积会更大(文件请求速度更慢)
              limit: 6 * 1024,
              // 打包后的路径和文件名称 [ext]扩展名
              name: 'img/[name].[ext]',
              // 打包后的文件指定访问路径前缀
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
    }),
    new MiniCssExtractPlugin({
      /**
       * (node:10416) [DEP_WEBPACK_TEMPLATE_PATH_PLUGIN_REPLACE_PATH_VARIABLES_HASH] DeprecationWarning: [hash] is now [fullhash] (also consider using [chunkhash] or [contenthash], see documentation for details)
       * (Use `node --trace-deprecation ...` to show where the warning was created)
       */
      filename: 'css/[name]_[chunkhash:6].css',
    }),
    new CleanWebpackPlugin(),
    new ESLintPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    inline: true,
    historyApiFallback: true,
  },
  resolve: {
    // 配置解析模块路径别名：优点简写路径，缺点路径没有提示
    alias: {
      // 定义一个@，可在import引入时使用
      '@': path.resolve(__dirname, 'src'),
    },
    // 设置可以忽略不写的后缀
    extensions: ['.js', '.jsx'],
  },
}
