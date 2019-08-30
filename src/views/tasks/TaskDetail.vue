<template>
  <div class="container">
    <div v-if="exist">
      <div class="inner-div">
        <Card>
          <span class="card-title">基本信息</span>
          <div class="inner-card">
            <!-- <Avatar :source="userInfo.userAvatar" :size="80"></Avatar> -->
            <div class="info-div">
              <span class="info-item">任务ID：{{taskInfo.userId}}</span>
              <span class="info-item">开始时间：{{taskInfo.taskStartTime}}</span>
              <span class="info-item">结束时间：{{taskInfo.taskEndTime}}</span>
              <span class="info-item">任务标题：{{taskInfo.taskTitle}}</span>

            </div>
            <!-- <Avatar :source="userInfo.userAvatar" :size="80"></Avatar> -->
            <div class="info-div">
              <span class="info-item">用户名：{{taskInfo.userName}}</span>
              <span class="info-item">用户ID：{{taskInfo.userId}}</span>
              <span class="info-item">监督人数：{{taskInfo.supervisorNum}}</span>
              <span class="info-item">状态：{{taskInfo.taskState}}</span>
            </div>

            <!-- <Avatar :source="userInfo.userAvatar" :size="80"></Avatar> -->
            <div class="info-div">
              <span class="info-item">打卡次数：{{taskInfo.checkNum}}</span>
              <span class="info-item">应打卡数：{{taskInfo.checkTimes}}</span>
              <span class="info-item">押金金额：{{taskInfo.refundMoney}}</span>
              <span class="info-item">任务简介：{{taskInfo.taskContent}}</span>
            </div>
          </div>
        </Card>
        <!-- <Card>
          <span class="card-title">兴趣爱好</span>
          <div class="inner-card"></div>
        </Card> -->
        <!-- <Card>
          <div style="display: flex;flex-direction: column;justify-content: space-between;height: 100%;">
            <span class="card-title">信用评分</span>
            <span class="credit-span">评分：{{userInfo.userCredit}}</span>
            <Credit v-if='score>=0' size="large" :score="score"></Credit>
            <div class="credit-button-div">
              <button class="op-button">举报/申诉</button>
              <button class="fa fa-eye op-button disabled">恢复</button>
              <button class="fa fa-exclamation-circle op-button cancel">屏蔽用户</button>
            </div>
          </div>
        </Card> -->
      </div>
      <div class="inner-div">
        <Card class="others">
          <div class="table-header">
            <span class="card-title">监督列表</span>
            <span class="total">总数：{{supervisors.length}}</span>
            <div class="search-div"><SearchBar></SearchBar></div>
          </div>
          <div class="task-list">
            <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder"
                   :stripe="showStripe" :show-header="showHeader" :size="tableSize" :data="supervisors"
                   :columns="supervisorColumns"></Table>
          </div>
        </Card>
      </div>
      <div class="inner-div">
        <Card class="others">
          <div class="table-header">
            <span class="card-title">打卡列表</span>
            <span class="total">总数：{{checks.length}}</span>
            <div class="search-div"><SearchBar></SearchBar></div>
          </div>
          <div class="task-list">
            <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder"
                   :stripe="showStripe" :show-header="showHeader" :size="tableSize" :data="checks"
                   :columns="checkColumns"></Table>
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

  export default {

    name: "UserDetail",
    components: {
      Avatar: Avatar,
      Credit: Credit,
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
        taskInfo: {},
        checks: [],
        supervisors: []
      }
    },
    computed: {
      supervisorColumns() {
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
          key: 'userId'
        });
        columns.push({
          title: '用户名',
          key: 'userName'
        });
        columns.push({
          title: '加入时间',
          key: 'addTime',
          align: 'center',
          sortable: true
        });

        columns.push({
          title: '监督次数',
          key: 'superviseNum',
          align: 'center',
          sortable: true
        });

        columns.push({
          title: '分成',
          key: 'benefit',
          align: 'center',
          sortable: true
        });

        return columns;
      },
      checkColumns() {
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
          title: '打卡ID',
          key: 'checkId'
        });
        columns.push({
          title: '打卡时间',
          key: 'checkTime',
          sortable: true
        });
        columns.push({
          title: '监督人数',
          key: 'superviseNum'
        });
        columns.push({
          title: '通过人数',
          key: 'passNum'
        });
        columns.push({
          title: '打卡状态',
          key: 'checkState',
        });
        columns.push({
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h,params) => {
            return h(
              "button",
              {
                style:{
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
                class:['fa','fa-caret-right'],
                attrs: {
                  checkId: this.checks[params.index].checkId,
                },
                on:{
                  click:(e)=>{// 点击事件， e 为事件参数
                    e.stopPropagation();
                    console.log(e.target.attributes.checkId.nodeValue);
                    this.$router.push(`/tasks/check/check=${e.target.attributes.checkId.nodeValue}&task=${this.$route.params.taskId}`)
                  }
                }
              },
              "详情"
            );
            }
        });
        return columns;
      }
    },
    beforeMount() {
      let id = this.$route.params.taskId;
      this.$api.tasks.queryTask({taskId:id})
        .then((res)=>{
          console.log(res.data)
          this.taskInfo = res.data.task
          this.taskInfo.taskState = this.$translator.translator('taskState',this.taskInfo.taskState)
        })
        .catch((err)=>{
          console.log(err)
      })
      this.$api.tasks.getTaskSupervisors({
        taskId: id,
        page:this.page
      })
      .then((res)=>{
        console.log(res.data)
        this.supervisors = res.data.supervisors
      })
      .catch((err)=>{

      })

      this.$api.checks.getTaskChecks({
        taskId: id,
        page:this.page
      })
      .then((res)=>{
        console.log(res.data)
        this.checks = res.data.checks
        this.checks.map((item)=>{
          item.checkState = this.$translator.translator('checkState',item.checkState)
        })
      })
      .catch((err)=>{

      })
    },
    methods: {
      search(keyword) {
      },
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
