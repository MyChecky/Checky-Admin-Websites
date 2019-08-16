<template>
  <div class="container">
    <UsersInfoTable></UsersInfoTable>
  </div>
</template>

<script>
  import UsersInfoTable from '../../components/UsersInfoTable'
  export default {
    name: "UserList",
    components:{
      UsersInfoTable: UsersInfoTable
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
