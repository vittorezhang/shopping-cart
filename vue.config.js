const px2rem = require('postcss-px2rem');

module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '巨饿了'
        return args;
      })
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          px2rem({
            remUnit: 75
          })
        ]
      }
    }
  },
  // devServer: {
  //     proxy: {

  //     }
  // }
};