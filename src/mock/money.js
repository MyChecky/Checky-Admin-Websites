import Mock from 'mockjs'

const UserMoney = Mock.mock({
  status: 'OK',
  type: 'userId',
  moneyFlowsSize: 10,
  "moneyFlows|5-10": [
    {
      "flowId":"@guid",
      "taskId":"@guid",
      "UserName":"@guid",
      "ifRealMoney|1":[
        "是","否"],
      "FlowDir|1":[
        "入账","出账"],
      "flowMoney|0-200": 1,
      "type|1":[
        "支付","退款","奖励"],
      "flowTime":"@date('yyyy-MM-dd')"
    }
  ]
})

const MoneyFlowList = Mock.mock({
  status: 'OK',
  type: 'userId',
  "moneyFlows|5-10": [
    {
      "flowId":"@guid",
      "taskId":"@guid",
      "UserName":"@guid",
      "ifRealMoney|1":[
        "是","否"],
      "FlowDir|1":[
        "入账","出账"],
      "flowMoney|0-200": 1,
      "type|1":[
        "支付","退款","奖励"],
      "flowTime":"@date('yyyy-MM-dd')"
    }
  ]
})


const RechargeList = Mock.mock({
  status: 'OK',
  type: 'userId',
  moneyRechargeSize: 10,
  "moneyRecharge|5-10": [
    {
      "chargeId":"@guid",
      "orderId":"@guid",
      "userId":"@guid",
      "rechargeMoney|0-200": 1,
      "orderType|1":[
        "充值","提现"],
      "chargeTime":"@date('yyyy-MM-dd')"
    }
  ]
})

const graphData = Mock.mock({
  "income|12":["@float(10, 30,0,2)"],
  "benefit|12":["@float(10, 30,0,2)"],
  "refund|12":["@float(10, 30,0,2)"]
})
export {
  UserMoney, MoneyFlowList,graphData,RechargeList
}
