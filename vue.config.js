const px2rem = require('postcss-px2rem');

module.exports = {
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
  //       // 以/v2开头的接口
  //         '^/v2':{
  //         target:"http://kumanxuan1.f3322.net:8001"
  //         }
  //     }
  // }
};