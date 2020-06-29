<template>
    <div class="container">
      <div class="check-info">
        <div class="info">
          <Card style="height: 100%;">
            <div>
              <span class="card-title">基本信息</span>
              <button v-if="false" class="fa fa-times" style="float: right"></button>
            </div>
            <div class="inner-card" style="height: 100%;">
              <div class="left-div">
                  <div class="item">
                    <span class="tag">用户ID：</span>
                    <span class="content-span">{{checkInfo.check.userId}}</span>
                  </div>
                <div class="item">
                  <span class="tag">用户昵称：</span>
                  <span class="content-span">{{username}}</span>
                </div>
                <div class="item">
                  <span class="tag">打卡ID：</span>
                  <div class="content-span">{{checkInfo.check.checkId}}</div>
                </div>
                <div class="item">
                  <span class="tag">打卡时间：</span>
                  <span class="content-span">{{checkInfo.check.checkTime}}</span>
                </div>
                <div class="item">
                  <span class="tag">监督人数：</span>
                  <span class="content-span">{{checkInfo.check.superviseNum}}</span>
                </div>
                <div class="item">
                  <span class="tag">通过人数：</span>
                  <span class="content-span">{{checkInfo.check.passNum}}</span>
                </div>
                <div class="item">
                  <span class="tag">打卡状态：</span>
                  <span class="content-span">{{checkInfo.check.checkStateContent}}</span>
                </div>
                <div class="item">
                  <span class="tag">文本:</span>
                  <div class="content-span">{{checkInfo.text.recordContent}}</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div class="supervisor">
          <Card>
            <Table class="table" highlight-row ref="table"
                   :height="tableHeight" :border="showBorder" :stripe="showStripe" :show-header="showHeader" :size="tableSize" :data="tableData" :columns="tableColumns">
            </Table>
          </Card>
        </div>
        <button class="view-button" @click="out = !out" :class="[out?'btn-out':'']">
          <span>附件</span>
          <span class="fa fa-angle-double-left" style="font-size: 20px;" :class="[out?'span-out':'']"></span>
        </button>
        <Card class="slider-card" :class="[out?'card-out':'']">
          <span class="card-title">附件</span>
          <div class="inner-card">
            <Carousel class="slider" dots="outside" trigger="hover" arrow="always">
              <Carousel-item v-for="item of checkInfo.images" :key="item.recordId">
                <div class="demo-carousel">
                  <img :src="baseURL+item.fileAddr" class="pic"/>
                </div>
              </Carousel-item>
            </Carousel>
          </div>
        </Card>
      </div>
    </div>
</template>

<script>
  import {base} from '../../utils/axios'
    export default {
        name: "CheckDetail",
      data(){
          return{
            baseURL: base+'/',
            out: false,
            showBorder:false,
            showStripe:false,
            showHeader:true,
            showIndex:false,
            showCheckbox:false,
            fixedHeader:false,
            tableHeight: 600,
            pageSize: 10,
            tableSize: 'default',
            tableData: [],
            checkInfo:{},
            username:""
          }
      },
      computed:{
        tableColumns(){
          let columns = [];
          if (this.showCheckbox) {
            columns.push({
              type: 'selection',
              width: 60,
              align: 'center'
            })
          }
          if (this.showIndex) {
            columns.push({
              type: 'index',
              width: 60,
              align: 'center'
            })
          }
          columns.push({
            title: '监督者ID',
            key: 'supervisorId',
          });
          columns.push({
            title: '昵称',
            key: 'supervisorName',
          });
          columns.push({
            title: '态度',
            key: 'supervisorState'
          });
          return columns;
        }
      },
      beforeMount(){
        //查询当前登录用户的部门
        if (localStorage.tasks === 'false') {
          this.$router.push(`/404`)
        }
          this.$api.checks.getCheckDetail({taskId:this.$route.params.taskId,checkId:this.$route.params.checkId})
            .then(res=>{
              this.tableData = res.data.adminCheckDetail.supervisorStates
              this.checkInfo = res.data.adminCheckDetail.checkHistory
              this.checkInfo.check.checkStateContent = this.$translator.translator("checkState",this.checkInfo.check.checkState)
              this.username = res.data.adminCheckDetail.userName
              this.tableData.map(item=>{
                item.supervisorState = this.$translator.translator("checkState",item.supervisorState)
              })
              console.log(this.checkInfo)
            })
            .catch(err=>{
              console.log(err)
            })
      }
    }
</script>

<style scoped>
  .check-info{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    overflow: hidden;
  }
  .info{
    margin-right: 10px;
    idth: 40%;
  }
  .supervisor{
    flex-grow: 5;
  }
  .view-button{
    z-index: 100;
    width: 70px;
    height: 50px;
    position: fixed;
    left: 100%;
    top: 80px;
    transform: translateX(-100%);
    padding: 2px 5px;
    font-size: 14px;
    border: none;
    border-radius: 5px 0px 0px 5px;
    background-color: dodgerblue;
    color: #fff;
    box-shadow: 1px 1px 5px 2px rgba(100,100,100,0.5);
    cursor: pointer;
  }
  .view-button>span{
    margin: auto;
    transition: 0.5s ease-in-out;
  }
  .span-out{
    transform: rotateY(180deg);
    top: 20px;
  }
  .card-out{
    transform: translateX(-100%);
  }
  .slider-card{
    z-index: 99;
    transition: 0.5s ease-in-out;
    position: fixed;
    left: 100%;
    top: 130px;
  }
  .slider{
    width: 300px;
  }
  .pic{
    width: 100%;
    height: 400px;
    background-color: #fff;
    background-size: cover;
  }
  .card-title {
    font-weight: 600;
    color: #333;
    font-size: 20px;
    margin-right: 10px;
  }

  .inner-card {
    flex-grow: 2;
    display: flex;
    margin: 5px;
    align-items: center;
    justify-content: flex-start;
  }
  .right-div,.left-div{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 80%;
    margin: auto 10px;
  }
  .item{
    display: flex;
    justify-content: flex-start;
  }
  .tag{
    min-width: 80px;
  }
  .content-span{
    /*width: auto;*/
    max-width: calc(100% - 80px);
    text-wrap: normal;
    overflow-wrap: break-word;
  }
</style>
