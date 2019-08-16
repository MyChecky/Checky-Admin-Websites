<template>
    <div class="container" v-if="refresh">
      <div class="score" v-for="item of spanList" :class="['score-item',item===1?'scored':'un-scored',item===1&&score===1?'warning':'',item===1&&score<=3?'info':'']"></div>
    </div>
</template>

<script>
  export default {
    name: "Credit",
    props:[
      "score"
    ],
    data(){
      return{
        spanList:[0,0,0,0,0],
        refresh: true
      }
    },
    beforeMount(){
      for (let i = 0;i<this.score;i++){
        this.spanList[i] = 1;
      }
    },
    beforeUpdate(){
      this.spanList=[0,0,0,0,0];
      for (let i = 0;i<this.score;i++){
        this.spanList[i] = 1;
      }
    },
    updated(){
      console.log("update"+this.score);
      console.log("update"+this.spanList);
    }
  }
</script>

<style scoped>
  .container{
    display: flex;
  }
  .score-item{
    width: 4px;
    height: 15px;
    border-radius: 2px;
    margin: auto 2px;
  }
  .scored{
    background-color: #18b566;
  }
  .un-scored{
    background-color: #ccc;
  }
  .info{
   background-color: #f5a623;
  }
  .warning{
    background-color: #e83015!important;
  }
</style>
