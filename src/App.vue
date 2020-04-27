<template>
  <div id="app">
    <p>1.本项目会自动把px自动转换成rem，不需要考虑移动端兼容性问题，单位直接用px即可，浏览器上会自动变成是rem;若不想把px转换成rem，那么直接在对应的css属性后面增加一个/*no*/</p>
    <router-view/>
  </div>
</template>

<style lang="less">
p {
  font-size: 40px; 
  border-bottom: 1px solid #ddd;/*no*/
  color: red;
  letter-spacing: 4px; /*no*/
}
</style>