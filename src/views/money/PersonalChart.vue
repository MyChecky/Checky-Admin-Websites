<template>
  <Card>
    <div class="user_data">
      <span>用户id：{{userId}}</span>
    </div>
    <Tabs value="realMoney" :capture-focus="true">
      <TabPane label="真实金额" name="realMoney">
        <RealMoneyChart :userId="userId"/>
      </TabPane>
      <TabPane label="测试金额" name="testMoney">
        <TestMoneyChart/>
      </TabPane>
    </Tabs>
  </Card>
</template>
<script>
  import RealMoneyChart from "../../components/UserRealMoneyChart";
  import TestMoneyChart from "../../components/UserTestMoneyChart";

  export default {
    name:'PersonalChart',
    components:{
      RealMoneyChart,
      TestMoneyChart
    },
    data() {
      return {
        nickname: "华",
        userId: 'ow-ZO5S3yk22gBmaQI0cJuGsdSfI'
      }
    },
    beforeMount() {
      if (localStorage.users === 'false') {
        this.$router.push(`/404`)
      }
      let id = this.$route.params.userId;
      console.log(`查询用户:${id}`);
      this.userId = id;
    }
  }
</script>


<style scoped>
  .user_data {
    margin-bottom: 10px;
    display: flex;
    align-items: flex-end;
  }
</style>
