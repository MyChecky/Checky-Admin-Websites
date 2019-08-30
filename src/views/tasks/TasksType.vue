<template>
  <div>
    <Card style="margin-bottom: 10px">
      <div class="table-header">
        <span class="card-title">现有类型</span>
        <span class="total"> 总数：{{types.length}}</span>
        <div class="search-div"></div>
      </div>
      <div class="types-div">
        <typeDiv v-for="(item,index) in types" :typeItem = item :i=index :key="item.typeId" :callback="deleteType"></typeDiv>
      </div>
    </Card>
    <Card>
      <div class="table-header">
        <span class="card-title">建议列表</span>
        <span class="total">总数：{{typeSuggestions.length}}</span>
        <div class="search-div"></div>
      </div>
      <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder" :stripe="showStripe" :show-header="showHeader" :size="tableSize" :data="typeSuggestions" :columns="suggestionColumn"></Table>
    </Card>
  </div>
</template>

<script>
  import TypeDiv from '../../components/TypeDiv'
  import InputBar from '../../components/InputBar'
  export default {
    components:{
      TypeDiv:TypeDiv,
      InputBar:InputBar
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
          render:(h,params)=>{
            return h(
              InputBar,{
                props: {
                  text: params.row.suggestionContent
                },
                on:{
                  inputChange:(val)=>{
                    params.row.suggestionContent = val
                    this.typeSuggestions[params.index].suggestionContent = val
                  }
                }
              }
            )
          }
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
                              console.log(this.typeSuggestions[params.index].suggestionContent)
                                this.$api.tasks.passSuggestion({
                                  suggestionId: this.typeSuggestions[params.index].suggestionId,
                                  typeContent: this.typeSuggestions[params.index].suggestionContent
                                }).then(res=>{
                                  if(res.data.state === 'ok') {
                                    let temp = this.typeSuggestions;
                                    temp.splice(params.index,1)
                                    this.typeSuggestions = temp
                                  }
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
                                this.$api.tasks.denySuggestion({
                                  suggestionId: this.typeSuggestions[params.index].suggestionId
                                }).then(res=>{
                                  if(res.data.state === 'ok') {
                                    let temp = this.typeSuggestions;
                                    temp.splice(params.index,1)
                                    this.typeSuggestions = temp
                                  }
                                })
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
          this.types = res.data.taskTypes? res.data.taskTypes:res.data;
          console.log(this.types);
        })
        .catch(err=>{
          console.log(err)
        });
      this.$api.tasks.queryTypeSuggestion({page:this.page})
        .then((res)=>{
          console.log(res.data);
          this.typeSuggestions = res.data.suggestions;
        })
        .catch(err=>{
          console.log(err)
        })
    },
    mounted(){
      //this.tableHeight =  window.innerHeight - this.$refs.table.$el.offsetTop - 125;
    },
    methods:{
      deleteType(id){
        this.$api.tasks.deleteType({typeId:id}).then(res=> {
          let temp =this.types;
          for (let n = 0;n<temp.length;n++) {
            if (temp[n].typeId === id){
              temp.splice(n, 1);
              break;
            }
          }

          this.types = temp
        }).catch(err=>{
        });
      },
      changePage(e){
        this.page = e
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
  .types-div{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
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
