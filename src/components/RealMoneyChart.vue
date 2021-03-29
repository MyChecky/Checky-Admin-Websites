<template>
  <div>
    <Dropdown class="checky_graph_dropdown" @on-click="changeMenu">
      <a href="javascript:void(0)">
        选择年份
        <Icon type="ios-arrow-down"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem name="2021">2021</DropdownItem>
        <DropdownItem name="2020">2020</DropdownItem>
        <DropdownItem name="2019">2019</DropdownItem>
        <DropdownItem name="2018">2018</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <div class="some_data">
      <span class="some_data_content">测试金额累积收入：{{graphData.totalSystemTestGet}}</span>
      <span class="some_data_content">充值金额累积收入：{{graphData.totalSystemTrueGet}}</span>
      <span class="some_data_content">现存沉淀资金：{{graphData.totalPayGet}}</span>
    </div>
    <div id="chart-target-real" class="chart-target-real"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: "Chart",
    data() {
      return {
        colors: [
          "#60ACFC",
          "#FFDA43",
          "#5bc49f"
        ],
        totalMoney:250.2,
        pickYear:2021,
        graphData:{}
      }
    },
    methods:{
      changeMenu(name){
        this.pickYear = name;
        // this.draw();
      },
      draw(){
        //查询当前登录用户的部门
        if (localStorage.department === '"task"') {
          this.$router.push(`/404`)
        }
        this.$api.money.getGraphData({year:this.pickYear})
          .then(res=>{
            console.log(res.data)
            this.graphData = res.data
            let myChart = echarts.init(document.getElementById('chart-target-real'), 'light');
            myChart.setOption({
              title: {
                text: `${this.pickYear}年 资金统计图`,
                color: '#333',
                fontSize: 22
              },
              tooltip: {
                trigger: 'item',
                axisPointer: {
                  type: 'cross'
                }
              },
              legend: {
                orient: 'horizontal',
                show: true,
                x:"right",
                padding: 10,
                data: ['收入', '退还', '净利润']
              },
              color: this.colors,
              xAxis: {
                type: 'category',
                axisTick: {
                  alignWithLabel: true
                },
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
              },
              yAxis: [
                {
                  type: 'value',
                  name: '收入',
                  position: 'left',
                  axisLine: {
                    lineStyle: {
                      color: this.colors[0]
                    }
                  }
                },
                {
                  type: 'value',
                  name: '退还',
                  position: 'left',
                  offset: 50,
                  axisLine: {
                    lineStyle: {
                      color: this.colors[1]
                    }
                  }
                },
                {
                  type: 'value',
                  name: '净利润',
                  position: 'right',
                  axisLine: {
                    lineStyle: {
                      color: this.colors[2]
                    }
                  }
                }
              ],
              series: [
                {
                  name:"收入",
                  type: 'bar',
                  data:this.graphData.trueIncomeList
                },
                {
                  name:"退还",
                  type: 'bar',
                  yAxisIndex: 1,
                  data:this.graphData.trueRefundList
                },
                {
                  name:"净利润",
                  type: 'line',
                  yAxisIndex: 2,
                  symbolSize: 15,
                  lineStyle: {
                    width: 5
                  },
                  itemStyle: {
                    borderWidth: 5
                  },
                  data:this.graphData.trueBenefitList
                }

              ]
            });
          })
          .catch(err=>{
            console.log(err)
          })
      }
    },
    watch: {
      pickYear(newName,oldName){
        this.draw();
        console.log("更新后的数据"+this.pickYear);
      }
    },
    mounted() {
      this.draw();
    }
  }
</script>

<style scoped>
  .checky_graph_dropdown{
    float: right;
    margin-top: -45px;
  }
  .chart-target-real {
    width: 100%;
    height: 600px;
  }
  .some_data{
    margin-bottom: 10px;
    display: flex;
    align-items: flex-end;
  }
  .some_data_content{
    margin-left: 25px;
  }
</style>
