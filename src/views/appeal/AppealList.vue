<template>
  <div>
    <Card>
      <div class="table-header">
        <span class="card-title">申诉列表</span>
        <span class="total">总数：{{appealsSize}}</span>
        <div class="search-div"><SearchBar :search="search"></SearchBar></div>
      </div>
      <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder" :stripe="showStripe" :show-header="showHeader" :size="tableSize" :data="tableData" :columns="tableColumns"></Table>
    </Card>
    <Page class="pager" :total="appealsSize" :page-size="pageSize" @on-change="changePage"></Page>
  </div>
</template>

<script>
  import API from '../../utils/api'
  import SearchBar from '../../components/SearchBar'
  import axios from 'axios'
  export default {
    components:{
      SearchBar:SearchBar
    },
    data () {
      return {
        showBorder:false,
        showStripe:false,
        showHeader:true,
        showIndex:false,
        showCheckbox:false,
        fixedHeader:false,
        tableHeight: 600,
        pageSize: 5,
        tableSize: 'default',
        page: 0,
        appealsSize: 0,
        tableData: [
        ],
        cancel:null,
        kw:""
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
          title: '申诉ID',
          key: 'appealId',
        });
        columns.push({
          title: '申诉用户ID',
          key: 'userId',
        });
        columns.push({
          title: '昵称',
          key: 'userName',
        });
        columns.push({
          title: '任务ID',
          key: 'taskId',
        });
        columns.push({
          title: '打卡ID',
          key: 'checkId',
        });
        columns.push({
          title: '申诉内容',
          key: 'appealContent',
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
                      title: this.tableData[params.index].appealContent
                  }
              }, this.tableData[params.index].appealContent)
          ]);

        }

        });
        columns.push({
          title: '申诉时间',
          key: 'appealTime',
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
                                this.$api.appeal.deal({
                                  result: 'pass',
                                  appealId: this.tableData[params.index].appealId
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
                                this.$api.appeal.deal({
                                  result: 'deny',
                                  appealId: this.tableData[params.index].appealId
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
      this.$api.appeal.getAppeals({page:this.page})
        .then(res=>{
            console.log(res.data)
            this.tableData = res.data.appeals
            this.appealsSize = res.data.appealsSize
        })
    },
    mounted(){
      this.tableHeight =  window.innerHeight - this.$refs.table.$el.offsetTop - 125;
    },
    methods:{
      // detail(index){
      //   console.log(this.tableData.indexOf(index));
      // }
      search:function(keyword,page){
        this.page = page;
        this.kw = keyword;
        // 解决异步问题
        if (this.cancel){// 存在上一次请求则取消
          this.cancel();
        }
        console.log(`搜索${this.kw},页码${this.page}`);
        // 定义CancelToken，它是axios的一个属性，且是一个构造函数
        let CancelToken = axios.CancelToken;

        this.$api.appeal.queryByKeyword({username:keyword},new CancelToken((c) => {
          this.cancel = c;
        }))
          .then(res=>{
            console.log(res)
            this.tableData = res.data.appeals
          })
          .catch(err=>{
            console.log(err)
          })
      },
      changePage(e){
        this.page = e
        this.$api.appeal.getAppeals({page:e})
        .then(res=>{
            console.log(res.data)
            this.tableData = res.data.appeals
            this.appealsSize = res.data.appealsSize
        })
      }
    }
  }
</script>

<style scoped>
  .table-header{
    margin-bottom: 10px;
    display: flex;
    align-items: flex-end;
  }
  .search-div{
    flex-grow: 5;
    display: flex;
    justify-content: flex-end;
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
  .card-title {
    font-weight: 600;
    color: #333;
    font-size: 20px;
    margin-right: 10px;
  }
</style>
