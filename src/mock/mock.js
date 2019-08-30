import mock from 'mockjs'
import {base} from '../utils/axios'
import * as users from './users'
import * as tasks from './tasks'
import * as money from './money'
import * as supervisor from './supervisor'
import * as check from './check'
import * as essay from './essay'
import * as appeal from './appeal'
import * as report from './report'
//users
mock.mock(`${base}/admin/user/all`,'post',()=>{
  return users.UsersList()
  }
)
mock.mock(`${base}/admin/user/query`,'post',() => {
  return users.UserDetail
})
mock.mock(`${base}/admin/task/tasks`,'post',()=>{
  return users.UserTask
})
mock.mock(`${base}/admin/user/queryByKeyWord`,'post',()=>{
  return users.queryResult()
})
//money
mock.mock(`${base}/admin/moneyFlows/all`,'post',()=>{
  return money.UserMoney
})
mock.mock(`${base}/admin/moneyFlows/all`,'post',()=>{
  return money.MoneyFlowList
})
mock.mock(`${base}/admin/moneyFlows/graph`,'post',()=>{
  return money.graphData
})
//tasks
mock.mock(`${base}/taskType/allType`,'post',()=>{
  return tasks.TaskType
})
mock.mock(`${base}/admin/task/tasks`,'post',() => {
  return users.UserTask
})
mock.mock(`${base}/admin/task/detail`,'post',()=>{
  return tasks.taskDetail
})
mock.mock(`${base}/admin/task/supervisors`,'post',()=>{
  return supervisor.SupervisorsLists
})
mock.mock(`${base}/admin/task/check`,'post',()=>{
  return check.TaskChecks
})
mock.mock(`${base}/admin/suggestion/all`,'post',()=>{
  return tasks.SuggestionList
})
mock.mock(`${base}/admin/taskType/delete`,'post',()=>{
  return {status:'OK'}
})
mock.mock(`${base}/admin/task/check/detail`,'post',()=>{
  return tasks.CheckDetail
})
// mock.mock(`${base}/admin/check/supervise`,'post',()=>{
//   return tasks.CheckSupervise
// })
//essays
mock.mock(`${base}/admin/essay/all`,'post',()=>{
  return essay.EssayList
})
//appeal
mock.mock(`${base}/admin/appeal/all`,'post',()=>{
  return appeal.AppealList
})
//report
mock.mock(`${base}/admin/report/all`,'post',()=>{
  return report.ReportList
})

mock.mock(`${base}/admin/appeal/process`,'post',()=>{
  return appeal.DealResp
})

mock.mock(`${base}/admin/report/process`,'post',()=>{
  return appeal.DealResp
})

mock.mock(`${base}/admin/suggestion/pass`,'post',()=>{
  return appeal.DealResp
})

mock.mock(`${base}/admin/suggestion/deny`,'post',()=>{
  return appeal.DealResp
})

mock.mock(`${base}/admin/taskType/delete`,'post',()=>{
  return appeal.DealResp
})
