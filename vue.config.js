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
  devServer: {
    proxy:{
      // 代理
      '^/api':{
          target:'http://kumanxuan1.f3322.net:8001',
          // target:'http://www.520it.com:8084',
          pathRewrite:{
              // 重写路径，把/api开头的路径，都用空字符串替换掉
              '^/api':''
          },
      }
    }
}
};