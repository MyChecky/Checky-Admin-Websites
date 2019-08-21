import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const key = 'user';
const isLogin = 'isLogin';
const store = new Vuex.Store({
  state () {
    return {
      user: null,// 用户名
      isLogin: '0',
      userId: '',// 登录标识
      sessionKey: ''
    }
  },
  getters: {
    getStorage: function (state) {
      if (!state.user) {
        state.user = JSON.parse(localStorage.getItem(key))
        state.isLogin = localStorage.getItem(isLogin)
      }
      return state.user
    },

    auth: (state)=>{
        if(userId&&sessionKey) return {
            userId: state.userId,
            sessionKey: state.sessionKey
        }
    },

    getAttr: (state)=>(key)=>{
      if(!state[key]) state[key] = JSON.parse(localStorage.getItem(key))
      return state[key]
    }
  },
  mutations: {
    $_setLogin (state, value) {
      state.isLogin = value
      localStorage.setItem(isLogin, value)
    },
    $_setStorage (state, value) {
      for(var key in value){
        state[key] = value[key]
        localStorage.setItem(key,JSON.stringify(value[key]))
      }
      // state.user = value
      // localStorage.setItem(key, JSON.stringify(value))
    },
    $_removeStorage (state) {
      state.user = null
      state.isLogin = '0'
      localStorage.removeItem(key)
      localStorage.removeItem(isLogin)
      localStorage.removeItem('userId')
      localStorage.removeItem('sessionKey')
    }
  }
});

export default store
