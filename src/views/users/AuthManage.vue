<template>
  <div class="container">
    <AdminAuthTable></AdminAuthTable>
  </div>
</template>

<script>
  import AdminAuthTable from '../../components/AdminAuthTable'
  export default {
    name: "AuthManage",
    components:{
      AdminAuthTable: AdminAuthTable
    },
    data () {
      return {
      }
    },
    methods: {
      getAuths(){

      },
    }
  }
</script>

<style scoped>
  .container{
    display: flex;
    flex-direction: column;
  }

</style>
