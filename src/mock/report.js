import Mock from 'mockjs'

const ReportList = Mock.mock({
    state:'ok',
    'reports|1-10': [{
        'reportId|1':'@guid',
        'userId':'@guid',
        'userName':'@cname',
        'reportType|0-1':1,
        'objectId': '@guid',
        
        'reportContent|1':'@cparagraph',
        'reportTime': "@date('yyyy-MM-dd hh:mm:ss')",

    }]
})

export {
    ReportList
}