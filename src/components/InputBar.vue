<template>
    <div class="input-container" @blur="inputChange">
      <input type="text" class="input-text" :disabled="flag" v-model="value">
      <button :class="['wrench', 'fa', flag?'fa-wrench':'fa-check check']" @click="inputChange"></button>
    </div>
</template>

<script>
    export default {
        name: "InputBar",
      props:[
        "text"
      ],
      data(){
          return{
            value: this.text,
            flag:true
          }
      },
      // beforeUpdate(){
      //     console.log(this.value)
      // },
      // beforeMount(){
      //     console.log(this.value)
      // }
      watch:{
          text:{
            handler(newValue,oldValue){
              // console.log(oldValue+'->'+newValue)
              this.value = newValue
            },
            deep:true
          }
      },
      methods:{
          inputChange(){
            this.flag=!this.flag
            this.$emit("inputChange",this.value)
          }
      }
    }
</script>

<style scoped>
  .input-container{
    display: flex;
  }
  .input-text{
    width: 80px;
    border: 1px solid dodgerblue;
    padding: 2px;
    border-radius: 3px 0px 0px 3px;
    transition: 0.3s ease-in;
  }
  .input-text:disabled{
    border: 1px solid transparent;
    background-color: transparent;
  }
  .wrench{
    padding: 2px 5px;
    border-radius: 0px 3px 3px 0px;
    font-size: 16px;
    cursor: pointer;
    color: dodgerblue;
    border: none;
    margin-left: -1px;
    transition: 0.3s ease-in;
    background-color: transparent;
  }
  .check{
    background-color: dodgerblue;
    color: #fff;
  }
</style>
