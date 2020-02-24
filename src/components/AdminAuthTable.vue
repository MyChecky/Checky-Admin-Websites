<template>
  <div>
    <Card>
      <div class="table-header">
        <span class="card-title">管理员列表</span>
        <span class="total">总数：{{adminsSize}}</span>
        <div class="search-div">
          <SearchBar :search="search"></SearchBar>
        </div>
      </div>
      <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder" :stripe="showStripe"
             :show-header="showHeader" :size="tableSize" :data="tableData" :columns="tableColumns"></Table>
    </Card>
    <Page class="pager" :total="adminsSize" :page-size="pageSize" @on-change="changePage"></Page>
  </div>
</template>

<script>
  import SearchBar from '../components/SearchBar'
  import API from '../utils/api'
  import Credit from '../components/Credit'
  import Avatar from '../components/Avatar'
  import axios from 'axios';
  import Authorize from "./Authorize";

  export default {
    name: "AdminAuthTable",
    components: {Credit: Credit, Avatar: Avatar, SearchBar: SearchBar, Authorize: Authorize},
    data: function () {
      return {
        showBorder: false,
        showStripe: false,
        showHeader: true,
        showIndex: false,
        showCheckbox: true,
        fixedHeader: false,
        tableHeight: 600,
        pageSize: 10,
        tableSize: 'default',
        page: 0,
        adminsSize: 0,
        tableData: [],
        cancel: null,
        kw: "",
        department: "",
        formData: []
      }
    },
    computed: {
      tableColumns() {
        let columns = [];
        if (this.showCheckbox) {
          columns.push({
            type: 'selection',
            width: 60,
            align: 'center'
          })
        }
        if (this.showIndex) {
          columns.push({
            type: 'index',
            width: 90,
            align: 'center'
          })
        }
        columns.push({
          title: '用户ID',
          key: 'userId',
          align: 'center',
          width: 150
        });
        columns.push({
          title: '昵称',
          key: 'userName',
          align: 'center',
          width: 150
        });
        columns.push({
          title: '部门',
          key: 'department',
          align: 'center',
          width: 150
        });
        columns.push({
          title: '电话',
          key: 'userTel',
          align: 'center',
          width: 200
        });
        columns.push({
          title: '邮箱',
          key: 'userEmail',
          align: 'center',
          width: 200
        });
        columns.push({
          title: '授权',
          key: 'authorize',
          align: 'center',
          render: (h,params) => {
            return h(
              Authorize,
              {
                style:{
                  backgroundColor: '#2b85e4',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '2px',
                  cursor: 'pointer'
                },
                class:'fa',
                Props:{
                  sources:params.Authorize
                },
                attrs: {
                  userId: this.tableData[params.index].userId,
                },
                on: {
                  click: (e) => {// 点击事件， e 为事件参数
                    let id = this.tableData[params.index].userId;
                    e.stopPropagation();
                    //this.$router.push(`/authorize/id=${e.target.attributes.userId.nodeValue}`);
                    console.log("tableData[params.index]",this.tableData[params.index].userId);
                    this.$api.admins.queryAdmin({
                      userId: id,
                    })
                      .then(res => {
                        console.log("res",res.data.admin);
                        this.formData = res.data.admin;
                        console.log("formData",this.formData);
                      })
                      .catch(err => {
                        console.log(err)
                      })
                  }
                }
              },
              "更改权限"
            );
          }
        });
        return columns;
      },
    },
    beforeMount: function () {
      // 请求所有用户信息
      this.$api.admins.queryAdminsInfo({"page": this.page}).then((res) => {
        this.adminsSize = res.data.adminsSize;
        this.tableData = res.data.admins;
      }).catch((err) => {
        console.log(err);
      });
      //查询当前登录用户的部门
      if (localStorage.department === '"money"' || localStorage.department === '"task"') {
        this.$router.push(`/404`)
      }
    },
    mounted() {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 125;
    },
    methods: {
      search: function (keyword, page) {
        this.page = page;
        this.kw = keyword;
        // 解决异步问题
        if (this.cancel) {// 存在上一次请求则取消
          this.cancel();
        }
        console.log(`搜索${this.kw},页码${this.page}`);
        // 定义CancelToken，它是axios的一个属性，且是一个构造函数
        let CancelToken = axios.CancelToken;

        this.$api.admins.queryByKeyword({page: this.page, keyword: this.kw}, new CancelToken((c) => {
          this.cancel = c;
        }))
          .then(res => {
            console.log(res);
            console.log(res.data.admins);
            this.tableData = res.data.admins
          })
          .catch(err => {
            console.log(err)
          })
      },
      changePage(e) {
        this.page = e
        if (this.kw) {
          this.search(this.kw, this.page)
        } else {
          console.log(`查询全部${this.kw},页码${this.page}`);
          this.$api.users.queryUsersInfo({"page": this.page}).then((res) => {
            res.data.users.map(item => {
              item.userGender = item.userGender === 1 ? '男' : '女'
            });
            console.log(res.data.users);
            this.usersSize = res.data.usersSize;
            this.tableData = res.data.users;
          }).catch((err) => {
            console.log(err);
          })
        }
      },
      getAdminFormData: function (id) {
        this.$api.admins.queryAdmin({
          userId: id,
        })
          .then(res => {
            console.log("res",res.data.admins);
            this.formData = res.data.admins;
            console.log("formData",this.formData);
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped>
  .table-header {
    margin-bottom: 10px;
    display: flex;
    align-items: flex-end;
  }

  .search-div {
    flex-grow: 5;
    display: flex;
    justify-content: flex-end;
  }

  .table {
    margin: auto 0px;
    height: 100%;
  }

  .pager {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 5px auto;
  }

  .card-title {
    font-weight: 600;
    color: #333;
    font-size: 20px;
    margin-right: 10px;
  }
</style>
