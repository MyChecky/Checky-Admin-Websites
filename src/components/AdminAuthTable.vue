<template>
  <div>
    <Card>
      <div class="table-header">
        <span class="card-title">管理员列表</span>
        <span class="total">总数：{{this.adminsSize}}</span>
        <button
          style="margin-left: 20px ; padding: 5px 10px; backgroundColor: #2b85e4;color: #fff; border: none; borderRadius: 2px; cursor: pointer "
          @click="changeValue">
          添加管理员
        </button>
        <div class="search-div">
          <SearchBar :search="search"></SearchBar>
        </div>
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
            <FormItem label="权限" label-position="top">
              <label>
                <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                  <Checkbox
                    :indeterminate="indeterminate"
                    :value="checkAll"
                    @click.prevent.native="handleCheckAll">全选
                  </Checkbox>
                </div>
                <CheckboxGroup v-model="formData.menus" @on-change="checkAllGroupChange">
                  <Checkbox label="users"></Checkbox>
                  <Checkbox label="admin"></Checkbox>
                  <Checkbox label="essays"></Checkbox>
                  <Checkbox label="money"></Checkbox>
                  <Checkbox label="tasks"></Checkbox>
                  <Checkbox label="appeal"></Checkbox>
                  <Checkbox label="report"></Checkbox>
                  <Checkbox label="parameter"></Checkbox>
                </CheckboxGroup>
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
    <Drawer
      title="用户权限"
      placement="left"
      v-model="value2"
      width="360"
      :mask-closable="false"
      :styles="styles"
    >
      <Form :model="newformData">
        <Row :gutter="16">
          <Col span="20">
            <FormItem label="用户名" label-position="top">
              <Input v-model="newformData.userName"/>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="20">
            <FormItem label="密码" label-position="top">
              <Input v-model="newformData.pwd"/>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="20">
            <FormItem label="权限" label-position="top">
              <label>
                <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                  <Checkbox
                    :indeterminate="indeterminate"
                    :value="checkAll"
                    @click.prevent.native="handleCheckAll">全选
                  </Checkbox>
                </div>
                <CheckboxGroup v-model="newformData.menus" @on-change="checkAllGroupChange">
                  <Checkbox label="users"></Checkbox>
                  <Checkbox label="admin"></Checkbox>
                  <Checkbox label="essays"></Checkbox>
                  <Checkbox label="money"></Checkbox>
                  <Checkbox label="tasks"></Checkbox>
                  <Checkbox label="appeal"></Checkbox>
                  <Checkbox label="report"></Checkbox>
                  <Checkbox label="parameter"></Checkbox>
                </CheckboxGroup>
              </label>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="20">
            <FormItem label="电话" label-position="top">
              <Input v-model="newformData.userTel" placeholder="请输入管理员联系电话" value="userTel"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="20">
            <FormItem label="邮箱" label-position="top">
              <Input v-model="newformData.userEmail" placeholder="请输入管理员邮箱" value="userEmail"/>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="value2 = false">Cancel</Button>
        <Button type="primary" @click="newAuth"> Submit</Button>
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
          userTel: '',
          userEmail: '',
          menus: []
        },
        newformData: {
          userId: '',
          userName: '',
          pwd: '',
          userTel: '',
          userEmail: '',
          menus: []
        },
        value3: false,
        value2: false,
        indeterminate: true,
        checkAll: false,
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
          title: '权限',
          key: 'permissions',
          width: 210
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
                        this.formData.userTel = res.data.admin.userTel;
                        this.formData.menus = this.tableData[params.index].permissions;
                        console.log("menus", this.formData.menus);
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
        columns.push({
          title: '操作',
          key: 'action',
          align: 'center',
          width: 120,
          render: (h, params) => {
            return h(
              "button",
              {
                style: {
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
                class: ['fa', 'fa-trash-o'],
                attrs: {
                  userId: this.tableData[params.index].userId,
                },
                on: {
                  click: (e) => {// 点击事件， e 为事件参数
                    e.stopPropagation();
                    //console.log(this.tableData[params.index].userId);
                    this.$api.admins.deleteById({
                      userId: this.tableData[params.index].userId
                    })
                      .then(res => {
                        console.log("删除", res.data.state);
                        if (res.data.state === 'ok') this.tableData.splice(params.index, 1)
                      })
                      .catch(err => {
                        console.log(err)
                      })
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
        this.page = e;
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
        console.log("FormData: ", this.formData);
        this.$api.admins.updateAdmin({
          userId: this.formData.userId,
          userName: this.formData.userName,
          userTel: this.formData.userTel,
          userEmail: this.formData.userEmail,
          menus: this.formData.menus,
        })
          .then((res) => {
            //this.tableData = res.data;
            console.log("res.data: ", res.data);
            if (res.data.state === 'ok') {
              this.$Message.warning('刷新后更新数据');
            }
          })
          .catch((err) => {
            console.log(err);
            this.$Message.error('更改权限失败！');
          })
      },
      newAuth: function () {
        this.value2 = false;
        console.log("FormData: ", this.newformData);
        this.$api.admins.addAdmin({
          password: this.newformData.pwd,
          userName: this.newformData.userName,
          userTel: this.newformData.userTel,
          userEmail: this.newformData.userEmail,
          menus: this.newformData.menus,
        })
          .then((res) => {
            //this.tableData = res.data;
            console.log("res.data: ", this.tableData);
            if (res.data.state === 'ok') {
              this.$Message.warning('新建成功！刷新后更新数据');
            }
          })
          .catch((err) => {
            console.log(err);
            this.$Message.error('新建失败！');
          })
      },
      changeValue: function () {
        this.value2 = true;
      },
      handleCheckAll() {
        if (this.indeterminate) {
          this.checkAll = false;
        } else {
          this.checkAll = !this.checkAll;
        }
        this.indeterminate = false;

        if (this.checkAll) {
          this.formData.menus = ["appeal", "admin", "essays", "money", "report", "tasks", "users", "parameter"];
        } else {
          this.formData.menus = [];
        }
      },
      checkAllGroupChange(data) {
        if (data.length === 8) {
          this.indeterminate = false;
          this.checkAll = true;
        } else if (data.length > 0) {
          this.indeterminate = true;
          this.checkAll = false;
        } else {
          this.indeterminate = false;
          this.checkAll = false;
        }
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
