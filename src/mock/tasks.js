import Mock from 'mockjs'

const CheckDetail = Mock.mock({
  "adminCheckDetail": {
    "supervisorStates|1-5": [
      {
        "supervisorId": "@guid",
        "supervisorName": "@cword(2,3)",
        "supervisorState|1": [
          "pass", "deny", "unknown"
        ]
      },
    ],
    "checkHistory": {
      "check": {
        "checkId": "123",
        "checkTime": "2019-01-02",
        "checkState|1": [
          "pass", "deny", "unknown"
        ]
      },
      "image": {
        "fileAddr": "@image()"
      },
      "text": {
        "recordContent": "12322222222"
      }
    },
    "userName": "@cname",
  },

});
const CheckSupervise = {}
const TasksList = {
  "state": "ok",
  "tasksSize": 9,
  "tasks": [
    {
      "taskId": "02ea8987-6374-4bbd-b517-01b5159bd08e",
      "userId": "oM2yQ4jR0La_jZ8hyxkERsqNTh_8",
      "userName": "Yeung！",
      "typeId": "1747492e-1dd8-4975-82f8-32b204e49891",
      "taskTitle": "带权限任务测试",
      "taskContent": "踩踩踩踩踩踩踩踩踩踩踩踩从",
      "taskStartTime": "2019-07-24",
      "taskEndTime": "2019-09-24",
      "taskState": "during",
      "taskMoney": 200.0,
      "supervisorNum": 3,
      "refundMoney": 0.0,
      "checkTimes": 54,
      "checkNum": 0,
      "checkFrec": "1101111",
      "matchNum": 0
    },
    {
      "taskId": "866a2780-2671-4775-bde0-7ab95a59f541",
      "userId": "oM2yQ4jR0La_jZ8hyxkERsqNTh_8",
      "userName": "Yeung！",
      "typeId": "1747492e-1dd8-4975-82f8-32b204e49891",
      "taskTitle": "aaaaa",
      "taskContent": "",
      "taskStartTime": "2019-07-19",
      "taskEndTime": "2019-09-19",
      "taskState": "nomatch",
      "taskMoney": 100.0,
      "supervisorNum": 0,
      "refundMoney": 0.0,
      "checkTimes": 9,
      "checkNum": 0,
      "checkFrec": "1000000",
      "matchNum": 0
    },
    {
      "taskId": "d12f782c-382a-401d-88c8-b9fcd27cad45",
      "userId": "oM2yQ4jR0La_jZ8hyxkERsqNTh_8",
      "userName": "Yeung！",
      "typeId": "1747492e-1dd8-4975-82f8-32b204e49891",
      "taskTitle": "校园环跑",
      "taskContent": "每天跑2km",
      "taskStartTime": "2019-07-19",
      "taskEndTime": "2019-08-19",
      "taskState": "during",
      "taskMoney": 20.0,
      "supervisorNum": 3,
      "refundMoney": 0.0,
      "checkTimes": 31,
      "checkNum": 0,
      "checkFrec": "1111111",
      "matchNum": 0
    },
    {
      "taskId": "45c7e67d-ff0b-4c39-aced-e1353c90a9a5",
      "userId": "oM2yQ4mpOuCfEIeN17S-rdteug28",
      "userName": "橘子洲",
      "typeId": "1747492e-1dd8-4975-82f8-32b204e49891",
      "taskTitle": "test",
      "taskContent": "test",
      "taskStartTime": "2019-07-19",
      "taskEndTime": "2019-08-19",
      "taskState": "during",
      "taskMoney": 20.0,
      "supervisorNum": 3,
      "refundMoney": 0.0,
      "checkTimes": 31,
      "checkNum": 0,
      "checkFrec": "1111111",
      "matchNum": 0
    },
    {
      "taskId": "56fcebbc-b0d2-42f1-93c6-faed9c456589",
      "userId": "oM2yQ4mpOuCfEIeN17S-rdteug28",
      "userName": "橘子洲",
      "typeId": "1747492e-1dd8-4975-82f8-32b204e49891",
      "taskTitle": "每天都要呼吸空气哦",
      "taskContent": "大口呼吸哦",
      "taskStartTime": "2019-07-24",
      "taskEndTime": "2020-07-24",
      "taskState": "nomatch",
      "taskMoney": 1.0,
      "supervisorNum": 0,
      "refundMoney": 0.0,
      "checkTimes": 366,
      "checkNum": 0,
      "checkFrec": "1111111",
      "matchNum": 0
    },
    {
      "taskId": "1bffbbfd-ecc7-4709-8c91-e4b7826859af",
      "userId": "oM2yQ4nodPiKcVYDmc6VRrFUCtxs",
      "userName": "嘴巴嘟嘟",
      "typeId": "1747492e-1dd8-4975-82f8-32b204e49891",
      "taskTitle": "回家打游戏",
      "taskContent": "每天打一盘",
      "taskStartTime": "2019-07-24",
      "taskEndTime": "2019-07-24",
      "taskState": "during",
      "taskMoney": 200.0,
      "supervisorNum": 3,
      "refundMoney": 0.0,
      "checkTimes": 0,
      "checkNum": 0,
      "checkFrec": "1011100",
      "matchNum": 0
    },
    {
      "taskId": "c59fd5b9-7e02-4b88-951b-56f18795b370",
      "userId": "oM2yQ4nodPiKcVYDmc6VRrFUCtxs",
      "userName": "嘴巴嘟嘟",
      "typeId": "1747492e-1dd8-4975-82f8-32b204e49891",
      "taskTitle": "学习英语",
      "taskContent": "每天背100个单词",
      "taskStartTime": "2019-07-18",
      "taskEndTime": "2019-08-18",
      "taskState": "during",
      "taskMoney": 100.0,
      "supervisorNum": 3,
      "refundMoney": 0.0,
      "checkTimes": 22,
      "checkNum": 0,
      "checkFrec": "0111110",
      "matchNum": 0
    },
    {
      "taskId": "4237f545-5ea3-40ab-b639-dc52483c683f",
      "userId": "oM2yQ4okyTyY_WQu2lOsbbjZWN6w",
      "userName": "NZX_Xavier",
      "typeId": "1747492e-1dd8-4975-82f8-32b204e49891",
      "taskTitle": "每天下棋",
      "taskContent": "坚持30天",
      "taskStartTime": "2019-07-19",
      "taskEndTime": "2019-08-19",
      "taskState": "during",
      "taskMoney": 20.0,
      "supervisorNum": 3,
      "refundMoney": 0.0,
      "checkTimes": 31,
      "checkNum": 0,
      "checkFrec": "1111111",
      "matchNum": 0
    },
    {
      "taskId": "ea22f9f0-9bc4-44d6-a52d-fd120ad128d3",
      "userId": "oM2yQ4qlD4Qhy251CTO3FZOxqtwc",
      "userName": "hwenliu",
      "typeId": "1747492e-1dd8-4975-82f8-32b204e49891",
      "taskTitle": "每天跑步一小时",
      "taskContent": "每天就跑一小时",
      "taskStartTime": "2019-07-19",
      "taskEndTime": "2019-08-19",
      "taskState": "during",
      "taskMoney": 100.0,
      "supervisorNum": 3,
      "refundMoney": 0.0,
      "checkTimes": 31,
      "checkNum": 0,
      "checkFrec": "1111110",
      "matchNum": 0
    }
  ]
}
const TaskType = Mock.mock({
  "taskTypes|10": [
    {
      "typeId": "@guid",
      'typeContent': "@cword(2,3)"
    }
  ]
})
const UserDetail = {};
const taskDetail = {
  task: {
    "taskId": "02ea8987-6374-4bbd-b517-01b5159bd08e",
    "userId": "oM2yQ4jR0La_jZ8hyxkERsqNTh_8",
    "userName": "Yeung！",
    "typeId": "1747492e-1dd8-4975-82f8-32b204e49891",
    "taskTitle": "带权限任务测试",
    "taskContent": "踩踩踩踩踩踩踩踩踩踩踩踩从",
    "taskStartTime": "2019-07-24",
    "taskEndTime": "2019-09-24",
    "taskState": "during",
    "taskMoney": 200.0,
    "supervisorNum": 3,
    "refundMoney": 0.0,
    "checkTimes": 54,
    "checkNum": 0,
    "checkFrec": "1101111",
    "matchNum": 0
  },
  state: "OK"
}
const SuggestionList = Mock.mock({
  state: 'ok',
  'suggestions|1-10': [{
    'suggestionId|1': '@guid',
    'userId|1': '@guid',
    'userName|1': '@name',
    'suggestionContent|2-5': '@cword',
    'suggestionTime|1': "@date('yyyy-MM-dd hh:mm:ss')",

  }]
})

export {
  TasksList, taskDetail, TaskType, SuggestionList, CheckDetail, CheckSupervise
}

