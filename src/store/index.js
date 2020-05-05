import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goodList: [],
  },
  mutations: {
    addGoods(state, playload) {
      let flag = false;
      state.goodList.map(item => {
        //遍历对象 有这个对象数量+1
        if (item.foodsId == playload.foodsId) {
          //数量加一
          item[item.foodsId] += 1;
          flag = true
        }
      })

      //没有这个对象
      if (!flag) {
        playload[playload.foodsId] = 1;
        state.goodList.push(playload)
      }
      console.log(state.goodList);

    },
    cutGoods(state, playload) {
   
      state.goodList.map(item => {
        //遍历对象对这个对象数量-1

        if (item.foodsId == playload.foodsId) {
          //数量减一
          console.log(item[item.foodsId]);
          
          item[item.foodsId] = item[item.foodsId] < 0 ? 0:item[item.foodsId]-1;

        }
      })

      // console.log(state.goodList);
      
    },
  },
  actions: {
    addGoodsAction(context, playload) {
      // console.log(playload, "action");
      context.commit('addGoods', playload)
    },
    cutGoodsAction(context, playload) {
      context.commit('cutGoods', playload)

    },
    clearGoodsAction(context, playload) {
      context.commit('clearGoods', playload)
    }
  },
  modules: {
  }
})
