<template>
  <div>
    <Card>
      <div class="table-header">
        <span class="card-title">举报列表</span>
        <span class="total">总数：{{reportsSize}}</span>
        <div class="search-div">
          <SearchBar :search="search"></SearchBar>
        </div>
      </div>
      <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder" :stripe="showStripe"
             :show-header="showHeader" :size="tableSize" :data="tableData" :columns="tableColumns"></Table>
    </Card>
    <Page class="pager" :total="reportsSize" :page-size="pageSize" @on-change="changePage"></Page>
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
        pageSize: 8,
        tableSize: 'default',
        page: 0,
        reportsSize: 0,
        tableData: []
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
          title: '举报ID',
          key: 'reportId',
          width: 200,
        });
        columns.push({
          title: '举报用户ID',
          key: 'userId',
          width: 200,
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
              this.tableData[params.index].userId,
            );
          }
        });
        columns.push({
          title: '昵称',
          key: 'userName',
          width: 80,
        });
        columns.push({
          title: '举报对象',
          key: 'reportType',
          width: 120,
        });
        columns.push({
          title: '举报对象ID',
          key: 'objectId',
          width: 200,
          render: (h, params) => {
            return h(
              "a",
              {
                class: ['fa'],
                attrs: {
                  objectId: this.tableData[params.index].objectId,
                },
                on: {
                  click: (e) => {// 点击事件， e 为事件参数
                    e.stopPropagation();
                    console.log(e.target.attributes.objectId);
                    this.$router.push('/users/id=' + this.tableData[params.index].objectId)
                  }
                }
              },
              this.tableData[params.index].objectId,
            );
          }
        });
        columns.push({
          title: '举报内容',
          key: 'reportContent',
          width:160,
          render: (h, params) => {
            return h('div', [
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                },
                domProps: {
                  title: this.tableData[params.index].reportContent
                }
              }, this.tableData[params.index].reportContent)
            ]);

          }

        });
        columns.push({
          title: '举报时间',
          key: 'reportTime',
          sortable: true,
          width: 180,
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
                    this.$api.report.deal({
                      result: 'pass',
                      reportId: this.tableData[params.index].reportId
                    }).then(res => {
                      if (res.data.state === 'ok') this.tableData.splice(params.index, 1)
                      this.reportsSize = this.tableData.length;
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
                    this.$api.report.deal({
                      result: 'deny',
                      reportId: this.tableData[params.index].reportId
                    }).then(res => {
                      if (res.data.state === 'ok') this.tableData.splice(params.index, 1)
                      this.reportsSize = this.tableData.length;
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
      if (localStorage.report === 'false') {
        this.$router.push(`/404`)
      }
      this.$api.report.getReports({
        page: this.page,
        pageSize: this.pageSize
      })
        .then(res => {
          res.data.reports.map(item => {
            item.reportType = this.$translator.translator('reportType', item.reportType)
          });
          console.log(res.data)
          let tempArr;
          tempArr = res.data.reports;
          tempArr.forEach((item, i) => {
            if (item.reportState === 'toProcess') {
              console.log(i, item.reportState);
              this.tableData.splice(0, 0, item)
            } else
              console.log(i, item.reportState);
          });
          this.reportsSize = this.tableData.length;
          console.log("tableData: ", this.tableData)
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

        this.$api.report.queryByKeyword({username: keyword}, new CancelToken((c) => {
          this.cancel = c;
        }))
          .then(res => {
            console.log(res);
            this.tableData = res.data.reports;
            this.reportsSize = res.data.total;
          })
          .catch(err => {
            console.log(err)
          })
      },
      changePage(e) {
        this.page = e
        this.$api.report.getReports({page: this.page, pageSize: this.pageSize})
          .then(res => {
            console.log(res.data)
            res.data.reports.map(item => {
              item.reportType = this.$translator.translator('reportType', item.reportType)
            })
            this.tableData = res.data.reports
            this.reportsSize = res.data.total
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
