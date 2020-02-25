import Vue from 'vue'
import Router from 'vue-router'
import users from '../views/users/UsersList'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      components: {container: () => import('@/views/LoginView')},
    },
    {
      path: '/',
      name: 'home',
      meta: {
        auth: false // 开发时用false
      },
      redirect: 'users',
      components: {container: () => import('@/views/RouterView')},
      children: [
        {
          path: 'money/recharge',
          name: 'recharge',
          meta: {
            title: '',
            auth: false // 开发时用false
          },
          components: {content: () => import('@/views/money/Recharge')}
        },
        {
          path: 'users',
          name: 'users',
          meta: {
            title: '',
            auth: false // 开发时用false
          },
          components: {content: () => import('@/views/users/UsersList')}
        },
        {
          path: 'users/AuthManage',
          name: 'AuthManage',
          meta: {
            title: '',
            auth: false // 开发时用false
          },
          components:{content: () => import('@/views/users/AuthManage')}
        },
        {
          path: 'users/id=:userId',
          name: 'detail',
          meta: {
            title: '',
            auth: false // 开发时用false
          },
          components: {content: () => import('@/views/users/UserDetail')}
        },
        {
          path: 'essays',
          name: 'essays',
          meta: {
            title: '',
            auth: false
          },
          components: {content: () => import('@/views/essays/EssaysList')}
        },
        {
          path: 'money/chart',
          name: 'chart',
          meta: {
            title: '',
            auth: false
          },
          components: {content: () => import('@/views/money/Chart')}
        },
        {
          path: 'money/moneyFlow',
          name: 'moneyFlow',
          meta: {
            title: '',
            auth: false
          },
          components: {content: () => import('@/views/money/moneyFlow')}
        },
        {
          path: 'tasks/list',
          name: 'task-list',
          meta: {
            title: '',
            auth: false
          },
          components: {content: () => import('@/views/tasks/TasksList')}
        },
        {
          path: 'tasks/id=:taskId',
          name: 'task-detail',
          meta: {
            title: '',
            auth: false
          },
          components: {content: () => import('@/views/tasks/TaskDetail')}
        },
        {
          path: 'tasks/check/check=:checkId&task=:taskId',
          name: 'check-detail',
          meta: {
            title: '',
            auth: false
          },
          components: {content: () => import('@/views/tasks/CheckDetail')}
        },
        {
          path: 'tasks/type',
          name: 'type',
          meta: {
            title: '',
            auth: false
          },
          components: {content: () => import('@/views/tasks/TasksType')}
        },
        {
          path: 'appeal',
          name: 'appeal',
          meta: {
            title: '',
            auth: false
          },
          components: {content: () => import('@/views/appeal/AppealList')}
        },
        {
          path: 'report',
          name: 'report',
          meta: {
            title: '',
            auth: false
          },
          components: {content: () => import('@/views/report/ReportList')}
        }
      ]
    },
    {
      path:'*',
      name:'404',
      meta:{auth:false},
      components: {container:()=>import('@/views/NotFound')}
    }
  ],
});
