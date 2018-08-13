<template>
  <el-card class="card">
    <my-bread-crumb level1="权限管理" level2="权限列表"></my-bread-crumb>
    <el-row class="row">
      <el-col :span='24'>
        <el-button>
          添加角色
        </el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      border
      stripe
      v-loading="loading"
      :data="data"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="220">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="220">
      </el-table-column>
      <el-table-column
      label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" plain></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" plain></el-button>
          <el-button type="success" size="mini" icon="el-icon-check" plain></el-button>
        </template>
    </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      // 设置加载中的样式
      loading: true
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const response = await this.$http.get('roles');
      // console.log(response.data);
      this.data = response.data.data;
      const { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.loadData();
      } else {
        this.$message.error(msg);
      };
      this.loading = false;
    }
  }
};
</script>

<style>
.row {
  margin: 10px 0;
}
</style>
