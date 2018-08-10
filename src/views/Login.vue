<template>
  <div class="login-wrap">
    <el-form
      class="login-form"
      label-position="top"
      label-width="80px"
      :model="formData">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" @keyup.enter.native="HandleLogin" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="primary" @click="HandleLogin" >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    // 处理登录
    HandleLogin() {
      this.$http
        .post('login', this.formData)
        .then((response) => {
          var status = response.data.meta.status;
          var msg = response.data.meta.msg;
          if (status === 200) {
            this.$message.success(msg);
            // // 携带token
            var token = response.data.data.token;
            sessionStorage.setItem('token', token);
            // 跳转到后台首页
            this.$router.push('/');
          } else {
            this.$message.error(msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
  .login-wrap {
    background-color: #324152;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-wrap .login-form {
    background-color: #fff;
    width: 400px;
    border-radius: 5px;
    padding: 30px;
  }
  .login-wrap .login-form .btn {
    width: 100%;
  }
</style>
