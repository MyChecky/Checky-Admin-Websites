import mock from 'mockjs'

const SupervisorsLists = mock.mock({
    state: 'ok',
    "supervisors|3": [{
        "userId|1" : "@guid",
        "userName|1": "@name",
        "addTime|1": "@date('yyyy-MM-dd')",
        "superviseNum|1-100": 1,
        "benifit|1-100.2": 1.11, 
    }]
})

export {
    SupervisorsLists
}