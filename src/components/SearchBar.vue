<template>
    <div :class="['container',status?'on':'']">
      <input type="text" :class="['search-input',status?'on1':'off1']"/>
      <button :class="['fa', 'fa-search', 'search-button',status?'on2':'off2']" @click="status=!status"></button>
    </div>
</template>

<script>
    export default {
        name: "SearchBar",
      data(){
          return{
            keyword: '',
            status: true
          }
      }
    }
</script>

<style scoped>
  .container{
    width: auto;
    max-width: 300px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 30px;
    border-radius: 15px;
    padding: 5px;
    transition: 0.3s  ease-in-out;
  }
  .container:hover{
    border: 1px solid dodgerblue;
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
