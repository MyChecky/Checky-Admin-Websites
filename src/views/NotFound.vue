<template>
  <div>
    <div class="container">
      <span class="notice fa fa-exclamation-triangle">  404: Not Found!</span>
      <span class="info">┗|｀O′|┛ 嗷~~，你要的页面找不到了！</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NotFound"
  }
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 50px;
    color: #fff;
    position: absolute;
    height: 300px;
    width: 600px;
    top: calc(50% - 150px);
    left: calc(50% - 300px);
    transform: scale(0.01,0.01);
    background-color: #e83015;
    padding: 30px 10px;
    box-shadow: 0px 0px 10px 1px rgba(100,100,100,0.3);
    border-radius: 5px;
    animation: jumpout 0.5s 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.5) both;
  }
  @keyframes jumpout{
    25%{transform: scale(1.1,0.9)}
    50%{transform: scale(0.9,1.1)}
    100%{transform: scale(1,1)}
  }
  .notice {
    margin: 10px auto;
    letter-spacing: 2px;
    text-align: center;
  }

  .info {
    text-align: center;
    background-color: #fff;
    padding: 20px 10px;
    color: #999;
    font-size: 30px;
    border-radius: 5px;
  }
</style>
