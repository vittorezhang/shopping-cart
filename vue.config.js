const px2rem = require('postcss-px2rem');

module.exports = {
  //配置UI渲染
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'ele'
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