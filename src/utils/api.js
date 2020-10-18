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
    //获取用户兴趣爱好
    queryHobbies: (data) => {
      return post('/admin/user/queryHobby', data)
    },
    // 查询单个用户详情
    queryUser: (data) => {
      return post('/admin/user/query', data)
    },
    // 查询单个用户任务
    queryUserTask: (data) => {
      return post('/admin/task/tasks', data)
    },
    //编辑用户权限
    changeUserAuth: (data) => {
      return post('/admin/user/changeauth', data)
    },
    // 搜索
    // 为了避免多次搜索导致的结果返回异步的问题
    // 采用axios的cancel token来取消上一次搜索请求
    queryByKeyword: (data, cancelToken) => {
      data['c'] = cancelToken;
      return post('admin/user/queryByKeyWord', data)

    }
  },
//管理员
  admins: {
    //获取所有管理员信息
    queryAdminsInfo: (data) => {
      return post('/admin/all', data)
    },
    // 查询单个用户详情
    queryAdmin: (data) => {
      return post('/admin/query', data)
    },
    queryByKeyword: (data, cancelToken) => {
      data['c'] = cancelToken;
      return post('admin/queryByKeyWord', data)
    },
    //更改admin信息
    updateAdmin: (data) => {
      return post('/admin/updateAdmin', data)
    },
    //删除管理员
    deleteById: (data) => {
      return post('/admin/deleteAdmin', data)
    },
    //新增管理员
    addAdmin: (data) => {
      return post('/admin/addAdmin', data)
    }
  },
// 动态
  essays: {
    getEssays: data => {
      return post('/admin/essay/all', data)
    },

    queryByKeyword: (data, cancelToken) => {
      data['c'] = cancelToken;
      return post('admin/essay/queryByKeyword', data)
    },

    deleteById: data => {
      return post('admin/essay/delete', data)
    },

    queryEssay: (data) => {
      return post('/admin/essay/query', data)
    },
  },
// 任务
  tasks: {
    getTasks: (data) => {
      return post('/admin/task/tasks', data)
    },
    // 获取任务类型
    queryType: (data) => {
      return post('/taskType/allType', data)
    },

    queryTypeSuggestion: data => {
      return post('/admin/suggestion/all', data)
    },

    queryTask: data => {
      return post('/admin/task/detail', data)
    },

    getTaskSupervisors: data => {
      return post('/admin/task/supervisors', data)
    },

    suggestionDeal: data => {
      return post('/admin/suggestion/deal', data)
    },

    passSuggestion: data => {
      return post('/admin/suggestion/pass', data)
    },

    denySuggestion: data => {
      return post('/admin/suggestion/deny', data)
    },

    delType: data => {
      return post('/admin/taskType/delete', data)
    },

    querySuggestionByKeyword: (data, cancelToken) => {
      data['c'] = cancelToken;
      return post('admin/task/querysuggestion', data)
    },

    queryTaskByKeyword: (data, cancelToken) => {
      data['c'] = cancelToken;
      return post('admin/task/query', data)
    }
  },
//标签管理
  tags: {
    // 获取所有排序过的标签
    getSortedTags: data => {
      return post('/admin/tag/sort', data)
    },
    // 删除标签
    delTag: data => {
      return post('/admin/tag/delete', data)
    },
    // 新增标签
    addTag: data => {
      return post('/admin/tag/add', data)
    },
    // 获取所有排序后话题
    getSortedTopics: data => {
      return post('/admin/topic/sort', data)
    },
    // 新增话题
    addTopic: data => {
      return post('/admin/topic/add', data)
    },
    // 删除话题
    delTopic: data => {
      return post('/admin/topic/delete', data)
    },
    // 获取所有类型与标签关系
    getTypeTag: data => {
      return post('/admin/typeTag/all', data)
    },
    // 获取所有类型
    getAllType:data=>{
      return post('admin/taskType/allType')
    },
    // 删除话题
    delType: data => {
      return post('/admin/taskType/delete', data)
    },
  },
  checks: {
    getTaskChecks: data => {
      return post('/admin/task/check', data)
    },
    getCheckDetail: data => {
      return post('admin/task/check/detail', data)
    },
    // getCheckSupervisor: data =>{
    //   return post('admin/check/supervise',data)
    // }
  },

// 资金
  money: {
    // 获取单个用户资金记录
    queryUserMoneyFlow: (data) => {
      return post('/admin/moneyFlows/user', data)
    },

    queryAllMoneyFlow: data => {
      return post('/admin/moneyFlows/all', data)
    },

    getGraphData: data => {
      return post('/admin/moneyFlows/graph', data)
    },
    getUserGraphData: data => {
      return post('/admin/moneyFlows/userGraph', data)
    },
    //查询用户资金流水
    queryFlowByKeyword: (data, cancelToken) => {
      data['c'] = cancelToken;
      return post('admin/moneyFlows/query', data)
    },

    //查询用户资金流水
    queryRechargeByKeyword: (data, cancelToken) => {
      data['c'] = cancelToken
      return post('admin/moneyRecharge/queryByKeyword', data)
    },
    //获取充值提现列表
    queryAllMoneyRecharge: data => {
      return post('/admin/moneyRecharge/rechargeList', data)
    },
    //获得用户充值提现表
    queryUserMoneyRecharge: data => {
      return post('/admin/moneyRecharge/rechargeUser', data)
    },
  },
// 申诉
  appeal: {
    getAppeals: data => {
      return post('/admin/appeal/all', data)
    },

    deal: data => {
      return post('/admin/appeal/process', data)
    },

    queryByKeyword: (data, cancelToken) => {
      data['c'] = cancelToken
      return post('admin/appeal/query', data)
    }
  },
// 举报
  report: {
    getReports: data => {
      return post('/admin/report/all', data)
    },

    deal: data => {
      return post('/admin/report/process', data)
    },

    queryByKeyword: (data, cancelToken) => {
      data['c'] = cancelToken
      return post('admin/report/query', data)
    }
  }
}
