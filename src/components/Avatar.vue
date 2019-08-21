<template>
    <div class="avatar-container" :style="avatarSize">
      <img :src="source" alt="" class="avatar">
    </div>
</template>

<script>
  export default {
    name: "Avatar",
    props:[
      "source","size"
    ],
    data(){
      return{
        avatarSize:''
      }
    },
    beforeMount(){
      if (this.size)
        this.avatarSize = `width:${this.size}px;height:${this.size}px;`
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
