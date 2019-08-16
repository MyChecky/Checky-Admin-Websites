<template>
  <div>
    <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder" :stripe="showStripe" :show-header="showHeader" :size="tableSize" :data="tableData" :columns="tableColumns"></Table>
    <Page class="pager" :total="usersSize" :page-size="pageSize"></Page>
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
          title: '用户ID',
          key: 'userId',
          width: 200
        });
        columns.push({
          title: '头像',
          key: 'userAvatar',
          render: (h,params)=>{
            return h(
              Avatar,
              {
                props:{
                  source: params.row.userAvatar
                }
              }
            )
          }
        });
        columns.push({
          title: '昵称',
          key: 'userName'
        });
        columns.push({
          title: '性别',
          key: 'userGender',
          filterMultiple: false,
          filters: [
            {
              label: '男',
              value: '男'
            },
            {
              label: '女',
              value: '女'
            }
          ],
          filterMethod (value, row) {
            return row.userGender === value;
          }
        });
        columns.push({
          title: '创建时间',
          key: 'userTime',
          sortable: true
        });
        columns.push({
          title: '任务数',
          key: 'taskNum',
          sortable: true
        });
        columns.push({
          title: '监督数',
          key: 'superviseNum',
          sortable: true
        });
        columns.push({
          title: '信用',
          key: 'credit',
          sortable: true,
          render: (h,params)=>{
            return h(
              Credit,
              {
                props:{
                  score: params.row.credit
                }
              }
            )
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
    },
    mounted(){
      this.tableHeight =  window.innerHeight - this.$refs.table.$el.offsetTop - 80;
    },
    methods:{
      detail(index){
        console.log(this.tableData.indexOf(index));
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
