<template>
  <div>
    <i class="fa fa-rmb tag"></i>
    <span class="text">{{money}}</span>
  </div>
</template>

<script>
  export default {
    name: "MoneyTag",
    props:["money"]
  }
</script>

<style scoped>
.tag{
  color: #fff;
  background-color: #e83015;
  border-radius: 2px;
  padding: 3px;
}
  .text{
    color: #333;
  }
</style>
