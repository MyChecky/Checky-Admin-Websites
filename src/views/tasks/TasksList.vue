<template>
    <div class="container">
        <UsersInfoTable></UsersInfoTable>
    </div>
</template>

<script>
    import UsersInfoTable from '../../components/TaskInfoTable.vue'
    export default {
        name: "TasksList",
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
