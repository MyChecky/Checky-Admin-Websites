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
            <span class="card-title">资金记录</span>
            <span class="total">总数：{{money.length}}</span>
          </div>
          <div class="task-list">
            <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder"
                   :stripe="showStripe" :show-header="showHeader" :size="tableSize" :data="money"
                   :columns="moneyColumns"></Table>
          </div>
        </Card>
      </div>
      <div class="inner-div">
        <Card class="others">
          <div class="table-header">
            <span class="card-title">任务列表</span>
            <span class="total">总数：{{tasks.length}}</span>
          </div>
          <div class="task-list">
            <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder"
                   :stripe="showStripe" :show-header="showHeader" :size="tableSize" :data="tasks"
                   :columns="taskColumns"></Table>
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
        pageSize: 10,
        tableSize: 'default',
        exist: true,
        score: -1,
        userInfo: {},
        tasks: [],
        money: [],
        page: -1
      }
    },
    computed: {
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
          title: 'ID',
          key: 'flowId'
        });
        columns.push({
          title: '任务',
          key: 'taskId'
        });
        columns.push({
          title: '来源用户ID',
          key: 'fromUserId'
        });
        columns.push({
          title: '去向用户ID',
          key: 'toUserId',
        });
        columns.push({
          title: '金额',
          key: 'flowMoney',
          render: (h, params) => {
            return h(
              MoneyTag,
              {
                props:{
                  money: params.row.flowMoney
                }
              }
            )
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
      let id = this.$route.params.userId;

      console.log(`查询用户:${id}`);
      this.$api.users.queryUserInfo({
        userId:id,
      })
        .then((res) => {
          console.log(res);
          this.userInfo = res.data.user;
          this.score = Math.ceil(this.userInfo.userCredit / 20);
        }).catch((err) => {
        console.log(err)
      })
      this.$api.users.queryUserTask({
        userId:id,
        page:this.page
      })
        .then((res) => {
          res.data.tasks.map(item => {
            item.taskState = this.$translator.translator('taskState', item.taskState)
          })
          console.log(res)
          this.tasks = res.data.tasks
        }).catch((err) => {
        console.log(err)
      })
      this.$api.money.queryUserMoneyFlow({
        userId:id,
        page:this.page
      })
        .then((res) => {
          this.money = res.data.moneyFlows
        }).catch((err) => {
        console.log(err)
      })
    },
    methods: {
      search(keyword) {
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
  .search-div{
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
</style>
