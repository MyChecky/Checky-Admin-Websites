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
        totalMoney:250.2
      }
    },
    mounted() {
      // 基于准备好的dom，初始化echarts实例
      let date = new Date()
      let year = date.getFullYear()
      let myChart = echarts.init(document.getElementById('chart-target'), 'light');
      myChart.setOption({
        title: {
          text: `${year}年—${year+1}年 资金统计图`,
          subtext: `总资产:${this.totalMoney}￥`,
          subtextStyle:{
            color: '#e83015',
            fontSize: 18
          },
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
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
          },
          {
            name:"退还",
            type: 'bar',
            yAxisIndex: 1,
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
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
            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          }

        ]
      });
    }
  }
</script>

<style scoped>
  .chart-target {
    width: 100%;
    height: 600px;
  }
</style>
