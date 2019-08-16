# checky-ivew

> checky admin webapp with iview
## 相关程序

**项目是已经创建好的，具体的创建流程可以参考学习 [webstrom下的vue项目搭建](https://blog.csdn.net/weixin_40877388/article/details/80911934)**

> 1. WebStrom
> 2. node.js [node.js参考](https://blog.csdn.net/xmzyjr123/article/details/79428611)
> 3. Git

## 初始化
 clone 或者 download 此项目
打开 WebStorm 在terminal 终端执行下列 语句

``` bash
# install dependencies
npm install 
# serve with hot reload at localhost:8080
npm run dev 

# build for production with minification
npm run build 

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### 关于 eChart 的使用 
已经引入，安装以来之后引入可以直接引用
> 在main.js中
```javascript
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
```
具体用法参考[eChart官网](https://www.npmjs.com/package/echarts)和[一篇简书](https://www.jianshu.com/p/cf0a54374419)

## develop

### 1. 文件结构

> * asset : 静态文件，包括logo和font-awesome，font-awesome使用参考[font-awesome](http://fontawesome.dashgame.com/)
> * components>... : 一级组件，一些小的集成组件，例如登陆块，表格，图
> * mock 
> > mock.js mock对外导出接口，已在main.js中引用，会根据运行环境不同禁用，前后台开发时，请注释或禁用main.js中的require（mock）
> > users.js 用户相关接口
> * newtheme>theme : 新样式文件，目前未使用，less文件编译有问题
> * router>index ：路由控制
> * store>index ：本地存储函数，例如登陆状态
> * utils :
> > axios : 封装的axios请求
> > api : 调用后台接口函数
> > ```javascript
> > // 使用方法，在对应组件的script处引入
> > import API from '../utils/api'
> > ...
> > API.login(data)
> > ```
> * views: 二级页面，已经分配好了页面，调用一级组件组成相应页面即可
> * App.vue: 入口组件，修改务必告知所有人
> * main.js: 主函数文件，全局声明

### 2. 组件开发

> 1. 在components中声明一个新的vue文件
> 2. 编写文件和需要的接口调用函数
> 3. 实装组件到对应的view页面中

### 3. Git

> * 添加账户：file->settings->version control->github，添加自己的账户
> * 添加远端：VCS->git->remotes,添加远端仓库[https://github.com/yeung66/Checky-Admin-Websites.git](https://github.com/yeung66/Checky-Admin-Websites.git)
> * **生成项目时会自动搜索git，如果有误请：file->settings->version control->git 添加git程序地址**
> * VCS->import into version control->create git repository，新建本地仓库（如果clone,则可能已经创建了本地仓库）
> * VCS->commit，提交更改至本地git仓库
> * VCS->git->push, 提交至远端仓库

### 4. 与后台开发环境

*目前测试与生产环境配置后续更新，目前无影响*

> 前端运行环境在config->index.js中配置，运行时为localhost:8081

> 与后台交互的base_url, 在utils/axios.js中
```javascript
// 环境的切换
if (process.env.NODE_ENV === 'development') {//开发环境
  axios.defaults.baseURL = 'localhost:8080';
}
else if (process.env.NODE_ENV === 'debug') {//测试环境
  axios.defaults.baseURL = '';
}
else if (process.env.NODE_ENV === 'production') {// 生产环境
  axios.defaults.baseURL = '';
}
```

### 5. 关于Mock的使用

> Mock是前端调试时生成假数据的依赖项，前端人员可以根据接口文件编写对应数据，在运行时，mock会自动拦截axios(ajax)请求，并返回假数据，具体语法请参考[Mock.js](http://mockjs.com/examples.html)
> **Mock会拦截请求，故在前后台测试时请注释或禁用main.js中的引用部分**

### 6. 开发时路由跳转权限

> router>index.js>routes 中每一个路由对象（包括子路由对象）中`meta:{auth:[true|false]}`设置为true表示该页面需要登录权限，false不需要
> 前端人员开发时根据需要修改跳转权限，方便调试
