<template>
  <Card class="login-card">
    <div class="logo-div">Checky</div>
    <Form ref="loginInfo" :model="loginInfo" label-position="top" :rules="ruleInline">
      <Form-item label="用户名">
        <Input type="text" v-model="loginInfo.username"/>
      </Form-item>
      <Form-item label="密码">
        <Input type="password" v-model="loginInfo.password"/>
      </Form-item>
      <Form-item>
        <Button style="margin-top: 30px; background-color: #e83015;color: #fff;" @click="login('loginInfo')" long>登陆系统
        </Button>
      </Form-item>
    </Form>
  </Card>
</template>

<script>
  import API from '../utils/api'

  export default {
    name: "LoginCard",
    data() {
      return {
        loginInfo: {
          username: '',
          password: ''
        },
        ruleInline: {
          username: [
            {required: true, message: '请填写用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请填写密码', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      login() {
        API.login.login(this.loginInfo)
          .then((res) => {
            console.log(res.data.state);
            if (res.data.state === 'ok') {
              this.$Message.success('登陆成功!');
              this.$Store.commit('$_setStorage', {
                user: this.loginInfo.username,
                sessionKey: res.data.sessionKey,
                userId: res.data.userId,
                users:res.data.menus.users,
                admin:res.data.menus.admin,
                essays:res.data.menus.essays,
                money:false,
                tasks:res.data.menus.tasks,
                parameter:res.data.menus.parameter,
                appeal:res.data.menus.appeal,
                report:false,
              });
              this.$Store.commit('$_setLogin', '1');
              setTimeout(() => {
                this.$router.push('/')
              }, 800)
            } else {
              this.$Message.error('登陆失败!');
            }
          })
          .catch((err) => {
            console.log(err)
          });

      }
    }
  }
</script>

<style scoped>
  .logo-div {
    width: 90%;
    margin: 20px auto;
    height: 80px;
    text-align: center;
    line-height: 80px;
    font-size: 40px;
    font-weight: 700;
    color: #e83015;
    letter-spacing: 2px;
    font-family: sans-serif;
  }

  .login-card {
    padding: 5px 20px;
    width: 100%;
    height: 100%;
    box-shadow: 1px 1px 10px 2px rgba(200, 200, 200, 0.3);
  }
</style>
