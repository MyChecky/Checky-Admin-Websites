<template>
    <div style="height: 100%;" class="container">
      <Breadcrumb class="header-breadcrumb">
        <Breadcrumb-item class="header-breadcrumb-item"></Breadcrumb-item>
      </Breadcrumb>
      <div class="tool-bar">
        <div class="button-bar">
          <Button class="quit-button" @click="quit">注销</Button>
        </div>
        <div class="avatar-div">
          <img src="" alt="avatar" class="avatar">
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
      data(){
          return{

          }
      },
      methods:{
        quit(){
          this.$Store.commit('$_removeStorage');
          this.$router.push('/login');
        }
      }
    }
</script>

<style scoped>
.container{
  flex-grow: 5;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
  .quit-button{
    outline: none;
  }
  .tool-bar{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: auto 10px;
  }
  .avatar-div{
    border-radius: 50%;
    height: 50px;
    width: 50px;
    box-shadow: 1px 1px 2px 0px rgba(100,100,100,0.3);
  }
  .button-bar{
    margin: auto 20px;
  }
</style>
