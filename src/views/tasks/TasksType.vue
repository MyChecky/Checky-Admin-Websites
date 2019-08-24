<template>
  <div>
    <Card>
      <div class="table-header">
        <span class="card-title">现有类型</span>
        <span class="total"> 总数：{{types.length}}</span>
        <div class="search-div"></div>
      </div>
      <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder" :stripe="showStripe" :show-header="showHeader" :size="tableSize" :data="types" :columns="typeColumn"></Table>
    </Card>
    <Card>
      <div class="table-header">
        <span class="card-title">建议列表</span>
        <span class="total">总数：{{typeSuggestions.length}}</span>
        <div class="search-div"></div>
      </div>
      <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder" :stripe="showStripe" :show-header="showHeader" :size="tableSize" :data="typeSuggestions" :columns="suggestionColumn"></Table>
    </Card>
    <!-- <Page class="pager" :total="essaysSize" :page-size="pageSize" @on-change="changePage"></Page> -->
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
        ],
        types: [],
        typeSuggestions: [],
      }
    },
    computed: {
      typeColumn () {
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
          title: '类别',
          key: 'typeContent',
          width: 200
        });
        
        columns.push({
          title: '操作',
          key: 'action',
          align: 'center',
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
                                this.show(params.index)
                            }
                        }
                    }, '修改'),
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                this.remove(params.index)
                            }
                        }
                    }, '删除')
                ]);
            }
        });
        return columns;
      },
      suggestionColumn () {
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
          title: '建议ID',
          key: 'suggestionId',
          width: 200
        });
        columns.push({
          title: '建议人ID',
          key: 'userId',
        });
        columns.push({
          title: '建议人用户名',
          key: 'userName',
        });
        columns.push({
          title: '内容',
          key: 'suggestionContent',
        });
        columns.push({
          title: '建议时间',
          key: 'suggestionTime',
        });

        columns.push({
          title: '操作',
          key: 'action',
          align: 'center',
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
                                this.show(params.index)
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
                                this.remove(params.index)
                            }
                        }
                    }, '拒绝')
                ]);
            }
        });
        return columns;
      }
    },
    beforeMount: function(){
      this.$api.tasks.queryType({})
        .then((res)=>{
          console.log(res.data)
            this.types = res.data.types
        })
        .catch(err=>{
          
        })
      this.$api.tasks.queryTypeSuggestion({})
        .then((res)=>{
          console.log(res.data)
            this.typeSuggestions = res.data.suggestions
        })
    },
    mounted(){
      //this.tableHeight =  window.innerHeight - this.$refs.table.$el.offsetTop - 125;
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
