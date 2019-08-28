<template>
    <Card>
      <div id="chart-target" class="chart-target"></div>
    </Card>
</template>

<script>
  import echarts from 'echarts'
    export default {
      name: "Chart",
      data(){
          return{}
      },
      mounted(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('chart-target'), 'light');
        myChart.setOption({
          title: {
            text: "资金统计图",
            textStyle: {
              color: '#333',
              fontSize: 22,
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'default',
            show: true,
            x: 'center',
            data: ['2015', '2016', '2017','2018']
          },
          color:[
            "#5ec9db",
            "#fdc765",
            "#f27d51",
            "#3462ccd0",
            "#33dd9bd0"
          ],
          dataset: {
            source: [
              ['product', '2015', '2016', '2017','2018'],
              ['Matcha Latte', 43.3, 85.8, 10.0,93.7],
              ['Milk Tea', 83.1, 73.4, 21.2,55.1],
              ['Cheese Cocoa', 86.4, 65.2, 45,82.5],
              ['Walnut Brownie', 72.4, 53.9, 34.2,39.1]
            ]
          },
          xAxis: {type: 'category'},
          yAxis: {},
          series: [
            {type: 'bar'},
            {type: 'bar'},
            {type: 'bar'},
            {type: 'bar'},
            {type: 'bar'}
          ]
        });
      }
    }
</script>

<style scoped>
.chart-target{
  width: 100%;
  height: 500px;
}
</style>
