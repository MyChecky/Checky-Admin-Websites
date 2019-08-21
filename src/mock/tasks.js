import Mock from 'mockjs'

const TaskType = Mock.mock({
  status: 'OK',
  "types|1-5": [
    {
      "typeId": "@guid",
      'typeContent': "@cword(2,3)"
    }
  ]
})

export {
  TaskType
}
