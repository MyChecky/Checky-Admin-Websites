// 接口管理
// 引入 axios 封装方法
import {get, post, deletes, put} from "./axios";

export default {
// 登录
  login : {
    // 发送登录信息
    login: (data) => {
      return post('/admin/login', data)
    },
    // 注销
    logout: (data) => {
      return post('/admin/logout',data)
    }
  },
// 用户
  users : {
    // 获取所有用户信息
    queryUsersInfo: (data) => {
      return post('/admin/user/all',data)
    },
    // 查询单个用户详情
    queryUserInfo: (data) =>{
      return post('/admin/user/query',data)
    }
  },
// 动态
  essays : {

  },
// 任务
  tasks : {

  },
// 资金
  money : {

  },
// 申诉
  appeal : {

  },
// 举报
  report : {

  }
}
