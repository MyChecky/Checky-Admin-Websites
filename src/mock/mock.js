import mock from 'mockjs'
import {base} from '../utils/axios'
import * as users from './users'

mock.mock(`${base}/admin/user/all`,'post',() => {
  return users.UsersList
})
