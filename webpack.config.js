const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//
const pages = require('./config/pageConfig');
const outputPath = path.resolve(__dirname, 'build');


function genHtmlWebpackPlugin(pages){
  let ret = [];
  for (let page of pages) {
    const chunksname = page.name;
    ret.push(
      new HtmlWebpackPlugin({
        title: page.title ? page.title : chunksname, 
        filename: `page/${chunksname}/index.html`,
        template: `./src/page/${chunksname}/index.html`,
        minify: false,
        chunks: page.chunks || [chunksname],
      })
    );
  }
  return ret;
  
}

function genEntry(pages){
  let ret = {};
  for (let page of pages) {
    const chunksname = page.name;
    ret[chunksname] = `./src/page/${chunksname}/index.js`;
  }
  return ret;
}

const entry = genEntry(pages);
const htmlWebpackPlugin = genHtmlWebpackPlugin(pages);


module.exports = {
  entry,
  output: {
    filename: 'page/[name]/index.b.js',
    path: outputPath,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
        }),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin({
      allChunks: true,
      filename: 'page/[name]/[name].css',
    }),  //打包后的文件名
    ...htmlWebpackPlugin,
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'public', to: 'public' },
      ],
    }),
  ],

  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    }
  },

  devServer: {
    contentBase: outputPath,
    port: 8081,
    open: true,
    compress: true,
    openPage: '/page/index/index.html',
    proxy: {
        '/user':
          {
            target:"http://localhost:8080",
            changeOrigin:true
          },
      '/book':
        {
          target:"http://localhost:8080",
          changeOrigin:true
        },
      '/memos': {
        target:"http://localhost:8080",
        changeOrigin:true
      },
      '/list': {
        target:"http://localhost:8080",
        changeOrigin:true
      },
    }
  }

};