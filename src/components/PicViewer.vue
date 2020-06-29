<template>
    <div class="pic-container">
      <button class="view-button" @click="show=!show">预览</button>
      <div class="cover" v-if="show" @click="show=!show"></div>
      <div :class="['outer-div',]" v-if="show">
        <div class="pics">
          <img :src="baseURL+pics[index].fileAddr" alt="pic" class="pic-img">
        </div>
        <div class="button-bar">
          <button class="turn-button fa fa-angle-left" @click="last"></button>
          <span class="index-tag">附件 {{index+1}}</span>
          <button class="turn-button fa fa-angle-right" @click="next"></button>
        </div>
      </div>
    </div>
</template>

<script>

  import {base} from '../utils/axios'
    export default {
      name: "PicViewer",
      props:[
        "picList"
      ],
      data(){
          return {
            baseURL: base+'/',
            show:false,
            pics:this.picList,
            index:0
          }
      },
      methods:{
        next(){
          this.index = (this.index+1)%this.pics.length
        },
        last(){
          if (this.index===0)
            this.index = this.pics.length-1
          else
            this.index = (this.index-1)%this.pics.length
        }
      }
    }
</script>

<style scoped>
  .cover{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(100,100,100,0.2);
  }
  .pic-container{
  }
  .outer-div{
    position: fixed;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 2px 2px 15px 2px rgba(200,200,200,0.8);
    z-index: 1001;
    padding: 5px;
    width: auto;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .view-button{
    border: none;
    background-color: transparent;
    text-decoration: underline;
    color: dodgerblue;
    cursor: pointer;
  }
  .button-bar{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .turn-button{
    border: none;
    padding: 2px 10px;
    background-color: #fff;
    color: dodgerblue;
    font-size: 20px;
    cursor: pointer;
    margin: 2px 5px;
    border-radius: 5px;
  }
  .turn-button:hover{
    background-color: dodgerblue;
    color: #fff;
  }
  .pics{
    margin-bottom: 2px;
  }
  .pic-img{
    width: 300px;
    height: 400px;
    background-size: cover;
  }
</style>
