<template>
    <div>
      payback
    </div>
</template>

<script>
    export default {
        name: "PayBack",
      beforeMount() {
        //查询当前登录用户的部门
        if (localStorage.money === 'false') {
          this.$router.push(`/404`)
        }
      }
    }
</script>

<style scoped>

</style>
