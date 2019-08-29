import mock from 'mockjs'

const EssayList = mock.mock({
    state: 'ok',
    'essaysSize|1-100': 1,
    'essays|10-20':[{
      'essayId|1':'@guid',
      'userName': '@name',
      'essayContent|1': '@cparagraph',
      'essayTime|1': "@date('yyyy-MM-dd hh:mm:ss')",
      'likeNum|1-100': 1,
      'commentNum|1-100':1,
      'img|1-4':[{
        'src': '@dataImage()'
      }]
    }]
})

export {
    EssayList
}
