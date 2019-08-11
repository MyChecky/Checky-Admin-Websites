<template>
  <div class="background-div">
    <div class="container">
      <LoginCard></LoginCard>
    </div>
  </div>
</template>

<script>
  import LoginCard from '../components/LoginCard'
  import Menu from '../components/Menu'

  export default {
    name: "LoginView",
    components: {
      LoginCard
    },
    methods: {
    }
  }
</script>

<style scoped>
  .background-div {
    width: 100%;
    height: 100%;
    background-color: #f3f3f3;
  }

  .container {
    width: 360px;
    height: 450px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
