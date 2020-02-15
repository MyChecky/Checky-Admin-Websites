<template>
  <div class="container">
    <UsersAuthTable></UsersAuthTable>
  </div>
</template>

<script>
  import UsersAuthTable from '../../components/UsersAuthTable'
  export default {
    name: "AuthManage",
    components:{
      UsersAuthTable: UsersAuthTable
    },
    data () {
      return {
      }
    }
  }
</script>

<style scoped>
  .container{
    display: flex;
    flex-direction: column;
  }

</style>
