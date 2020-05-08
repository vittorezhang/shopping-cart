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
        //遍历对象 有这个对象,口味一致数量+1
        if (item.foodsId == playload.foodsId && item.specFoods._id == playload.specFoods._id ) {
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
        //遍历选择列表，对应的对象数量-1

        if (item.foodsId == playload.foodsId &&  item.specFoods._id == playload.specFoods._id) {
          //数量减一          
          item[item.foodsId] = item[item.foodsId] <= 0 ? 0:item[item.foodsId]-1;

        }
      })

      // console.log(state.goodList);
      
    },
    clearGoods(state, playload) {
      let newArr = []
      state.goodList.map(item => {
         //遍历选择列表，讲对应饭店选择项清空
        // console.log(item.restaurant_id);
        
        if (item.restaurant_id !== playload) {
          //数量减一          
          // state.goodList.splice(index,0)
          newArr.push(item);
        }
      })
      state.goodList = newArr
      console.log('state',state.goodList);
      
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
