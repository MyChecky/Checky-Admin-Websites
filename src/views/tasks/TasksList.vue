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
        }
    }
</script>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
  }
</style>
