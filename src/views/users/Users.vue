<template>
  <!-- 卡片效果 -->
  <el-card class="card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 文本输入框,因为要一行显示-->
    <el-row>
      <el-col :span="24">
        <el-input placeholder="请输入内容" class="input-with-select textInput">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain>添加</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      :data="data"
      border
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        label="#">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="时间"
        width="180">
        <template slot-scope='scope'>
          {{ scope.row.create_time | fmtdate('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column
        prop="ms_state"
        label="用户状态"
        width="80">
        <!-- 按钮转换 -->
        <template slot-scope='scope'>
          <!-- {{ scope.row.mg_state }} -->
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
        <!-- 增删改查小按钮 -->
      <el-table-column
        label="操作">
        <template slot-scope='scope'>
          <el-button type="primary" size="mini" icon="el-icon-edit" plain></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" plain></el-button>
          <el-button type="success" size="mini" icon="el-icon-check" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
      <!-- :current-page="currentPage4" -->
      <!-- @current-change页数发生变化执行 -->
      <!-- @size-change每页显示多少条发生变化执行 -->
      <!-- :page-sizes每页显示个数选择器的选项设置 -->
      <!-- page-size每页显示条目个数 -->
      <!-- total总条数 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      :pager-count="9"
      :current-page="pagenum"
      layout="total, sizes, prev, pager, next, jumper"
      :total="11">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      // 页码
      pagenum: 1,
      // 每页显示几条
      pagesize: 3,
      // 总条数
      count: 0
    };
  },
  methods: {
    // 渲染页面
    loadData() {
      // 请求时要带token
      var token = sessionStorage.getItem('token');
      this.$http.defaults.headers.common['Authorization'] = token;
      this.$http
        .get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
        .then((response) => {
          this.data = response.data.data.users;
          // console.log(response.data.data.users);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 每页显示多少条发生变化执行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 页数发生变化执行
    handleCurrentChange(val) {
      // 发送请求
      this.pagenum = val;
      // 获取数据,显示在页面
      this.loadData();
    }
  },
  created() {
    // 页面一上来显示数据
    this.loadData();
  }
};

</script>

<style>

</style>
