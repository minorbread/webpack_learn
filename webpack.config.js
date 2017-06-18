const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'js/[name].bundle.js',
  },

  module: {
      rules: [
        {
          test: /\.html$/,
          use: [{
            loader: 'html-loader'
          }],
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          include: [
            path.resolve(__dirname, "src"),
          ],
          use: [
            {
              loader: 'babel-loader', 
              options: {      //采用babel-loader的"es2015"规则将找的js为浏览器可识别的js
                presets: ["es2015"],
                plugins: ["transform-remove-strict-mode"]
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
           'style-loader', 'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [require('autoprefixer')]
              }     
            },
          ]
        },
        {
          test: /\.ejs$/,
          use:['ejs-loader']
        },
        {
          test: /\.less$/,
          use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [require('autoprefixer')];
              }
            }
          }, {
            loader: 'less-loader'
          }],
        },
        {
          test: /\.(jpg|jpeg|png|gif)$/i,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 20000,
              name: '[name]-[hash:5].[ext]',
              outputPath:'./src/asset/img/'
            }
          },
          ]
        }
      ]
    },

  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      title: 'webpack demo',
      inject: 'body'
    }),
  ]
}

/*module.exports = {
  entry: {
    main: './src/script/main.js',
    a: './src/script/a.js',
    b: './src/script/b.js',
    c: './src/script/c.js',
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'js/[hash]-[name].js',
    publicPath: 'https:www.baidu.com/'
  },

  plugins: [
    new htmlWebpackPlugin({
      filename: 'a.html',
      template: 'index.html',
      inject: 'body',
      title: 'This is a.html',
      date: new Date(),
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      excludeChunks: ['b', 'c']
    }),
    new htmlWebpackPlugin({
      filename: 'b.html',
      template: 'index.html',
      inject: 'body',
      title: 'This is b.html',
      date: new Date(),
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      excludeChunks: ['a', 'c']
    }),
    new htmlWebpackPlugin({
      filename: 'c.html',
      template: 'index.html',
      inject: 'body',
      title: 'This is c.html',
      date: new Date(),
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      excludeChunks: ['a', 'b']
    }),
  ]
}*/