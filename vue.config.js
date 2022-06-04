const px2rem = require('postcss-px2rem');

module.exports = {
  //Webpack Plugin配置
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'vue-mobile'
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