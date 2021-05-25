const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HTMLroot = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "app", "root.html"),
    filename: 'root.html',
    inject: 'body'
})

module.exports = {
    target: 'web',
    entry: { index: path.resolve(__dirname, "app", "root.js") },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"]
              }
            }
          }
        ]
      },
    output: {
        filename: 'babelRoot.js',
        path: path.resolve(__dirname, "output")
    },
    devServer:{
      contentBase: 'app/',
      inline: true,
      hot: true,
      watchContentBase: true
    },
    plugins: [HTMLroot]
};
