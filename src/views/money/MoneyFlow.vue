<template>
  <div class="container">

    <div class="inner-div">
      <Card class="others">
        <div class="table-header">
          <span class="card-title">流水记录</span>
          <span class="total">总数：{{moneyFlowsSize}}</span>
          <div class="search-div">
            <SearchBar :search="search"></SearchBar>
          </div>
        </div>
        <div class="task-list">
          <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder"
                 :stripe="showStripe" :show-header="showHeader" :size="tableSize" :data="money"
                 :columns="moneyColumns"></Table>
        </div>
      </Card>

    </div>
    <Page class="pager" :total="moneyFlowsSize" :page-size="pageSize" @on-change="changePage"></Page>
  </div>
</template>

<script>
  import SearchBar from '../../components/SearchBar'
  import MoneyTag from '../../components/MoneyTag'
  import axios from 'axios'

  export default {
    name: "MoneyFlow",
    components: {
      SearchBar: SearchBar,
      MoneyTag: MoneyTag
    },
    data() {
      return {
        showBorder: false,
        showStripe: false,
        showHeader: true,
        showIndex: false,
        showCheckbox: false,
        fixedHeader: false,
        tableHeight: 400,
        pageSize: 10,
        tableSize: 'default',
        exist: true,
        score: -1,
        moneyFlowsSize: 0,
        money: [],
        page: 0,
        cancel: null,
        kw: ""
      }
    },
    computed: {

      moneyColumns() {
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
          title: '流水ID',
          key: 'flowId'
        });
        columns.push({
          title: '任务ID',
          key: 'taskId'
        });
        columns.push({
          title: '相关用户',
          key: 'userName'
        });
        columns.push({
          title: '真实货币',
          key: 'ifTest',
          filterMultiple: false,
          filters: [
            {
              label: '是',
              value: 1
            },
            {
              label: '否',
              value: 0
            }
          ],
          filterMethod(value, row) {
            return row.ifTest === value;
          },
          render: (h, params) => {
            let _this = this;
            let texts = '';
            if (params.row.ifTest == 0) {
              texts = "否"
            } else if (params.row.ifTest == 1) {
              texts = "是"
            }
            return h('div', {
              props: {},
            }, texts)
          }
        });
        columns.push({
          title: '资金流动',
          key: 'flowIo',
          filterMultiple: false,
          filters: [
            {
              label: '入账',
              value: "I"
            },
            {
              label: '出账',
              value: "O"
            }
          ],
          filterMethod(value, row) {
            return row.flowIo === value;
          },
          render: (h, params) => {
            let _this = this;
            let texts = '';
            if (params.row.flowIo == "I") {
              texts = "入账"
            } else if (params.row.flowIo == "O") {
              texts = "出账"
            }
            return h('div', {
              props: {},
            }, texts)
          }
        });
        columns.push({
          title: '金额',
          key: 'flowMoney',
          render: (h, params) => {
            return h(
              MoneyTag,
              {
                props: {
                  money: params.row.flowMoney
                }
              }
            )
          }
        });
        columns.push({
          title: '类型',
          key: 'flowType',
          filterMultiple: false,
          filters: [
            {
              label: '支付',
              value: "pay"
            },
            {
              label: '退款',
              value: "refund"
            },
            {
              label: '奖励',
              value: "award"
            }
          ],
          filterMethod(value, row) {
            return row.flowType === value;
          },
          render: (h, params) => {
            let _this = this;
            let texts = '';
            if (params.row.flowType == "pay") {
              texts = "支付"
            } else if (params.row.flowType == "refund") {
              texts = "退款"
            } else if (params.row.flowType == "award") {
              texts = "奖励"
            }
            return h('div', {
              props: {},
            }, texts)
          }
        });
        columns.push({
          title: '时间',
          key: 'flowTime',
          align: 'center',
          sortable: true
        });
        return columns;
      }
    },
    beforeMount() {
      this.$api.money.queryAllMoneyFlow({
        page: this.page,
        pageSize: this.pageSize
      })
        .then((res) => {
          this.money = res.data.moneyFlow;
          this.moneyFlowsSize = res.data.total
        }).catch((err) => {
        console.log(err)
      })
      //查询当前登录用户的部门
      if (localStorage.department === '"task"') {
        this.$router.push(`/404`)
      }
    },

    mounted() {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 180;
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

        this.$api.money.queryByKeyword({username: keyword}, new CancelToken((c) => {
          this.cancel = c;
        }))
          .then(res => {
            console.log(res);
            this.money = res.data.moneyFlow;
            this.moneyFlowsSize = res.data.total
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
          this.$api.money.queryAllMoneyFlow({
            page: this.page,
            pageSize: this.pageSize
          })
            .then((res) => {
              this.money = res.data.moneyFlow
              this.moneyFlowsSize = res.data.total
            }).catch((err) => {
            console.log(err)
          })
        }
      }
    }
  }
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
  }

  .inner-div {
    display: flex;
    justify-content: space-between;
    margin: 15px auto;
    padding: 0px 10px;
    width: 100%;
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

  .notice {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 5px;
    width: 300px;
    height: 100px;
    color: #e83015;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tag {
    margin: auto 20px;
    color: #999999;
  }

  .card-title {
    font-weight: 600;
    color: #333;
    font-size: 20px;
    margin-right: 10px;
  }

  .inner-card {
    flex-grow: 2;
    display: flex;
    margin: 5px;
    align-items: center;
    justify-content: flex-start;
  }

  .info-div {
    padding: 5px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .info-item {
    margin: 5px 2px;
  }

  .mars {
    margin: auto 10px;
    font-weight: 600;
    color: #2b85e4;
  }

  .venus {
    margin: auto 10px;
    font-weight: 600;
    color: deeppink;
  }

  .credit-span {
    padding: 2px 8px;
  }

  .credit-button-div {
    padding-left: 3px;
    display: flex;
    justify-content: space-between;
  }

  .op-button {
    padding: 5px 10px;
    background-color: #2b85e4;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    margin: 0px 5px;
  }

  .cancel {
    background-color: #e83015;
  }

  .disabled {
    background-color: #999999;
  }

  .money-flow {
    display: flex;
    width: 100%;
  }

  .others {
    display: flex;
    width: 100%;
  }

  .pager {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 5px auto;
  }
</style>
