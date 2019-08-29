<template>
    <div :class="['search-container',status?'on':'']">
      <input type="text" :class="['search-input',status?'on1':'off1']" v-model="keyword"/>
      <button :class="['fa', 'fa-search', 'search-button',status?'on2':'off2']" @click="status=!status"></button>
    </div>
</template>

<script>
    export default {
      name: "SearchBar",
      props:["search"],
      data(){
          return{
            keyword: '',
            status: true,
            timer:null
          }
      },
      watch:{
        keyword:{
          handler:function(){
            // 通过计时器减少请求次数
            if(this.timer){
              clearTimeout(this.timer);
            }
            if(this.keyword){
              this.timer = setTimeout(() => {
                this.search(this.keyword,1)
              }, 500)
            }else{
              // 输入框中的内容被删为空时触发，此时会清除之前展示的搜索结果
              this.search(this.keyword,1)
            }
          }
        }
      },
      methods:{
      }
    }
</script>

<style scoped>
  .search-container{
    width: auto;
    max-width: 300px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 30px;
    border-radius: 15px;
    padding: 3px;
    transition: 0.3s  ease-in-out;
  }
  .search-container:hover{
    box-shadow: 1px 1px 5px 0px rgba(100,100,100,0.3);
  }
  .on{
    border: 1px solid dodgerblue;
  }
  .search-button{
    border: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: #fff;
    color: dodgerblue;
    font-size: 20px;
    transition: 0.3s  ease-in-out;
  }
  .search-input{
    height: 25px;
    border-radius: 12.5px;
    padding: 2px 5px;
    transition: 0.5s 0.1s ease-in-out;
    border: none;
  }
  .on1{
    max-width: 200px;
  }
  .off1{
    max-width: 0px;
    padding: 0px;
  }
  .on2{
    transform: rotate(90deg);
  }
  .off2{
    transform: rotate(0deg);
  }
</style>
