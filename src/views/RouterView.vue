<template>
  <Row type="flex" style="height: 100%;width: 100%;">
    <i-col :span="spanLeft">
      <Menu mode="vertical" active-name="users" style="height: 100%;width: auto;padding-top: 10px;">
        <div class="logo-div">
          <!--<img class="logo" src="../assets/Checky-logo.png" alt="Checky-logo">-->
          <div :class="['slogan']">Checky</div>
        </div>
        <MenuItem name="users" key="1-1" to="/users" v-if="menus.users">
          <span :style="iconSize" class="item-icon fa fa-fw fa-users"></span>
          <span :class="[display,'item-tag']">用户列表</span>
        </MenuItem>
        <MenuItem name="AuthManage" key="1-2" to="/users/AuthManage" v-if="menus.admin">
          <span :style="iconSize" class="item-icon fa fa-fw fa-user-secret"></span>
          <span :class="[display,'item-tag']">权限设置</span>
        </MenuItem>
        <MenuItem name="essays" key="2" to="/essays" v-if="menus.essays">
          <span :style="iconSize" class="item-icon fa fa-fw fa-heart"></span>
          <span :class="[display,'item-tag']">动态列表</span>
        </MenuItem>

        <Submenu name="tag" key="7" v-if="menus.admin">
          <template slot="title">
            <span :style="iconSize" class="item-icon fa fa-fw fa-line-chart"></span>
            <div :class="[display,'item-tag']">标签管理</div>
          </template>
          <MenuItem name="typeManage" key="7-1" to="/tags/type">
            <span :style="iconSize" class="item-icon fa fa-fw fa-bandcamp"></span>
            <div :class="[display,'item-tag']">类型管理</div>
          </MenuItem>
          <MenuItem name="tagManage" key="7-2" to="/tags/tag">
            <span :style="iconSize" class="item-icon fa fa-fw fa-refresh"></span>
            <div :class="[display,'item-tag']">标签管理</div>
          </MenuItem>
          <MenuItem name="topicManage" key="7-3" to="/tags/topic">
            <span :style="iconSize" class="item-icon fa fa-fw fa-book"></span>
            <div :class="[display,'item-tag']">话题管理</div>
          </MenuItem>
        </Submenu>

        <Submenu name="money" key="3" v-if="menus.money">
          <template slot="title">
            <span :style="iconSize" class="item-icon fa fa-fw fa-cny"></span>
            <div :class="[display,'item-tag']">资金管理</div>
          </template>
          <MenuItem name="chart" key="3-1" to="/money/chart">
            <span :style="iconSize" class="item-icon fa fa-fw fa-bar-chart"></span>
            <div :class="[display,'item-tag']">统计图</div>
          </MenuItem>
          <MenuItem name="moneyFlow" key="3-2" to="/money/moneyFlow">
            <span :style="iconSize" class="item-icon fa fa-fw fa-refresh"></span>
            <div :class="[display,'item-tag']">流水记录</div>
          </MenuItem>
          <MenuItem name="recharge" key="3-3" to="/money/recharge">
            <span :style="iconSize" class="item-icon fa fa-fw fa-money"></span>
            <div :class="[display,'item-tag']">充值记录</div>
          </MenuItem>
<!--          <MenuItem name="personalChart" key="3-4" to="/money/PersonalChart">-->
<!--            <span :style="iconSize" class="item-icon fa fa-fw fa-line-chart"></span>-->
<!--            <div :class="[display,'item-tag']">个人统计图</div>-->
<!--          </MenuItem>-->
        </Submenu>

        <MenuItem name="tasks" key="4-1" v-if="menus.tasks" to="/tasks/list">
          <span :style="iconSize" class="item-icon fa fa-fw fa-tasks"></span>
          <span :class="[display,'item-tag']">任务列表</span>
        </MenuItem>
        <MenuItem name="type" key="4-2" v-if="menus.tasks" to="/tasks/type">
          <span :style="iconSize" class="item-icon fa fa-fw fa-envelope"></span>
          <span :class="[display,'item-tag']">类型建议</span>
        </MenuItem>
        <MenuItem name="appeal" key="5" to="/appeal" v-if="menus.appeal">
          <span :style="iconSize" class="item-icon fa fa-fw fa-hand-paper-o"></span>
          <div :class="[display,'item-tag']">申诉列表</div>
        </MenuItem>
        <MenuItem name="report" key="6" to="/report" v-if="menus.report">
          <span :style="iconSize" class="item-icon fa fa-fw fa-exclamation-circle"></span>
          <div :class="[display,'item-tag']">举报列表</div>
        </MenuItem>
      </Menu>
    </i-col>
    <i-col :span="spanRight" class="layout-right">
      <div class="layout-header">
        <span class="fa fa-chevron-circle-left" :class="[rotate,'menu-button']" @click="toggleClick"></span>
        <Header></Header>
      </div>
      <div class="content">
        <router-view name="content"></router-view>
      </div>
    </i-col>
  </Row>
</template>

<script>
  import Header from '../components/Header'

  export default {
    name: "BlankView",
    components: {
      Header: Header
    },
    data() {
      return {
        spanLeft: 3,
        spanRight: 21,
        display: 'item-tag-active',
        rotate: '',
        menus: {
          users: true,
          admin: false,
          essays: false,
          money: false,
          tasks: false,
          parameter: false,
          appeal: false,
          report: false,
        }
      }
    },
    computed: {
      iconSize() {
        return this.spanLeft === 3 ? 'font-size: 14px' : 'font-size: 24px';
      }
    },
    beforeMount: function () {
      console.log(localStorage);
      this.menus.users = localStorage.users === "true";
      this.menus.admin = localStorage.admin === "true";
      this.menus.essays = localStorage.essays === "true";
      this.menus.money = localStorage.money === "true";
      this.menus.tasks = localStorage.tasks === "true";
      this.menus.parameter = localStorage.parameter === "true";
      this.menus.appeal = localStorage.appeal === "true";
      this.menus.report = localStorage.report === "true";
      console.log(this.menus)
    },
    methods: {
      toggleClick() {
        if (this.spanLeft === 3) {
          this.spanLeft = 2;
          this.spanRight = 22;
          this.display = 'item-tag-hidden';
          this.rotate = 'fa-rotate-180';
        } else {
          this.spanLeft = 3;
          this.spanRight = 21;
          this.display = '';
          this.rotate = '';
        }
      },
    }
  }
</script>

<style>
  .ivu-menu-submenu-title {
    padding: 14px 5px 14px 24px !important;
  }

  a.ivu-menu-item, div.ivu-menu-submenu-title {
    display: flex;
  }

  .ivu-menu-submenu-title-icon {
    right: 4px !important;
  }

  .item-tag {
    max-width: 100px;
    max-height: 100px;
    margin: 0;
  }

  .item-tag-hidden {
    transition: 0.2s ease-in;
    overflow: hidden;
    max-width: 0;
    max-height: 0;
  }

  .item-icon {
    padding-top: 4px;
    transition: 0.2s 0.1s ease-in;
  }

  .ivu-col {
    transition: width .2s ease-in-out
  }

  .layout-header {
    height: 70px;
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid rgba(200, 200, 200, 0.5);
  }

  .logo-div {
    border-radius: 5px;
    color: #e83015;
    background-color: #fff;
    margin: 0px auto 15px auto;
    width: 90%;
    height: 60px;
    box-sizing: content-box;
    display: flex;
  }

  .logo {
    width: 60px;
    height: 60px;
    background-size: cover;
    margin: 5px;
  }

  .slogan {
    margin: 5px;
    color: #e83015;
    font-size: 22px;
    line-height: 60px;
    font-weight: 600;
  }

  .header-breadcrumb {
    font-size: 18px;
    margin: 0px 10px;
  }

  .content {
    width: 100%;
    height: calc(100% - 70px);
    background-color: #f3f5f5;
    padding: 10px;
  }

  .menu-button {
    color: #666;
    cursor: pointer;
    margin: 5px 10px;
    font-size: 22px;
    transition: 0.3s 0.1s ease-in-out;
  }
</style>
