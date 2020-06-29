<template>
    <div class="container">
        <TaskInfoTable></TaskInfoTable>
    </div>
</template>

<script>
    import TaskInfoTable from '../../components/TaskInfoTable.vue'
    export default {
        name: "TasksList",
        components:{
          TaskInfoTable: TaskInfoTable
        },
        data () {
            return {
            }
        },
        beforeMount() {
          //查询当前登录用户的部门
          if (localStorage.tasks === 'false') {
            this.$router.push(`/404`)
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
