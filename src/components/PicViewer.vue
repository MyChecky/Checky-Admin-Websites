<template>
    <div class="pic-container">
      <button class="view-button" @click="show=!show">预览</button>
      <div :class="['outer-div',]" v-if="show">
        <div class="pics"></div>
        <div class="button-bar">
          <button class="turn-button next fa fa-angle-left"></button>
          <button class="turn-button last fa fa-angle-right"></button>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "PicViewer",
      data(){
          return {
            show:false
          }
      },
      computed(){

      }
    }
</script>

<style scoped>
  .pic-container{
  }
  .outer-div{
    position: absolute;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 2px 2px 15px 2px rgba(200,200,200,0.8);
    z-index: 50;
    width: 300px;
    height: 300px;
  }
  .down{transform: translate(-45%,5px);}
  .up{transform: translate(-45%,-100%);}
  .view-button{
  border: none;
  background-color: transparent;
  text-decoration: underline;
  color: dodgerblue;
  cursor: pointer;
}
</style>
