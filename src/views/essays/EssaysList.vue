<template>
  <div>
    <Card>
      <div class="table-header">
        <span class="card-title">动态列表</span>
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
  import PicViewer from '../../components/PicViewer'
  export default {
    components:{
      PicViewer:PicViewer
    },
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
          title: '动态ID',
          key: 'essayId',
          width: 200
        });
        columns.push({
          title: '用户昵称',
          key: 'userName',
        });
        columns.push({
          title: '文本',
          key: 'essayContent',
          width: 250,
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
                      title: this.tableData[params.index].essayContent
                  }
              }, this.tableData[params.index].essayContent)
          ]);

        }

        });
        columns.push({
          title: '时间',
          key: 'essayTime',
          sortable: true,
          width: 200
        });
        columns.push({
          title: '附件',
          key: '',
          render: (h,params) => {
            return h(
              PicViewer,{

              }
            )
          }
        });
        columns.push({
          title: '点赞数',
          key: 'likeNum',
        });
        columns.push({
          title: '评论数',
          key: 'commentNum',
        });
        columns.push({
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h,params) => {
            return h(
              "button",
              {
                style:{
                  padding: '5px 10px',
                  backgroundColor: '#e83015',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '2px',
                  cursor: 'pointer'
                },
                domProps: {
                  innerText: '删除'
                },
                class:['fa','fa-trash-o'],
                attrs: {
                  userId: this.tableData[params.index].essayId,
                },
                on:{
                  click:(e)=>{// 点击事件， e 为事件参数
                    e.stopPropagation();
                   console.log(e.target.attributes.essayId.nodeValue);
                  }
                }
              },
              "删除"
            );
          }
        });
        return columns;
      },
    },
    beforeMount: function(){
      this.$api.essays.getEssays({page:this.page})
        .then((res)=>{
          console.log(res.data)
          this.essaysSize = res.data.essaysSize
          this.tableData = res.data.essays
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
