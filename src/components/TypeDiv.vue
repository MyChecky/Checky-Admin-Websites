<template>
    <div class="type-div" :style="{backgroundColor:color[index%5]}">
      <span class="type-tag">{{content}}</span>
      <div class="button-bar">
        <button class="type-op operation fa fa-angle-down"></button>
        <button class="type-op delete fa fa-times" @click="deleteType"></button>
      </div>
    </div>
</template>

<script>
    export default {
      name: "TypeDiv",
      props:["typeItem","i","callback"],
      data(){
          return{
            content:this.typeItem.typeContent,
            id:this.typeItem.typeId,
            index:this.i,
            color: [
              "#fc4949",
              "#f58506",
              "#2D8CF0",
              "#f6bb28",
              "#5bc49f"
            ]
          }
      },
      beforeMount(){
          // console.log(this.color[this.index%5])
      },
      updated(){
        // console.log(this.content)
      },
      methods:{
        deleteType(){
            this.callback(this.id)
          }
      }
    }
</script>

<style scoped>
  .type-div{
    width: 100px;
    height: 40px;
    border-radius: 3px;
    transition: 0.2s ease-in;
    padding: 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px;
    color: #fff;
  }
  .type-div:hover{
    box-shadow: 1px 1px 8px 1px rgba(100,100,100,0.3);
  }
  .type-tag{}
  .button-bar{
    position: relative;
    width: 20px;
    height: 100%;
    overflow: hidden;
  }
  .type-op{
    position: absolute;
    border: none;
    color: #fff;
    background-color: transparent;
    transition: 0.5s ease-in-out;
    font-size: 20px;
  }
  .operation{
    font-weight: 600;
    z-index: 10;
    top: 0;
  }
  .delete{
    z-index: 11;
    top: -100%;
    cursor: pointer;
  }
  .delete:active{
    transition: 0.1s ease-in;
    transform: scale(1.15);
    color: #dddddd;
  }
  .button-bar:hover > .delete{
    top: 0px;
  }
  .button-bar:hover > .operation{
    top: 100%;
  }
</style>
