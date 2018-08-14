<template>
  <el-container class="container">
    <el-header class="header">
      <el-row class="row">
        <el-col :span="4">
          <img src="../assets/logo.png">
        </el-col>
        <el-col :span="19">
          <div class="text">电商后台管理系统</div>
        </el-col>
        <el-col :span="1">
          <div class="logout" @click.prevent="HandleLogout"><a href="#">退出</a></div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <el-menu
          router
          unique-opened
          style="height:100%"
          class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/users">
            <i class="el-icon-menu"></i>
            用户列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/roles">
            <i class="el-icon-menu"></i>
            角色列表</el-menu-item>
            <el-menu-item index="/rights">
            <i class="el-icon-menu"></i>
            权限列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/lists">
            <i class="el-icon-menu"></i>
            商品列表
            </el-menu-item>
            <el-menu-item index="/params">
            <i class="el-icon-menu"></i>
            分类参数
            </el-menu-item>
            <el-menu-item index="/categories">
            <i class="el-icon-menu"></i>
            商品分类
            </el-menu-item>

          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="/order">
            <i class="el-icon-menu"></i>
            订单列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="/datacarts">
              <i class="el-icon-menu"></i>
              数据报表
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <!-- 占位 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  beforeCreate() {
    var token = sessionStorage.getItem('token');
    if (!token) {
      this.$message.warning('请先登录');
      this.$router.push('/login');
    };
  },
  methods: {
    // 点击退出登录
    HandleLogout() {
      this.$message.success('退出成功');
      this.$router.push('/login');
    }
  }
};

</script>

<style>
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
  padding: 0;
}
.header .text {
  color: #fff;
  font-size: 28px;
  line-height: 60px;
  text-align: center;
}
.header .logout {
  line-height: 60px;
}
.header .logout a {
  text-decoration: none;
  color: orange;
}
.aside {
  background-color: #d3dce6;
}
.main {
  background-color: #e9eef3;
}
.main .textInput {
  width: 300px;
  padding: 10px 10px 10px 0;
}
</style>
