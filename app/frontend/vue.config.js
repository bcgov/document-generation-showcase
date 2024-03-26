module.exports = {
  publicPath: './',
  'transpileDependencies': [
    'vuetify'
  ],
  devServer: {
    proxy: 'http://localhost:8080',
    webSocketServer: false // hot-reloading in dev mode was getting web socket connection error
  }
};
