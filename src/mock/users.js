import Mock from 'mockjs'

// 用函数调用方式保证翻页请求能获取不同数据
const UsersList = function () {
  return {
    status: 'OK',
    usersSize: 100,
    users: Mock.mock({
      "users|20": [
        {
          "userId|1": "@guid",
          "userAvatar": "@dataImage()",
          "userName|1": "@name",
          "userGender|1-2": 1,
          "userTime|1": "@date('yyyy-MM-dd')",
          "taskNum|0-9": 1,
          "superviseNum|0-9": 1,
          "userCredit|1-100": 0
        }
      ]
    }).users
  }
}

const UserDetail = Mock.mock({
  userInfo: {
    "userId|1": "@guid",
    "userAvatar": "@dataImage()",
    "userName|1": "@name",
    "userGender|1-2": 1,
    "userTime|1": "@date('yyyy-MM-dd')",
    "taskNum|0-9": 1,
    "superviseNum|0-9": 1,
    "userCredit|1-100": 1
  }
});

const UserTask = Mock.mock({
  state: 'ok',
  type: 'userId',
  "tasks|20": [
    {
      "taskId": "@guid",
      "userId": "@guid",
      "typeId": "@guid",
      "typeContent|1":[
        "健身","早起","学习","冥想","测试1","测试2","测试3","测试4"
      ],
      "taskTitle": "@cword(5,10)",
      "taskContent": "@cword(0,100)",
      "taskStartTime": "@date('yyyy-MM-dd')",
      "taskEndTime": "@date('yyyy-MM-dd')",
      "taskState|1": [
        "during", "nomatch", "fail", "success"
      ],
      "taskMoney|0-200.1-2": 1,
      "supervisorNum|1-10": 1,
      "refundMoney|0-200.1-2": 1,
      "checkTimes|1-100": 1,
      "checkNum|1-9": 1,
      "checkFrec": /([01]){7}/,
      "matchNum|1-9": 1
    }
  ]
});
const queryResult = function() {
  return Mock.mock({
    "users|5": [
      {
        "userId|1": "@guid",
        "userAvatar": "@dataImage()",
        "userName|1": "@name",
        "userGender|1-2": 1,
        "userTime|1": "@date('yyyy-MM-dd')",
        "taskNum|0-9": 1,
        "superviseNum|0-9": 1,
        "userCredit|1-100": 0
      }
    ]
  });
};
export {
  UsersList, UserDetail, UserTask,queryResult
}
