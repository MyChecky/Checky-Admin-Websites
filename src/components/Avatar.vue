<template>
    <div class="avatar-container">
      <img :src="source" alt="" class="avatar">
    </div>
</template>

<script>
  export default {
    name: "Avatar",
    props:[
      "source"
    ],
    data(){
      return{
      }
    }
  }
</script>

<style scoped>
  .avatar{
    width: 100%;
    height: 100%;
  }
  .avatar-container{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #fff;
    box-shadow: 1px 1px 1px 1px rgba(200,200,200,0.5);
  }
</style>
