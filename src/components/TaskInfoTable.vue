<template>
  <div>
    <Card>
      <div class="table-header">
        <span class="card-title">任务列表</span>
        <span class="total">总数：{{tasksSize}}</span>
        <div class="search-div">
          <SearchBar :search="search" :tableNow="tableNow"></SearchBar>

        </div>
      </div>
      <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder" :stripe="showStripe"
             :show-header="showHeader" :size="tableSize" :data="tableData" :columns="tableColumns"></Table>
    </Card>
    <Page class="pager" :total="tasksSize" :page-size="pageSize" @on-change="changePage"></Page>
  </div>
</template>

<script>
  import API from '../utils/api'
  import Credit from '../components/Credit'
  import Avatar from '../components/Avatar'
  import router from '../router/index'
  import SearchBar from '../components/SearchBar'
  import axios from 'axios'

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
        tableSize: 'default',
        page: 0,
        usersSize: 0,
        stateMapping: {
          'during': '进行中',
          'finish': '已结束',
          'nomatch': '未匹配'
        },
        tableData: [],
        tasksSize: 0,
        cancel: null,

        tableNow: "timeNickTitle",
        startTime: "1970-01-01",
        endTime: "2999-01-01",
        searchType: "",
        keyword: "",
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
          title: '任务ID',
          key: 'taskId',
          width: 190
        });
        columns.push({
          title: '用户ID',
          key: 'userId',
          width: 190
        });
        columns.push({
          title: '用户昵称',
          key: 'userName',
          width: 100,
          render: (h, params) => {
            return h(
              "a",
              {
                class: ['fa'],
                attrs: {
                  userId: this.tableData[params.index].userId,
                },
                on: {
                  click: (e) => {// 点击事件， e 为事件参数
                    e.stopPropagation();
                    console.log(e.target.attributes.userId);
                    this.$router.push('/users/id=' + this.tableData[params.index].userId)
                  }
                }
              },
              this.tableData[params.index].userName,
            );
          }
        });
        columns.push({
          title: '任务标题',
          key: 'taskTitle',
          width: 180
        });
        columns.push({
          title: '开始时间',
          key: 'taskStartTime',
          width: 120,
          sortable: true
        });
        columns.push({
          title: '结束时间',
          key: 'taskEndTime',
          width: 120,
          sortable: true
        });
        columns.push({
          title: '监督人数',
          key: 'supervisorNum',
          width: 100,
          align: 'center',
        });
        columns.push({
          title: '状态',
          key: 'taskState',
          width: 100,
          filterMultiple: false,
          filters: [
            {
              label: '已结束',
              value: '已结束'
            },
            {
              label: '进行中',
              value: '进行中'
            },
            {
              label: '未匹配',
              value: '未匹配'
            }
          ],
          filterMethod(value, row) {
            return row.taskState === value;
          }
        });
        columns.push({
          title: '操作',
          key: 'action',
          width: 120,
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
                    console.log(this.tableData[params.index].taskId);
                    e.stopPropagation();
                    this.$router.push('/tasks/id=' + this.tableData[params.index].taskId)
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
      if (localStorage.tasks === 'false') {
        this.$router.push(`/404`)
      }
      // 请求所有信息
      API.tasks.getTasks({
        "page": this.page,
        "pageSize": this.pageSize
      })
        .then((res) => {
          res.data.tasks.map(item => {
            item.taskState = this.stateMapping[item.taskState]
          });
          console.log(res.data.tasks);
          this.tableData = res.data.tasks;
          this.tasksSize = res.data.total
        }).catch((err) => {
        console.log(err);
      })
    },
    mounted() {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 120;
    },
    methods: {
      // detail(index){
      //   console.log(this.tableData.indexOf(index));
      // }
      search: function (startTime, endTime, keyword, searchType, page) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.searchType = searchType;
        this.page = page;
        this.keyword = keyword;
        // 解决异步问题
        if (this.cancel) {// 存在上一次请求则取消
          this.cancel();
        }
        console.log(`搜索${this.keyword},页码${this.page}`);
        console.log("taskChangePage", this.startTime, this.endTime, this.keyword, this.searchType)
        // 定义CancelToken，它是axios的一个属性，且是一个构造函数
        let CancelToken = axios.CancelToken;

        this.$api.tasks.queryTaskByKeyword({
          startTime: this.startTime, endTime: this.endTime, searchType: this.searchType,
          keyword: this.keyword, page: this.page, pageSize: this.pageSize
        }, new CancelToken((c) => {
          this.cancel = c;
        }))
          .then(res => {
            console.log(res);
            this.tableData = res.data.tasks;
            this.tasksSize = res.data.total;
          })
          .catch(err => {
            console.log(err)
          })
      },
      changePage(e) {
        this.page = e;
        console.log(this.page);
        console.log("taskChangePage", this.startTime, this.endTime, this.keyword, this.searchType)
        if (this.cancel) {// 存在上一次请求则取消
          this.cancel();
        }
        console.log(`搜索${this.keyword},页码${this.page}`);
        // 定义CancelToken，它是axios的一个属性，且是一个构造函数
        let CancelToken = axios.CancelToken;
        this.$api.tasks.queryTaskByKeyword({
            startTime: this.startTime, endTime: this.endTime, searchType: this.searchType,
            keyword: this.keyword, page: this.page, pageSize: this.pageSize
          },
          new CancelToken((c) => {
            this.cancel = c;
          }))
          .then(res => {
            console.log(res);
            this.tableData = res.data.tasks;
            this.tasksSize = res.data.total;
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped>
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

  .card-title {
    font-weight: 600;
    color: #333;
    font-size: 20px;
    margin-right: 10px;
  }
</style>
