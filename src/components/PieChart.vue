<template>
  <div class="chart-target" :style="{width:width+'px'}" id="chart-target"></div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: "PieChart",
    props: [
      "width", "type", "chartData"
    ],
    watch: {
      chartData: {
        handler: function () {
          console.log(this.chartData);
          let types = [];
          // 统计
          types=this.chartData.map(item => {
              return item.typeContent
            }
          );
          let Result = this.count(types);
          console.log(Result);
          // 基于准备好的dom，初始化echarts实例
          let myChart = echarts.init(document.getElementById('chart-target'), 'light');
          myChart.setOption({
            tooltip: {
              trigger: 'item',
              formatter: "{b}: {c} ({d}%)"
            },
            color: [
              "#e83015",
              "#f5a623",
              "#ffd700",
              "#18b566",
              "#1E90FF",
              "#8a2be2"
            ],
            legend: {
              orient: 'vertical',
              show: false,
              x: 'right',
              data: Result.name
            },
            series: [
              {
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: true,
                    position: 'left'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '16',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: true
                  }
                },
                data: Result.result
              }
            ]
          });
        },
        deep: true,
        immediate: true
      }
    },
    data() {
      return {}
    },
    methods:{
      count(array){
        let res = {};
        let name = [];
        array.forEach((item)=>{
          let str = item;
          if (res.hasOwnProperty(str)) {
            let n = res[str];
            res[str] +=1;
          }
          else {
            res[str] = 1;
            name.push(str);
          }
        });
        let result = [];
        name.forEach(item=>{
          result.push({value: res[item],name:item})
        });
        return {result,name};
      }
    }
  }
</script>

<style scoped>
  .chart-target {
    width: 100%;
    height: 100%;
  }
</style>
