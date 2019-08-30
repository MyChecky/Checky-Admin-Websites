<template>
  <Card>
    <div id="chart-target" class="chart-target"></div>
  </Card>
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
        pickYear:2019,
        graphData:{}
      }
    },
    beforeMount(){
      this.$api.money.getGraphData({year:this.pickYear})
        .then(res=>{
          console.log(res.data)
          this.graphData = res.data
          let myChart = echarts.init(document.getElementById('chart-target'), 'light');
          myChart.setOption({
            title: {
              text: `${this.pickYear}年—${this.pickYear+1}年 资金统计图`,
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
                data:this.graphData.income
              },
              {
                name:"退还",
                type: 'bar',
                yAxisIndex: 1,
                data:this.graphData.refund
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
                data:this.graphData.benefit
              }

            ]
          });
        })
        .catch(err=>{
          console.log(err)
        })
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .chart-target {
    width: 100%;
    height: 600px;
  }
</style>
