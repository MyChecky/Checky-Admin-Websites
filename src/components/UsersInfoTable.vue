<template>
  <div>
    <Card>
      <div class="table-header">
        <span class="card-title">用户列表</span>
        <span class="total">总数：{{this.usersSize}}</span>
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

  export default {
    name: "UsersInfoTable",
    components: {Credit: Credit, Avatar: Avatar, SearchBar: SearchBar},
    data() {
      return {
        showBorder: false,
        showStripe: false,
        showHeader: true,
        showIndex: false,
        showCheckbox: true,
        fixedHeader: false,
        tableHeight: 600,
        pageSize: 9,
        tableSize: 1,
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
          title: '性别',
          key: 'userGender',
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
          title: '创建时间',
          key: 'userTime',
          sortable: true
        });
        columns.push({
          title: '任务数',
          key: 'taskNum',
          sortable: true
        });
        columns.push({
          title: '监督数',
          key: 'superviseNum',
          sortable: true
        });
        columns.push({
          title: '信用',
          key: 'userCredit',
          sortable: true,
          render: (h, params) => {
            return h(
              Credit,
              {
                props: {
                  score: Math.ceil(params.row.userCredit / 20)
                }
              }
            )
          }
        });
        columns.push({
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h(
              "button",
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
                  innerText: '详情'
                },
                class: ['fa', 'fa-caret-right'],
                attrs: {
                  userId: this.tableData[params.index].userId,
                },
                on: {
                  click: (e) => {// 点击事件， e 为事件参数
                    e.stopPropagation();
                    this.$router.push(`/users/id=${e.target.attributes.userId.nodeValue}`);
                  }
                }
              },
              "详情"
            );
          }
        });
        return columns;
      },
    },
    beforeMount: function () {
      if (localStorage.users === 'false') {
        this.$router.push(`/404`)
      }
      // 请求所有用户信息
      this.$api.users.queryUsersInfo({
        "page": this.page,
        "pageSize": this.pageSize,
      })
        .then((res) => {
          res.data.users.map(item => {
            item.userGender = item.userGender === 1 ? '男' : '女'
          });
          this.usersSize = res.data.total;
          this.tableData = res.data.users;
          //this.tableSize = res.data.size;
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

        this.$api.users.queryByKeyword({
          page: this.page,
          pageSize: 4,
          keyword: this.kw
        }, new CancelToken((c) => {
          this.cancel = c;
        }))
          .then(res => {
            console.log(res);
            res.data.users.map(item => {
              item.userGender = item.userGender === 1 ? '男' : '女'
            });
            this.tableData = res.data.users;
            this.usersSize = res.data.total
          })
          .catch(err => {
            console.log(err)
          })
      },
      changePage(e) {
        this.page = e;
        this.$api.users.queryUsersInfo({
          page: this.page,
          pageSize: this.pageSize,
        })
          .then((res) => {
            res.data.users.map(item => {
              item.userGender = item.userGender === 1 ? '男' : '女'
            });
            this.tableData = res.data.users;
          }).catch((err) => {
          console.log(err);
        })
      },
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
