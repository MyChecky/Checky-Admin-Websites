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

mock.mock(`${base}/admin/user/all`,'post',()=>{
  return users.UsersList()
  }
)
mock.mock(`${base}/admin/user/query`,'post',() => {
  return users.UserDetail
})
mock.mock(`${base}/admin/tasks`,'post',()=>{
  return users.UserTask
})

mock.mock(`${base}/taskType/allType`,'post',()=>{
  return tasks.TaskType
})

mock.mock(`${base}/admin/moneyFlows`,'post',()=>{
  return money.UserMoney
})
mock.mock(`${base}/admin/tasks`,'post',() => {
  return tasks.TasksList
})

mock.mock(`${base}/task/queryTask`,'post',()=>{
  return tasks.taskDetail
})


mock.mock(`${base}/admin/supervisors`,'post',()=>{
  return supervisor.SupervisorsLists
})

mock.mock(`${base}/admin/checks`,'post',()=>{
  return check.TaskChecks
})

mock.mock(`${base}/admin/essays`,'post',()=>{
  return essay.EssayList
})

mock.mock(`${base}/taskType/suggestions`,'post',()=>{
  return tasks.SuggestionList
})

mock.mock(`${base}/admin/appeals`,'post',()=>{
  return appeal.AppealList
})

mock.mock(`${base}/admin/reports`,'post',()=>{
  return report.ReportList
})