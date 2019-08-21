<template>
  <div>
    <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder" :stripe="showStripe" :show-header="showHeader" :size="tableSize" :data="tableData" :columns="tableColumns"></Table>
    <Page class="pager" :total="usersSize" :page-size="pageSize" @on-change="changePage"></Page>
  </div>
</template>

<script>
  import API from '../utils/api'
  import Credit from '../components/Credit'
  import Avatar from '../components/Avatar'
  export default {
    name: "UsersInfoTable",
    components: {Credit: Credit,Avatar: Avatar},
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
        usersSize: 0,
        stateMapping: {
            'during': '进行中',
            'finish': '已结束',
            'nomatch': '未匹配'
        },
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
          title: '任务ID',
          key: 'taskId',
          width: 200
        });
    
        columns.push({
          title: '用户ID',
          key: 'userId',
          width: 200
        });

        columns.push({
          title: '用户昵称',
          key: 'userName',
          render: (h,params) => {
            return h(
              "a",
              {               
                class:['fa','fa-caret-right'],
                attrs: {
                  userId: this.tableData[params.index].userId,
                },
                on:{
                  click:(e)=>{// 点击事件， e 为事件参数
                    e.stopPropagation();
                    console.log(e.target.attributes.userId);
                    API.users.queryUserInfo(e.target.attributes.userId).then(

                    ).catch(

                    )
                  }
                }
              },
            this.tableData[params.index].userName,
            );
          }
        });
        // columns.push({
        //   title: '性别',
        //   key: 'userGender',
        //   filterMultiple: false,
        //   filters: [
        //     {
        //       label: '男',
        //       value: '男'
        //     },
        //     {
        //       label: '女',
        //       value: '女'
        //     }
        //   ],
        //   filterMethod (value, row) {
        //     return row.userGender === value;
        //   }
        // });
        columns.push({
            title: '任务标题',
            key: 'taskTitle',
            width: 150
        })

        columns.push({
          title: '开始时间',
          key: 'taskStartTime',
          width: 100,
          sortable: true
        });
        columns.push({
          title: '结束时间',
          key: 'taskEndTime',
          width: 100,
          sortable: true
        });
       
        columns.push({
          title: '监督人数',
          key: 'supervisorNum',
          
        //   sortable: true
        });

        columns.push({
          title: '状态',
          key: 'taskState',
          filterMultiple: false,
          filters: [
            {
              label: '已结束',
              value: '已结束'
            },
            {
              label: '进行中',
              value: '进行中'
            },
            {
              label: '未匹配',
              value: '未匹配'
            }
          ],
          filterMethod (value, row) {
            return row.taskState === value;
          }
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
                  backgroundColor: '#2b85e4',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '2px',
                  cursor: 'pointer'
                },
                domProps: {
                  innerText: '详情'
                },
                class:['fa','fa-caret-right'],
                attrs: {
                  userId: this.tableData[params.index].userId,
                },
                on:{
                  click:(e)=>{// 点击事件， e 为事件参数
                    e.stopPropagation();
                    console.log(e.target.attributes.userId);
                    API.users.queryUserInfo(e.target.attributes.userId).then(

                    ).catch(

                    )
                  }
                }
              },
              "详情"
            );
          }
        });
        return columns;
      },
    },
    beforeMount: function(){
      // 请求所有用户信息
      API.tasks.getTasks({"page":this.page}).then((res)=>{
        var userNameMapping = res.data.userNames  
        res.data.tasks.map(item=>{
          item.taskState = this.stateMapping[item.taskState]
          item.userName = userNameMapping[item.userId]
        });
        console.log(res.data.tasks);
        // this.usersSize = res.data.usersSize;
        this.tableData = res.data.tasks;
      }).catch((err)=>{
        console.log(err);
      })
    },
    mounted(){
      this.tableHeight =  window.innerHeight - this.$refs.table.$el.offsetTop - 80;
    },
    methods:{
      // detail(index){
      //   console.log(this.tableData.indexOf(index));
      // }
      changePage(){

      }
    }
  }
</script>

<style scoped>
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
</style>
