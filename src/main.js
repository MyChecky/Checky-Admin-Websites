import Vue from 'vue'
import App from './App'
import router from './router/index'
import iView from 'view-design'
import store from './store/index'
import API from './utils/api'
import * as translator from './utils/translator'
import 'lib-flexible'
// 注释以关闭 mock 数据
//if(process.env.MOCK) require('./mock/mock');

import  './assets/font-awesome-4.7.0/css/font-awesome.css'
//升级iview4.0
import  'iview/dist/styles/iview.css'
import 'view-design/dist/styles/iview.css';
import './newtheme/theme.css' // 覆盖原有默认颜色样式出现less文件加载错误，有谁有能力可以后续解决

Vue.use(iView);
Vue.use(router);
Vue.prototype.$api = API;
Vue.prototype.$Store = store;
Vue.prototype.$translator = translator;
Vue.config.productionTip = false;

// 跳转前，判断是否登录
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  if (to.matched.some(m => m.meta.auth)) {
    if (window.localStorage.isLogin === '1') {
      // 已登录直接跳转
      next();
    } else if (to.path !== '/login') {
      // 未登录跳转到login
      Vue.prototype.$Message.error('检测到您还未登录,请登录后操作！');
      iView.LoadingBar.error()
      setTimeout(()=>{
        next({path: '/login'});
      },900000)
    }
  } else {
    // 不需要登录权限的页面
    next();
  }
});
// 跳转后函数
router.afterEach((to, from) => {
  iView.LoadingBar.finish()
  console.log('跳转到：'+to.name);
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
