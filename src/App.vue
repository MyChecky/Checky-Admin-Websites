<template>
    <div id="app" style="height: 100%;width: 100%;">
      <router-view name="container"></router-view>
    </div>
</template>
<script>
  import RouteMenu from '@/components/Menu'
  export default {
    name: 'App',
    components: {RouteMenu},
    data () {
      return {
        spanLeft: 5,
        spanRight: 19
      }
    },
    computed:{
      iconSize () {
        return this.spanLeft === 5 ? 14 : 24;
      }
    },
    methods: {

    }
  }
</script>
<style scoped>
  .layout-header{
    height: 60px;
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid rgba(200,200,200,0.5);
  }
  .logo-div{
    border-radius: 5px;
    color: #fff;
    background-color: #e83015;
    margin: 0px auto 15px auto;
    width: 90%;
    height: 60px;
    box-sizing: content-box;
  }
  .layout-right{
    background-color: #f3f5f5;
  }
  .header-breadcrumb{
    margin: 0px 10px;
  }
  .header-breadcrumb-item{
    font-size: 18px;
    color: #e83015;
  }
  .content{
    padding: 10px;
  }
</style>
