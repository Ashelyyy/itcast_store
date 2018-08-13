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
        <el-input v-model="searchTxt" clearable placeholder="请输入内容" class="textInput">
          <el-button
          slot="append"
          icon="el-icon-search"
          @click="handleSearch">
          </el-button>
        </el-input>
        <el-button type="success" plain @click="AddUserDialogFormVisible=true">添加</el-button>
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
      <!-- :pager-count="11" -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[2, 1, 1, 1]"
      :page-size="pagesize"
      :current-page="pagenum"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count">
    </el-pagination>

    <!-- 弹出对话框 -->
    <el-dialog
    :visible="AddUserDialogFormVisible"
    title="添加用户">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px">
          <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px">
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="80px">
          <el-input v-model="form.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
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
      pagesize: 2,
      // 总条数
      count: 0,
      // 搜索框数据
      searchTxt: '',
      // 弹出框的默认是隐藏
      AddUserDialogFormVisible: false,
      // 弹出框表单数据绑定
      form: {
        username: '',
        password: '',
        eamil: '',
        moblie: ''
      }
    };
  },
  methods: {
    // 渲染页面
    loadData() {
      // 请求时要带token
      var token = sessionStorage.getItem('token');
      this.$http.defaults.headers.common['Authorization'] = token;
      this.$http
        .get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchTxt}`)
        .then((response) => {
          // console.log(response.data);
          // 获取总条数
          this.count = response.data.data.total;
          this.data = response.data.data.users;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 每页显示多少条发生变化执行
    handleSizeChange(val) {
      this.pagesize = val;
      this.loadData();
    },
    // 页数发生变化执行
    handleCurrentChange(val) {
      // 发送请求
      this.pagenum = val;
      // 获取数据,显示在页面
      this.loadData();
    },
    // 点击搜索按钮实现匹配查询
    handleSearch() {
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
