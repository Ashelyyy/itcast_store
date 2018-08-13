<template>
  <el-card class="card">
    <my-bread-crumb level1="权限管理" level2="权限列表"></my-bread-crumb>
    <el-button class="btn">
      添加按钮
    </el-button>
    <!-- 表格 -->
    <el-table
      border
      stripe
      :data="data"
      style="width: 100%">
      <el-table-column
        type="index"
        width="80">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="220">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="220">
      </el-table-column>
      <el-table-column
        prop="level"
        label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-if="scope.row.level==='1'">二级</span>
          <span v-if="scope.row.level==='2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      data: []
    };
  },
  created() {
    // 渲染页面
    this.loadData();
  },
  methods: {
    async loadData() {
      // 携带token
      var token = sessionStorage.getItem('token');
      this.$http.defaults.headers.common['Authorization'] = token;
      // 发送请求
      const response = await this.$http.get('rights/list');
      // console.log(response);
      const { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.data = response.data.data;
      } else {
        this.$message.err(msg);
      }
    }
  }
};
</script>

<style>
.btn {
  margin: 10px 0;
}
.card {
  height: 100%;
  overflow: auto;
}
</style>
