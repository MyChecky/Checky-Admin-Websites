import mock from 'mockjs'

const TaskChecks = mock.mock({
    state: 'ok',
    'checks|0-15': [{
        'checkId|1':'@guid',
        'checkTime|1':"@date('yyyy-MM-dd hh-mm-ss')",
        'superviseNum|0-5':1,
        'passNum|0-5':1,
        'checkState|1': [
            'unknown','pass','deny'
        ],

    }]
})

export {
    TaskChecks
}