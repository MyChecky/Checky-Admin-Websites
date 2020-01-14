<template>
  <Menu mode="vertical" active-name="['users']" :open-names="['tasks','money']" style="height: 100%;width: auto;padding-top: 10px;">
    <div class="logo-div">Checky</div>
    <MenuItem name="users" key="1" to="/users">
      <Icon type="stats-bars" size="22px"></Icon>
      用户列表
    </MenuItem>
    <MenuItem name="essays" key="2" to="/essays">
      <Icon type="stats-bars" size="22px"></Icon>
      动态列表
    </MenuItem>
    <Submenu name="money" key="3">
      <template slot="title">
        <Icon type="stats-bars" size="22px"></Icon>
        资金管理
      </template>
      <MenuItem name="money/chart" key="3-1" >统计图</MenuItem>
      <MenuItem name="money/payback" key="3-2" >退还管理</MenuItem>
    </Submenu>
    <Submenu name="tasks" key="4">
      <template slot="title">
        <Icon type="stats-bars" size="22px"></Icon>
        任务列表
      </template>
      <MenuItem name="tasks/list" key="4-1" >任务列表</MenuItem>
      <MenuItem name="tasks/type" key="4-2" >类型建议</MenuItem>
    </Submenu>
    <MenuItem name="appeal" key="5" >
      <Icon type="stats-bars" size="22px"></Icon>
      申诉列表
    </MenuItem>
    <MenuItem name="report" key="6" >
      <Icon type="stats-bars" size="22px"></Icon>
      举报列表
    </MenuItem>
    <MenuItem name="AuthManage" key="7" to="#">
      <Icon type="ios-key" size="22px"></Icon>
      权限管理
    </MenuItem>
  </Menu>
</template>
<script>
  export default {
    name: 'RouteMenu',
    data() {
      return {
        spanLeft: 5,
        spanRight: 19
      }
    },
    computed: {
      iconSize() {
        return this.spanLeft === 5 ? 14 : 24;
      }
    },
    methods: {
      navigateTo (name){
        // this.$router.push(name);
        console.log(this.$router);
      }
    }
  }
</script>
<style scoped>
  .layout-header {
    position: fixed;
    height: 60px;
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .logo-div {
    border-radius: 5px;
    color: #fff;
    background-color: #e83015;
    margin: 0px auto 15px auto;
    width: 90%;
    height: 60px;
    box-sizing: content-box;
  }

  .header-breadcrumb {
    margin: 0px 10px;
  }

  .content {

  }
</style>
