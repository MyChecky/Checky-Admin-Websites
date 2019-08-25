import Mock from 'mockjs'

const AppealList = Mock.mock({
    state:'ok',
    'appeals|1-8': [{
        'appealId|1':'@guid',
        'userId':'@guid',
        'userName':'@cname',
        'taskId':'@guid',
        'checkId':'@guid',
        'appealContent|1':'@cparagraph',
        'appealTime': "@date('yyyy-MM-dd hh:mm:ss')",

    }]
})

export {
    AppealList
}