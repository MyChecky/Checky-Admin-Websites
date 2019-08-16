import Mock from 'mockjs'

const UsersList = {
  status: 'OK',
  usersSize: 100,
  users: Mock.mock({
    "users|10":[
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
};

const UserDetail = {

};
export {
  UsersList,UserDetail
}
