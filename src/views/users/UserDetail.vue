<template>
  <div class="container">
    <div v-if="exist">
      <div class="inner-div">
        <Card>
          <span class="card-title">基本信息</span>
          <div class="inner-card">
            <Avatar :source="userInfo.userAvatar" :size="80"></Avatar>
            <div class="info-div">
              <span class="info-item">ID：{{userInfo.userId}}</span>
              <span class="info-item">昵称：{{userInfo.userName}}</span>
              <span class="info-item">性别：{{userInfo.userGender===1?'男':'女'}}<i
                :class="['fa',userInfo.userGender===1?'fa-mars':'fa-venus',userInfo.userGender===1?'mars':'venus']"></i></span>
              <span class="info-item">创建时间：{{userInfo.userTime}}</span>
              <span class="info-item">兴趣爱好：{{this.hobbies}}</span>
            </div>
            <div class="info-div">
              <span class="info-item">总收入：{{userIncome}}</span>
              <span class="info-item">总支出：{{userExpenditure}}</span>
              <span class="info-item">余  额：{{userBalance}}</span>
            </div>
          </div>
        </Card>
        <Card>
          <span class="card-title">兴趣爱好</span>
          <div style="flex-grow: 2;height: 100%;">
            <PieChart :width="300" :chartData=tasks></PieChart>
          </div>
        </Card>
        <Card>
          <div style="display: flex;flex-direction: column;justify-content: space-between;height: 100%;">
            <span class="card-title">信用评分</span>
            <span class="credit-span">评分：{{userInfo.userCredit}}</span>
            <Credit v-if='score>=0' size="large" :score="score"></Credit>
          </div>
        </Card>
      </div>
      <div class="inner-div">
        <Card class="others">
          <div class="table-header">
            <span class="card-title">资金流水</span>
            <span class="total">总数：{{this.moneySize}}</span>
          </div>
          <div class="task-list">
            <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder"
                   :stripe="showStripe" :show-header="showHeader" :size="tableSize" :data="money"
                   :columns="moneyColumns"></Table>
            <Page class="pager" :total="this.moneySize" :page-size="pageSize" @on-change="changeMoneyPage"></Page>
          </div>
        </Card>
      </div>
      <div class="inner-div">
        <Card class="others">
          <div class="table-header">
            <span class="card-title">充值记录</span>
            <span class="total">总数：{{this.rechargeSize}}</span>
          </div>
          <div class="task-list">
            <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder"
                   :stripe="showStripe" :show-header="showHeader" :size="tableSize" :data="this.recharge"
                   :columns="rechargeColumns"></Table>
            <Page class="pager" :total="this.rechargeSize" :page-size="pageSize" @on-change="changeRechargePage"></Page>
          </div>
        </Card>

      </div>
      <div class="inner-div">
        <Card class="others">
          <div class="table-header">
            <span class="card-title">任务列表</span>
            <span class="total">总数：{{this.taskSize}}</span>
          </div>
          <div class="task-list">
            <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder"
                   :stripe="showStripe" :show-header="showHeader" :size="tableSize" :data="tasks"
                   :columns="taskColumns"></Table>
            <Page class="pager" :total="this.taskSize" :page-size="pageSize" @on-change="changeTaskPage"></Page>
          </div>
        </Card>
      </div>
    </div>
    <div v-else>
      <div class="notice">
        <i class="fa fa-question-circle"></i>
        <span class="tag">用户不存在</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Avatar from '../../components/Avatar'
  import Credit from '../../components/Credit'
  import SearchBar from '../../components/SearchBar'
  import MoneyTag from '../../components/MoneyTag'
  import PieChart from '../../components/PieChart'

  export default {
    name: "UserDetail",
    components: {
      Avatar: Avatar,
      Credit: Credit,
      SearchBar: SearchBar,
      MoneyTag: MoneyTag,
      PieChart: PieChart
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
        pageSize: 5,
        tableSize: 'default',
        exist: true,
        score: -1,
        userInfo: {},
        tasks: [],
        money: [],
        recharge: [],
        moneypage: 0,
        rechargepage: 0,
        taskpage: 0,
        moneySize: 0,
        rechargeSize: 0,
        taskSize: 0,
        userExpenditure: 100,
        userIncome: 300,
        userBalance: 200,
        hobbies: [],
      }
    },
    computed: {
      rechargeColumns() {
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
          title: '交易ID',
          key: 'payId'
        });
        columns.push({
          title: '订单编号',
          key: 'payOrderinfo'
        });
        columns.push({
          title: '用户名',
          key: 'payUserName'
        });
        columns.push({
          title: '金额',
          key: 'payMoney',
          render: (h, params) => {
            return h(
              MoneyTag,
              {
                props: {
                  money: params.row.payMoney
                }
              }
            )
          }
        });
        columns.push({
          title: '交易类型',
          key: 'payType',
          filterMultiple: false,
          filters: [
            {
              label: '充值',
              value: 'pay'
            },
            {
              label: '提现',
              value: 'withdraw'
            }
          ],
          filterMethod(value, row) {
            //return row.userGender === value;   //Todo
            return row.payType === value;
          },
          render: (h, params) => {
            let _this = this;
            let texts = '';
            if (params.row.payType == "pay") {
              texts = "充值"
            } else if (params.row.payType == "withdraw") {
              texts = "提现"
            }
            return h('div', {
              props: {},
            }, texts)
          }
        });
        columns.push({
          title: '时间',
          key: 'payTime',
          align: 'center',
          sortable: true
        });
        return columns;
      },
      taskColumns() {
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
          title: 'ID',
          key: 'taskId'
        });
        columns.push({
          title: '标题',
          key: 'taskTitle'
        });
        columns.push({
          title: '类型',
          key: 'typeContent',
          align: 'center'
        });
        columns.push({
          title: '状态',
          key: 'taskState',
          align: 'center',
          filterMultiple: false,
          filters: [
            {
              label: '未匹配',
              value: '未匹配'
            },
            {
              label: '未知',
              value: '未知'
            },
            {
              label: '成功',
              value: '成功'
            },
            {
              label: '失败',
              value: '失败'
            }
          ],
          filterMethod(value, row) {
            return row.taskState === value;
          }
        });
        columns.push({
          title: '开始时间',
          key: 'taskStartTime',
          align: 'center',
          sortable: true
        });
        columns.push({
          title: '结束时间',
          key: 'taskEndTime',
          align: 'center',
          sortable: true
        });
        return columns;
      },
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
          align: 'center',
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
            return row.ifRealMoney.indexOf(value) > -1;
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
          align: 'center',
          filterMultiple: false,
          filters: [
            {
              label: '入账',
              value: 'I'
            },
            {
              label: '出账',
              value: 'O'
            }
          ],
          filterMethod(value, row) {
            return row.FlowDir.indexOf(value) > -1;
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
              value: 'pay'
            },
            {
              label: '退款',
              value: 'refund'
            },
            {
              label: '奖励',
              value: 'award'
            }
          ],
          filterMethod(value, row) {
            return row.type.indexOf(value) > -1;
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
      if (localStorage.users === 'false') {
        this.$router.push(`/404`)
      }
      let id = this.$route.params.userId;
      console.log(`查询用户:${id}`);
      this.$api.users.queryUser({
        userId: id,
      })
        .then((res) => {
          console.log("res.data.user", res.data.user);
          this.userInfo = res.data.user;
          this.score = Math.ceil(this.userInfo.userCredit / 20);
          this.userExpenditure = res.data.totalTrueOut;
          this.userIncome = res.data.totalTrueIn;
          this.userBalance = res.data.totalTrueIn - res.data.totalTrueOut;
        }).catch((err) => {
        console.log(err)
      });
      this.$api.users.queryHobbies({userId: id})
        .then((res) => {
          this.hobbies = res.data.hobbies;
          console.log(res.data.hobbie);
        })
        .catch((err) => {
          console.log(err)
        });
      this.$api.users.queryUserTask({
        userId: id,
        page: this.taskpage,
        pageSize: this.pageSize
      })
        .then((res) => {
          res.data.tasks.map(item => {
            item.taskState = this.$translator.translator('taskState', item.taskState)
          });
          console.log(res.data);
          this.tasks = res.data.tasks;
          this.taskSize = res.data.total
        }).catch((err) => {
        console.log(err)
      });
      this.$api.money.queryUserMoneyFlow({
        userId: id,
        page: this.moneypage,
        pageSize: this.pageSize
      })
        .then((res) => {
          console.log("res.data.moneyFlow", res.data.moneyFlow);
          this.money = res.data.moneyFlow
          this.moneySize = res.data.total
        }).catch((err) => {
        console.log(err)
      });
      this.$api.money.queryUserMoneyRecharge({
        userId: id,
        page: this.rechargepage,
        pageSize: this.pageSize
      })
        .then((res) => {
          console.log("res.data.pays", res.data.pays);
          this.recharge = res.data.pays;
          this.rechargeSize = res.data.total
        }).catch((err) => {
        console.log(err)
      })
    },
    methods: {
      search(keyword) {
      },
      changeMoneyPage(e) {
        this.moneypage = e;
        let id = this.$route.params.userId;
        this.$api.money.queryUserMoneyFlow({
          userId: id,
          page: this.moneypage,
          pageSize: this.pageSize
        })
          .then((res) => {
            console.log("res.data.moneyFlow", res.data.moneyFlow);
            this.money = res.data.moneyFlow;
          }).catch((err) => {
          console.log(err)
        })
      },
      changeRechargePage(e) {
        this.rechargepage = e;
        let id = this.$route.params.userId;
        this.$api.money.queryUserMoneyRecharge({
          userId: id,
          page: this.rechargepage,
          pageSize: this.pageSize
        })
          .then((res) => {
            console.log("res.data.pays", res.data.pays);
            this.recharge = res.data.pays
          }).catch((err) => {
          console.log(err)
        })
      },
      changeTaskPage(e) {
        this.taskpage = e;
        let id = this.$route.params.userId;
        this.$api.users.queryUserTask({
          userId: id,
          page: this.taskpage,
          pageSize: this.pageSize
        })
          .then((res) => {
            console.log("res.data.tasks", res.data.tasks);
            res.data.tasks.map(item => {
              item.taskState = this.$translator.translator('taskState', item.taskState)
            });
            console.log(res.data);
            this.tasks = res.data.tasks;
          }).catch((err) => {
          console.log(err)
        })
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

  .pager {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 5px auto;
  }

  .others {
    display: flex;
    width: 100%;
  }
</style>
