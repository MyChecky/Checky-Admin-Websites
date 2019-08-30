<template>
  <div>
    <Card>
      <div class="table-header">
        <span class="card-title">动态列表</span>
        <span class="total">总数：{{essaysSize}}</span>
        <div class="search-div"><SearchBar :search="search"></SearchBar></div>
      </div>
      <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder" :stripe="showStripe" :show-header="showHeader" :size="tableSize" :data="tableData" :columns="tableColumns"></Table>
    </Card>
    <Page class="pager" :total="essaysSize" :page-size="pageSize" @on-change="changePage"></Page>
  </div>
</template>

<script>
  import API from '../../utils/api'
  import PicViewer from '../../components/PicViewer'
  import SearchBar from '../../components/SearchBar'
  import axios from 'axios'

  export default {
    components:{
      PicViewer:PicViewer,
      SearchBar:SearchBar
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
        pageSize: 5,
        tableSize: 'default',
        page: 0,
        essaysSize: 0,
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
          key: 'img',
          render: (h,params) => {
            return h(
              PicViewer,{
                props:{
                  picList: params.row.img
                }
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

        this.$api.essays.queryByKeyword({username:keyword},new CancelToken((c) => {
          this.cancel = c;
        }))
          .then(res=>{
            console.log(res)
            this.tableData = res.data.essays
          })
          .catch(err=>{
            console.log(err)
          })
      },
      changePage(e){
        this.page = e
        this.$api.essays.getEssays({page:this.page})
        .then((res)=>{
          console.log(res.data)
          this.essaysSize = res.data.essaysSize
          this.tableData = res.data.essays
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
