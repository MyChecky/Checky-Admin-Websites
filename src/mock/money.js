import Mock from 'mockjs'

const UserMoney = Mock.mock({
  status: 'OK',
  type: 'userId',
  "moneyFlows|1-5": [
    {
      "flowId":"@guid",
      "fromUserId":"@guid",
      "toUserId":"@guid",
      "taskId":"@guid",
      "flowMoney|0-200.1-2": 1,
      "flowTime":"@date('yyyy-MM-dd')"
    }
  ]
})

const MoneyFlowList = Mock.mock({
  status: 'OK',
  type: 'userId',
  "moneyFlows|1-5": [
    {
      "flowId":"@guid",
      "fromUserId":"@guid",
      "fromUserName":"@name",
      "toUserId":"@guid",
      "toUserName":"@name",
      "taskId":"@guid",
      "flowMoney|0-200.1-2": 1,
      "flowTime":"@date('yyyy-MM-dd')"
    }
  ]
})

export {
  UserMoney, MoneyFlowList
}
