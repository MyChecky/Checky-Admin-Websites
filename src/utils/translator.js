import api from './api'
let types = {};
api.tasks.queryType().then(res=>{
  // 获取任务类型
  res.data.types.forEach(item=>{
    types[item.typeId] = item.typeContent
  })
}).catch(err=>{
  console.log(err)
});
const dictionary = {
  "taskType":types,
  "userGender": {
    1: '男',
    2: '女'
  },
  "taskState":{
    "nomatch":"未匹配",
    "fail":"失败",
    "success":"完成",
    "during":"进行中"
  },
  "checkState":{
    "unknown":"未判定",
    "pass": "已通过",
    "deny": "不通过"
  },
  "reportType":{
    0:"动态",
    1:"用户"
  }
};
const translator = function (dataType,value) {
  return dictionary[dataType][value]
};
export {
  translator,dictionary
}
