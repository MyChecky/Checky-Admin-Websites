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
      "ifTest|1":[
        "1","0"],
      "flowIo|1":[
        "I","O"],
      "flowMoney|0-200": 1,
      "flowType|1":[
        "pay","refund","award"],
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
      "ifTest|1":[
        "1","0"],
      "flowIo|1":[
        "I","O"],
      "flowMoney|0-200": 1,
      "flowType|1":[
        "pay","refund","award"],
      "flowTime":"@date('yyyy-MM-dd')"
    }
  ]
})


const UserRecharge = Mock.mock({
  status: 'OK',
  type: 'userId',
  moneyRechargeSize: 10,
  "userRecharge|5-10": [
    {
      "chargeId":"@guid",
      "orderId":"@guid",
      "userId":"@guid",
      "rechargeMoney|0-200": 1,
      "orderType|1":[
        "pay","withdraw"],
      "chargeTime":"@date('yyyy-MM-dd')"
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
        "pay","withdraw"],
      "chargeTime":"@date('yyyy-MM-dd')"
    }
  ]
})

const graphData = Mock.mock({
  "trueIncomeList|12":["@float(10, 30,0,2)"],
  "trueRefundList|12":["@float(10, 30,0,2)"],
  "trueBenefitList|12":["@float(10, 30,0,2)"],
  "testRefundList|12":["@float(10, 30,0,2)"],
  "testIncomeList|12":["@float(10, 30,0,2)"],
  "testBenefitList|12":["@float(10, 30,0,2)"],
})
export {
  UserMoney, MoneyFlowList,graphData,RechargeList,UserRecharge
}
