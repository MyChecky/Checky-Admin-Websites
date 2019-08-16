<template>
    <div class="container">
      <div class="basic-div">
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
      <div class="money-flow">
        <div class="chart"></div>
        <div class="record"></div>
      </div>
      <div class="others">
        <div class="relation"></div>
        <div class="task-list"></div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "UserDetail"
    }
</script>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
}
  .basic-div{
    display: flex;
    justify-content: space-between;
  }
</style>
