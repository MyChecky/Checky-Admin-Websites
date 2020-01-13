<template>

  <div class="container">

    <div class="inner-div">
      <Card class="others">
        <div class="table-header">
          <span class="card-title">充值记录</span>
          <span class="total">总数：{{moneyFlowsSize}}</span>
          <div class="search-div"><SearchBar :search="search"></SearchBar></div>
        </div>
        <div class="task-list">
          <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder"
                 :stripe="showStripe" :show-header="showHeader" :size="tableSize" :data="data1"
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
        name: "Recharge",
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
          cancel:null,
          kw:"",       //?

          data1: [
            {
              chargeId: 'John Brown',
              orderId: "18",
              userId: 'New York No. 1 Lake Park',
              chargeTime: '2016-10-03'
            },
            {
              chargeId: 'John Brown',
              orderId: "18",
              userId: 'New York No. 1 Lake Park',
              chargeTime: '2016-10-03'
            },
            {
              chargeId: 'John Brown',
              orderId: "18",
              userId: 'New York No. 1 Lake Park',
              chargeTime: '2016-10-03'
            }
          ],
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
            title: '交易ID',
            key: 'chargeId'
          });
          columns.push({
            title: '订单编号',
            key: 'orderId'
          });
          columns.push({
            title: '用户',
            key: 'userId'
          });
          columns.push({
            title: '金额',
            key: 'rechargeMoney',
            render: (h, params) => {
              return h(
                MoneyTag,
                {
                  props:{
                    money: params.row.flowMoney     //Todo
                  }
                }
              )
            }
          });
          columns.push({
            title: '交易类型',
            key: 'orderType',
            filterMultiple: false,
            filters: [
              {
                label: '充值',
                value: '充值'
              },
              {
                label: '取现',
                value: '取现'
              }
            ],
            filterMethod (value, row) {
              return row.userGender === value;   //Todo
            }
          });
          columns.push({
            title: '时间',
            key: 'chargeTime',
            align: 'center',
            sortable: true
          });
          return columns;
        }
      },


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

  .pager{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 5px auto;
  }
</style>
