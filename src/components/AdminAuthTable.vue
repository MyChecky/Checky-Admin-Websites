<template>
  <div>
    <Card>
      <div class="table-header">
        <span class="card-title">管理员列表</span>
        <span class="total">总数：{{this.adminsSize}}</span>
<!--        <div class="search-div">-->
<!--          <SearchBar :search="search"></SearchBar>-->
<!--        </div>-->
      </div>
      <Table class="table" highlight-row ref="table" :height="tableHeight" :border="showBorder" :stripe="showStripe"
             :show-header="showHeader" :size="tableSize" :data="tableData" :columns="tableColumns"></Table>
    </Card>
    <Page class="pager" :total="adminsSize" :page-size="pageSize" @on-change="changePage"></Page>
    <Drawer
      title="用户权限"
      placement="left"
      v-model="value3"
      width="360"
      :mask-closable="false"
      :styles="styles"
    >
      <Form :model="formData">
        <Row :gutter="16">
          <Col span="20">
            <FormItem label="用户名" label-position="top">
              <Input v-model="formData.userName"/>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="20">
            <FormItem label="部门" label-position="top">
              <label>
                <Select v-model="formData.department" placeholder="请选择管理员所在部门" value="department">
                  <Option value="super">super</Option>
                  <Option value="money">money</Option>
                  <Option value="task">task</Option>
                </Select>
              </label>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="20">
            <FormItem label="电话" label-position="top">
              <Input v-model="formData.userTel" placeholder="请输入管理员联系电话" value="userTel"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="20">
            <FormItem label="邮箱" label-position="top">
              <Input v-model="formData.userEmail" placeholder="请输入管理员邮箱" value="userEmail"/>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="value3 = false">Cancel</Button>
        <Button type="primary" @click="updateAuth"> Submit</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
  import SearchBar from '../components/SearchBar'
  import API from '../utils/api'
  import Credit from '../components/Credit'
  import Avatar from '../components/Avatar'
  import axios from 'axios';
  import Authorize from "./Authorize";

  export default {
    name: "AdminAuthTable",
    components: {Credit: Credit, Avatar: Avatar, SearchBar: SearchBar, Authorize: Authorize},
    data: function () {
      return {
        showBorder: false,
        showStripe: false,
        showHeader: true,
        showIndex: false,
        showCheckbox: true,
        fixedHeader: false,
        tableHeight: 600,
        pageSize: 10,
        tableSize: 'default',
        page: 0,
        adminsSize: 0,
        tableData: [],
        cancel: null,
        kw: "",
        department: "",
        formData: {
          userId: '',
          userName: '',
          department: '',
          userTel: '',
          userEmail: '',
        },
        value3: false,
      }
    },
    computed: {
      tableColumns() {
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
            width: 90,
            align: 'center'
          })
        }
        columns.push({
          title: '用户ID',
          key: 'userId',
          align: 'center',
          width: 150
        });
        columns.push({
          title: '昵称',
          key: 'userName',
          align: 'center',
          width: 150
        });
        columns.push({
          title: '部门',
          key: 'department',
          align: 'center',
          width: 150
        });
        columns.push({
          title: '电话',
          key: 'userTel',
          align: 'center',
          width: 200
        });
        columns.push({
          title: '邮箱',
          key: 'userEmail',
          align: 'center',
          width: 200
        });
        columns.push({
          title: '授权',
          key: 'authorize',
          align: 'center',
          render: (h, params) => {
            return h(
              "button",
              {
                style: {
                  padding: '5px 10px',
                  backgroundColor: '#2b85e4',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '2px',
                  cursor: 'pointer'
                },
                class: 'fa',
                attrs: {
                  userId: this.tableData[params.index].userId,
                },
                on: {
                  click: (e) => {// 点击事件， e 为事件参数
                    this.value3 = true;
                    let id = this.tableData[params.index].userId;
                    e.stopPropagation();
                    //console.log("tableData[params.index]",this.tableData[params.index].userId);
                    this.$api.admins.queryAdmin({
                      userId: id,
                    })
                      .then(res => {
                        this.formData.userId = res.data.admin.userId;
                        this.formData.userName = res.data.admin.userName;
                        this.formData.userEmail = res.data.admin.userEmail;
                        this.formData.department = res.data.admin.department;
                        this.formData.userTel = res.data.admin.userTel;
                      })
                      .catch(err => {
                        console.log(err)
                      })
                  }
                }
              },
              "更改权限"
            );
          }
        });
        return columns;
      },
    },
    beforeMount: function () {
      if (localStorage.admin === 'false') {
        this.$router.push(`/404`)
      }
      // 请求所有用户信息
      this.$api.admins.queryAdminsInfo({
        "page": this.page,
        "pageSize": this.pageSize
      }).then((res) => {
        this.adminsSize = res.data.total;
        this.tableData = res.data.admins;
      }).catch((err) => {
        console.log(err);
      });
      //查询当前登录用户的部门
      if (localStorage.department === '"money"' || localStorage.department === '"task"') {
        this.$router.push(`/404`)
      }
    },
    mounted() {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 125;
    },
    methods: {
      search: function (keyword, page) {
        this.page = page;
        this.kw = keyword;
        // 解决异步问题
        if (this.cancel) {// 存在上一次请求则取消
          this.cancel();
        }
        console.log(`搜索${this.kw},页码${this.page}`);
        // 定义CancelToken，它是axios的一个属性，且是一个构造函数
        let CancelToken = axios.CancelToken;

        this.$api.admins.queryByKeyword({page: this.page, keyword: this.kw}, new CancelToken((c) => {
          this.cancel = c;
        }))
          .then(res => {
            console.log(res);
            console.log(res.data.admins);
            this.tableData = res.data.admins;
            this.adminsSize = res.data.total;
          })
          .catch(err => {
            console.log(err)
          })
      },
      changePage(e) {
        this.page = e
        if (this.kw) {
          this.search(this.kw, this.page)
        } else {
          console.log(`查询全部${this.kw},页码${this.page}`);
          this.$api.admins.queryAdminsInfo({
            "page": this.page,
            "pageSize": this.pageSize
          }).then((res) => {
            this.tableData = res.data.admins;
          }).catch((err) => {
            console.log(err);
          });
        }
      },
      updateAuth: function () {
        this.value3 = false;
        this.$api.admins.updateAdmin({
          userId: this.formData.userId,
          userName: this.formData.userName,
          department: this.formData.department,
          userTel: this.formData.userTel,
          userEmail: this.formData.userEmail
        })
          .then((res) => {
            this.tableData = res.data;
            console.log(this.tableData)
            this.$Message.warning('刷新后更新数据');
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped>
  .table-header {
    margin-bottom: 10px;
    display: flex;
    align-items: flex-end;
  }

  .search-div {
    flex-grow: 5;
    display: flex;
    justify-content: flex-end;
  }

  .table {
    margin: auto 0px;
    height: 100%;
  }

  .pager {
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
