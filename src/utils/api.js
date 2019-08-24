// 接口管理
// 引入 axios 封装方法
import {get, post, deletes, put} from "./axios";

export default {
// 登录
  login: {
    // 发送登录信息
    login: (data) => {
      return post('/admin/login', data)
    },
    // 注销
    logout: (data) => {
      return post('/admin/logout', data)
    }
  },
// 用户
  users: {
    // 获取所有用户信息
    queryUsersInfo: (data) => {
      return post('/admin/user/all', data)
    },
    // 查询单个用户详情
    queryUserInfo: (data) => {
      return post('/admin/user/query', data)
    },
    // 查询单个用户任务
    queryUserTask: (data) => {
      return post('/admin/tasks', data)
    }
  },
// 动态
  essays: {
    getEssays : data=>{
      return post('/admin/essays',data)
    }
  },
// 任务
  tasks : {
    getTasks: (data) => {
      return post('/admin/tasks',data)
    },
    // 获取任务类型
    queryType: (data) => {
      return post('/taskType/allType',data)
    },

    queryTypeSuggestion: data =>{
      return post('/taskType/suggestions',data)
    },

    queryTask: data => {
      return post('/task/queryTask',data)
    },

    getTaskSupervisors: data => {
      return post('/admin/supervisors',data)
    }
  },

  checks : {
    getTaskChecks: data => {
      return post('/admin/checks',data)
    }
  },

// 资金
  money: {
    // 获取单个用户资金记录
    queryUserMoneyFlow: (data) =>{
      return post('/admin/moneyFlows',data)
    }
  },
// 申诉
  appeal: {
    getAppeals: data =>{
      return post('/admin/appeals',data)
    }
  },
// 举报
  report: {
    getReports: data => {
      return post('/admin/reports',data)
    }
  }
}
