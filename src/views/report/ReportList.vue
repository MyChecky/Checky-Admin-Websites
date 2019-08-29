<template>
  <div>
    <Card>
      <div class="table-header">
        <span class="card-title">举报列表</span>
        <span class="total">总数：{{tableData.length}}</span>
        <div class="search-div"></div>
      </div>
      <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder" :stripe="showStripe" :show-header="showHeader" :size="tableSize" :data="tableData" :columns="tableColumns"></Table>
    </Card>
    <Page class="pager" :total="essaysSize" :page-size="pageSize" @on-change="changePage"></Page>
  </div>
</template>

<script>
  import API from '../../utils/api'
  export default {
    data () {
      return {
        showBorder:false,
        showStripe:false,
        showHeader:true,
        showIndex:false,
        showCheckbox:true,
        fixedHeader:false,
        tableHeight: 600,
        pageSize: 10,
        tableSize: 'default',
        page: 0,
        essaysSize: 0,
        tableData: [
        ]
      }
    },
    computed: {
      tableColumns () {
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
          title: '举报ID',
          key: 'reportId',
        });
        columns.push({
          title: '举报用户ID',
          key: 'userId',
        });
        columns.push({
          title: '昵称',
          key: 'userName',
        });
        columns.push({
          title: '举报对象',
          key: 'reportType',
        });
        columns.push({
          title: '举报对象ID',
          key: 'objectId',
        });
        
        columns.push({
          title: '举报内容',
          key: 'reportContent',
          width: 300,
          render: (h, params) => {
            return h('div', [
              h('span', {
                  style: {
                      display: 'inline-block',
                      width: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                  },
                  domProps: {
                      title: this.tableData[params.index].reportContent
                  }
              }, this.tableData[params.index].reportContent)
          ]);
            
        }
          
        });
        columns.push({
          title: '举报时间',
          key: 'reportTime',
          sortable: true,
        });
        columns.push({
          title: '操作',
          key: 'action',
          align: 'center',
          width: 200,
          render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.$api.report.deal({
                                  result: 'pass',
                                  reportId: this.tableData[params.index].reportId
                                }).then(res=>{
                                  if(res.data.state === 'ok') this.tableData.splice(params.index,1)
                                })
                            }
                        }
                    }, '通过'),
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                this.$api.report.deal({
                                  result: 'deny',
                                  reportId: this.tableData[params.index].reportId
                                }).then(res=>{
                                  if(res.data.state === 'ok') this.tableData.splice(params.index,1)
                                })
                            }
                        }
                    }, '拒绝')
                ]);
            }
        });
        return columns;
      },
    },
    beforeMount: function(){
      this.$api.report.getReports({page:this.page})
        .then(res=>{
            console.log(res.data)
            res.data.reports.map(item=>{
                item.reportType = this.$translator.translator('reportType',item.reportType)
            })
            this.tableData = res.data.reports
        })
    },
    mounted(){
      this.tableHeight =  window.innerHeight - this.$refs.table.$el.offsetTop - 125;
    },
    methods:{
      // detail(index){
      //   console.log(this.tableData.indexOf(index));
      // }
      changePage(e){
        this.page = e
        API.users.queryUsersInfo({"page":this.page}).then((res)=>{
          res.data.users.map(item=>{
            item.userGender = item.userGender===1?'男':'女'
          });
          console.log(res.data.users);
          this.usersSize = res.data.usersSize;
          this.tableData = res.data.users;
        }).catch((err)=>{
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped>
  .table-header{
    margin-bottom: 10px
  }
  .table{
    margin: auto 0px;
    height: 100%;
  }
  .pager{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 5px auto;
  }
  .card-title{
    font-weight: 600;
    color: #333;
    font-size: 20px;
    margin-bottom: 10px;
  }
</style>
