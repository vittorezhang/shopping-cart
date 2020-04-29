// module.exports = {
//   presets: [
//     '@vue/cli-plugin-babel/preset'
//   ]
// }

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  //配置UI组件插件
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]

}

