<template>
  <div>
    <Button @click="value3 = true" type="primary">修改权限</Button>
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
              <Input v-model="formData.userName" placeholder="userName" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="20">
            <FormItem label="部门" label-position="top">
              <label>
                <Select v-model="formData.dept" placeholder="请选择管理员所在部门">
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
              <Input v-model="formData.phoneNumber" placeholder="请输入管理员联系电话"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="16">
          <Col span="20">
            <FormItem label="邮箱" label-position="top">
              <Input v-model="formData.mail" placeholder="请输入管理员邮箱" />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px" @click="value3 = false">Cancel</Button>
        <Button type="primary" @click="value3 = false" onclick="updateAuth">Submit</Button>
      </div>
    </Drawer>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        value3: false,
        styles: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: '53px',
          position: 'static'
        },
        formData: {
          userId:'',
          userName: '',
          department:'',
          userTel:'',
          userEmail:'',
        },
      }
    },
    beforeMount() {
      let id = $route.params.userId;
      console.log(`查询用户:${id}`);
      this.$api.users.queryUser({
        userId:id,
      })
        .then((res) => {
          console.log(res);
          //this.userName = res.data.user.userName;
        }).catch((err) => {
        console.log(err)
      })
    },
    methods:{
        updateAuth:function(){
        this.$api.users.changeUserAuth({
          userName:this.formData.userName,
          dept:this.formData.dept,
          tel:this.formData.phoneNumber,
          mail:this.formData.mail
        })
          .then((res) => {
            console.log(res);
            this.formData.userName=res.data().userName;
            this.formData.dept=res.data().dept;
            this.formData.phoneNumber=res.data().tel;
            this.formData.mail=res.data().mail;
          }).catch((err) => {
          console.log(err)
        })
      }
  },
  }
</script>
<style>
  .demo-drawer-footer{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
  }
</style>
