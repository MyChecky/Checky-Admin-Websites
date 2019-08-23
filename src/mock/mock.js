import mock from 'mockjs'
import {base} from '../utils/axios'
import * as users from './users'
import * as tasks from './tasks'
import * as money from './money'

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
