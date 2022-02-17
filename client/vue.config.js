const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '../public/'
    : '/',
  outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    proxy: 'http://localhost:3000'
  }
}
