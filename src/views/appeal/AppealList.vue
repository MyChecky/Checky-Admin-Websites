<template>
  <div>
    <Card>
      <div class="table-header">
        <span class="card-title">申诉列表</span>
        <span class="total">总数：{{appealsSize}}</span>
        <div class="search-div">
          <SearchBar :search="search" :tableNow="tableNow"></SearchBar>
        </div>
      </div>
      <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder" :stripe="showStripe"
             :show-header="showHeader" :size="tableSize" :data="tableData" :columns="tableColumns"></Table>
    </Card>
    <Page class="pager" :total="appealsSize" :page-size="pageSize" @on-change="changePage"></Page>
    <BackTop></BackTop>
  </div>
</template>

<script>
  import API from '../../utils/api'
  import SearchBar from '../../components/SearchBar'
  import axios from 'axios'

  export default {
    components: {
      SearchBar: SearchBar
    },
    data() {
      return {
        showBorder: false,
        showStripe: false,
        showHeader: true,
        showIndex: false,
        showCheckbox: false,
        fixedHeader: false,
        tableHeight: 600,
        pageSize: 5,
        tableSize: 'default',
        page: 0,
        appealsSize: 0,
        tableData: [],
        cancel: null,

        tableNow: "timeNickContent",
        startTime: "1970-01-01",
        endTime: "2999-01-01",
        searchType: "",
        keyword: "",
      }
    },
    computed: {
      tableColumns: function () {
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
          title: '申诉ID',
          key: 'appealId',
          width: 180,
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  display: ['inline-block'],
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                },
                domProps: {
                  title: this.tableData[params.index].appealId
                }
              }, this.tableData[params.index].appealId)
            ]);
          }
        });
        columns.push({
          title: '申诉用户ID',
          key: 'userId',
          width: 200,
          render: (h, params) => {
            return h('div', [
              h('a', {
                style: {
                  display: ['inline-block'],
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                },
                domProps: {
                  title: this.tableData[params.index].appealId
                },
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
              }, this.tableData[params.index].userId)
            ]);
          }
        });
        columns.push({
          title: '昵称',
          key: 'userName',
          width: 80,
        });
        columns.push({
          title: '任务ID',
          key: 'taskId',
          width: 180,
          render: (h, params) => {
            return h(
              "a",
              {
                class: ['fa'],
                attrs: {
                  taskId: this.tableData[params.index].taskId,
                },
                on: {
                  click: (e) => {// 点击事件， e 为事件参数
                    e.stopPropagation();
                    console.log(e.target.attributes.userId);
                    this.$router.push('/tasks/id=' + this.tableData[params.index].taskId)
                  }
                }
              },
              this.tableData[params.index].taskId,
            );
          }
        });
        columns.push({
          title: '打卡ID',
          key: 'checkId',
          width: 180,
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  display: ['inline-block'],
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                },
                domProps: {
                  title: this.tableData[params.index].checkId
                }
              }, this.tableData[params.index].checkId)
            ]);

          }
        });
        columns.push({
          title: '申诉内容',
          key: 'appealContent',
          width: 120,
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  display: ['inline-block', 'flex'],
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                },
                domProps: {
                  title: this.tableData[params.index].appealContent
                }
              }, this.tableData[params.index].appealContent)
            ]);

          }
        });
        columns.push({
          title: '申诉时间',
          key: 'appealTime',
          sortable: true,
          width: 160,
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  display: ['inline-block', 'flex'],
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                },
                domProps: {
                  title: this.tableData[params.index].appealTime
                }
              }, this.tableData[params.index].appealTime)
            ]);

          }
        });
        columns.push({
          title: '操作',
          key: 'action',
          align: 'center',
          width: 180,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$api.appeal.deal({
                      result: 'pass',
                      appealId: this.tableData[params.index].appealId
                    }).then(res => {
                      if (res.data.state === 'ok') this.tableData.splice(params.index, 1)
                    })
                  }
                }
              }, '通过'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$api.appeal.deal({
                      result: 'deny',
                      appealId: this.tableData[params.index].appealId
                    }).then(res => {
                      if (res.data.state === 'ok') this.tableData.splice(params.index, 1)
                    })
                  }
                }
              }, '拒绝')
            ]);
          }
        });
        return columns;
      },
    },
    beforeMount: function () {
      if (localStorage.appeal === 'false') {
        this.$router.push(`/404`)
      }
      this.$api.appeal.getAppeals({page: this.page})
        .then(res => {
          let tempData;
          tempData = res.data.appeals;
          tempData.forEach((item, i) => {
            if (item.appealState === 'toProcess') {
              console.log(i, item.appealState);
              this.tableData.splice(0, 0, item)
            }
          });
          this.appealsSize = this.tableData.length;
          console.log("tableData: ", this.tableData)
        })
    },
    mounted() {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 125;
    },
    methods: {
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
        // 定义CancelToken，它是axios的一个属性，且是一个构造函数
        let CancelToken = axios.CancelToken;

        this.$api.appeal.queryByKeyword({
          startTime: this.startTime, endTime: this.endTime, searchType: this.searchType,
          keyword: this.keyword, page: this.page, pageSize: this.pageSize
        }, new CancelToken((c) => {
          this.cancel = c;
        }))
          .then(res => {
            console.log(res)
            this.tableData = res.data.appeals
          })
          .catch(err => {
            console.log(err)
          })
      },
      changePage(e) {
        this.page = e;
        this.$api.appeal.queryByKeyword({
          startTime: this.startTime, endTime: this.endTime, searchType: this.searchType,
          keyword: this.keyword, page: this.page, pageSize: this.pageSize
        })
          .then(res => {
            console.log(res.data);
            this.tableData = res.data.appeals;
            this.appealsSize = res.data.appealsSize
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
    display: flex;
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
