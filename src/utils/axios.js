// 封装 axios 请求
import axios from 'axios'; // 引入axios
import router from '../router/index'
import store from '../store/index'
// 环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://192.168.1.104:8080';
}
else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = '';
}
else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = '';
}
// 检测 url
console.log(axios.defaults.baseURL);

// 创建实例
const service = axios.create({
  timeout: 10000
});

// 项目地址加端口
export const base = service.defaults.baseURL;

// request拦截器
service.interceptors.request.use(
  config => {
    return config
  }, error => {
    Promise.reject(error)
  });
// response 拦截器
service.interceptors.response.use(
  response => {
    let res = {};
    res.status = response.status
    res.data = response.data;
    return res;
  },
  error => {
    if (error.response && error.response.status === 404) {
      router.push('/404')
    }else if(error.response && error.response.status === 403){
      store.commit('$_removeStorage')
      alert('登录失效，请重新登录！')
      router.push('/login')
    }
    return Promise.reject(error.response)
  }
);

export function get(url, data = {}) {
  data.IERealTime = new Date().getTime(); //get方法加一个时间参数,解决ie下可能缓存问题.
  return service({
    url: url,
    method: 'get',
    headers: {
    },
    data:data
  })
}

//封装post请求
export function post(url, data = {}) {
  //默认配置
  let sendObject={
    url: url,
    method: 'post',
    headers: {
      'Content-Type':'application/json;charset=UTF-8',
      'userId': store.getters.getAttr('userId'),
      'sessionKey': store.getters.getAttr('sessionKey')
    },
    data:data
  };
  // sendObject.data=JSON.stringify(data);
  return service(sendObject)
}

//封装put方法 (resfulAPI常用)
export function put(url,data = {}){
  return service({
    url: url,
    method: 'put',
    headers: {
      'Content-Type':'application/json;charset=UTF-8'
    },
    data:JSON.stringify(data)
  })
}
//删除方法(resfulAPI常用)
export function deletes(url){
  return service({
    url: url,
    method: 'delete',
    headers: {}
  })
}

//export
export {
  service
}

// // post 请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
