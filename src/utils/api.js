// 接口管理
// 引入 axios 封装方法
import {get, post, deletes, put} from "./axios";

export default {
  // 示例 api：获取用户信息
  getUserInfo: (data)=>{
    return get('/users/getInfo', data)
  },
  // 示例 api: 发送登录信息
  login: (data) => {
    return post('/admin/login', data)
  }

}
