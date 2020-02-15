<template>
  <div>
    <Card>
      <div class="table-header">
        <span class="card-title">管理员列表</span>
        <span class="total">总数：{{usersSize}}</span>
        <div class="search-div">
          <SearchBar :search="search"></SearchBar>
        </div>
      </div>
      <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder" :stripe="showStripe"
             :show-header="showHeader" :size="tableSize" :data="tableData" :columns="tableColumns"></Table>
    </Card>
    <Page class="pager" :total="usersSize" :page-size="pageSize" @on-change="changePage"></Page>
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
    name: "UsersAuthTable",
    components: {Credit: Credit, Avatar: Avatar, SearchBar: SearchBar,Authorize: Authorize},
    data() {
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
        usersSize: 0,
        tableData: [],
        cancel: null,
        kw: ""
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
            width: 60,
            align: 'center'
          })
        }
        columns.push({
          title: '用户ID',
          key: 'userId',
          width: 200
        });
        columns.push({
          title: '头像',
          key: 'userAvatar',
          render: (h, params) => {
            return h(
              Avatar,
              {
                props: {
                  source: params.row.userAvatar
                }
              }
            )
          }
        });
        columns.push({
          title: '昵称',
          key: 'userName'
        });
        columns.push({
          title: '角色',
          key: 'actor',
          align: 'center',
          render: (h, params) => {
            return h(
              "actor",
              {
                domProps: {
                  innerText: 'admin'
                },
                attrs: {
                  userId: this.tableData[params.index].userId,
                },
              }
            )
          }
        });
        columns.push({
          title: '性别',
          key: 'userGender',
          align: 'center',
          filterMultiple: false,
          filters: [
            {
              label: '男',
              value: '男'
            },
            {
              label: '女',
              value: '女'
            }
          ],
          filterMethod(value, row) {
            return row.userGender === value;
          }
        });
        columns.push({
          title: '审核',
          key: 'qualify',
          align: 'center',
          render: (h, params) => {
            return h(
              "qualify",
              {
                style: {
                  padding: '5px 10px',
                  backgroundColor: '#2b85e4',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '2px',
                  cursor: 'pointer'
                },
                domProps: {
                  innerText: ' ✔ '
                },
                //class:['fa','fa-caret-right'],
                attrs: {
                  userId: this.tableData[params.index].userId,
                },
              },
            )
          }
        });
        columns.push({
          title: '删除',
          key: 'delete',
          align: 'center',
          render: (h, params) => {
            return h
            (
              "delete",
              {
                style: {
                  padding: '5px 10px',
                  backgroundColor: '#c00b07',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '2px',
                  cursor: 'pointer'
                },
                domProps: {
                  innerText: ' X '
                },
                //class:['fa','fa-caret-right'],
                attrs: {
                  userId: this.tableData[params.index].userId,
                },
              },
            );
          }
        });
        columns.push({
          title: '查看',
          key: 'view',
          align: 'center',
          render: (h, params) => {
            return h(
              "qualify",
              {
                style: {
                  padding: '5px 10px',
                  backgroundColor: '#2b85e4',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '2px',
                  cursor: 'pointer'
                },
                domProps: {
                  innerText: ' ✔ '
                },
                //class:['fa','fa-caret-right'],
                attrs: {
                  userId: this.tableData[params.index].userId,
                },
              },
            )
          }
        });
        columns.push({
          title: '授权',
          key: 'authorize',
          align: 'center',
          render: (h, params) => {
            return h(
              Authorize,
              {
                props:{
                  sources: params.Authorize
                }
              }
            );
          }
        });
        return columns;
      },
    },
    beforeMount: function () {
      // 请求所有用户信息
      this.$api.users.queryUsersInfo({"page": this.page}).then((res) => {
        res.data.users.map(item => {
          item.userGender = item.userGender === 1 ? '男' : '女'
        });
        this.usersSize = res.data.usersSize;
        this.tableData = res.data.users;
      }).catch((err) => {
        console.log(err);
      })
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

        this.$api.users.queryByKeyword({page: this.page, keyword: this.kw}, new CancelToken((c) => {
          this.cancel = c;
        }))
          .then(res => {
            console.log(res)
            this.tableData = res.data.users
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
