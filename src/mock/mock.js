import mock from 'mockjs'
import {base} from '../utils/axios'
import * as users from './users'
import * as tasks from './tasks'

mock.mock(`${base}/admin/user/all`,'post',() => {
  return users.UsersList
})

mock.mock(`${base}/admin/tasks`,'post',() => {
  return tasks.TasksList
})
