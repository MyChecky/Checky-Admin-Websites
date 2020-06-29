<template>
  <Card>
    <Tabs value="realMoney" :capture-focus="true">
      <TabPane label="真实金额" name="realMoney">
        <RealMoneyChart/>
      </TabPane>
      <TabPane label="测试金额" name="testMoney">
        <TestMoneyChart/>
      </TabPane>
    </Tabs>
  </Card>
</template>
<script>
  import RealMoneyChart from "../../components/RealMoneyChart";
  import TestMoneyChart from "../../components/TestMoneyChart";

  export default {
    name:'PersonalChart',
    components:{
      RealMoneyChart,
      TestMoneyChart
    }
  }
</script>


<style scoped>

</style>
