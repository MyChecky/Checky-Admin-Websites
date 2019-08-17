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
        auth: true // 开发时用false
      },
      redirect: 'users',
      components: {container: () => import('@/views/RouterView')},
      children: [
        {
          path: 'users',
          name: 'users',
          meta: {
            title: '',
            auth: true // 开发时用false
          },
          components: {content: () => import('@/views/users/UsersList')}
        },
        {
          path: 'users/:userId',
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
            auth: true
          },
          components: {content: () => import('@/views/essays/EssaysList')}
        },
        {
          path: 'money/chart',
          name: 'chart',
          meta: {
            title: '',
            auth: true
          },
          components: {content: () => import('@/views/money/Chart')}
        },
        {
          path: 'money/payback',
          name: 'payback',
          meta: {
            title: '',
            auth: true
          },
          components: {content: () => import('@/views/money/PayBack')}
        },
        {
          path: 'tasks/list',
          name: 'task-list',
          meta: {
            title: '',
            auth: true
          },
          components: {content: () => import('@/views/tasks/TasksList')}
        },
        {
          path: 'tasks/type',
          name: 'type',
          meta: {
            title: '',
            auth: true
          },
          components: {content: () => import('@/views/tasks/TasksType')}
        },
        {
          path: 'appeal',
          name: 'appeal',
          meta: {
            title: '',
            auth: true
          },
          components: {content: () => import('@/views/appeal/AppealList')}
        },
        {
          path: 'report',
          name: 'report',
          meta: {
            title: '',
            auth: true
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
