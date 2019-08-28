<template>
  <div class="credit-container" v-if="refresh">
    <div class="score" v-for="item of spanList"
         :class="[size,item===1?'scored':'un-scored',item===1&&score===1?'warning':'',item===1&&score<=3?'info':'']"></div>
  </div>
</template>

<script>
  export default {
    name: "Credit",
    props: [
      "score", "size","getScore"
    ],
    data() {
      return {
        spanList: [0, 0, 0, 0, 0],
        refresh: true
      }
    },
    beforeMount() {
      if (!this.size) this.size = 'small';
      for (let i = 0; i < this.score; i++) {
        this.spanList[i] = 1;
      }
    },
    beforeUpdate() {
      this.spanList = [0, 0, 0, 0, 0];
      for (let i = 0; i < this.score; i++) {
        this.spanList[i] = 1;
      }
    }
  }
</script>

<style scoped>
  .credit-container {
    display: flex;
    flex-direction: row;
  }

  .scored {
    background-color: #18b566;
  }

  .un-scored {
    background-color: #ccc;
  }

  .info {
    background-color: #f5a623;
  }

  .warning {
    background-color: #e83015 !important;
  }

  .small {
    width: 4px;
    height: 15px;
    border-radius: 2px;
    margin: auto 2px;
  }

  .large {
    width: 12px;
    height: 40px;
    border-radius: 6px;
    margin: auto 6px
  }
</style>
