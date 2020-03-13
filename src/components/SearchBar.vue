<template>
  <div class="search-container">
    <div class="startTime" v-if="status">
      <div class="Time" for=""><span class="TimeFont">起始时间:</span></div>
      <input type="date" v-model="startTime" style="margin-top: 12px;">
      <div class="TimeLeft"></div>
    </div>
    <div class="endTime" v-if="status">
      <div class="Time" for=""><span class="TimeFont">结束时间:</span></div>
      <input type="date" v-model="endTime" style="margin-top: 12px;">
      <div class="TimeRight"></div>
    </div>
    <div v-if="status" style="padding: 10px;">
      <form v-if="tableNow==='timeNickTitle'">
        <input type="radio" v-model="searchType" value="nickname" che>按昵称搜索<br>
        <input type="radio" v-model="searchType" value="title">按标题搜索<br>
        <!--          现在的taskTable里没显示content，故隐藏-->
        <!--          <input type="radio" v-model="searchType"  value="content">按内容搜索<br>-->
      </form>
      <form v-if="tableNow==='timeNickContent'">
        <input type="radio" v-model="searchType" value="nickname" che>按昵称搜索<br>
        <input type="radio" v-model="searchType" value="content">按内容搜索<br>
      </form>
    </div>
    <div v-if="status">
      <span class="TimeFont">关键词:</span>
      <input type="text" class="search-input" v-model="keyword"/>
    </div>
    <!--      <input type="text" :class="['search-input',status?'on1':'off1']" v-model="keyword"/>-->
    <div>
      <button :class="['fa', 'fa-search', 'search-button',status?'on2':'off2']" @click="startSearch"></button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SearchBar",
    props: ["search", "tableNow"],
    data() {
      return {
        searchType: 'nickname',
        endTime: '',
        startTime: '',
        keyword: '',

        status: false,
        timer: null
      }
    },
    methods: {
      startSearch: function () {
        this.status = !this.status;
        console.log("searchBar", this.startTime, this.endTime, this.keyword, this.searchType)
        this.search(this.startTime, this.endTime, this.keyword, this.searchType, 1)
      },
    }
  }
</script>

<style scoped>
  .Time {
    width: 80px;
    height: 50px;
    background: #FFFFFF;
    float: left;
  }

  .startTime {
    float: left;
    margin-left: 0px;
    background: #FFFFFF;

  }

  .TimeFont {
    font-size: 14px;
    color: #8F9DB3;
    float: left;
    margin-left: 20px;
    margin-top: 15px;
  }

  .TimeRight {
    float: right;
    background: #FFFFFF;
    width: 20px;
    height: 50px;
  }

  .TimeLeft {
    float: right;
    background: #FFFFFF;
    width: 20px;
    height: 50px;
  }

  .search-container {
    width: auto;
    max-width: 1200px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 30px;
    /*border-radius: 15px;*/
    padding: 3px;
    transition: 0.3s ease-in-out;
  }

  .search-container:hover {
    box-shadow: 1px 1px 5px 0px rgba(100, 100, 100, 0.3);
  }

  /*.on{*/
  /*  border: 1px solid dodgerblue;*/
  /*}*/
  .search-button {
    border: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: #fff;
    color: dodgerblue;
    font-size: 20px;
    transition: 0.3s ease-in-out;
  }

  .search-input {
    border: 1px solid dodgerblue;
    height: 25px;
    border-radius: 12.5px;
    padding: 2px 5px;
    transition: 0.5s 0.1s ease-in-out;
    border: none;
    margin-top: 12px;
  }

  .on1 {
    max-width: 200px;
  }

  .off1 {
    max-width: 0px;
    padding: 0px;
  }

  .on2 {
    transform: rotate(90deg);
  }

  .off2 {
    transform: rotate(0deg);
  }
</style>
