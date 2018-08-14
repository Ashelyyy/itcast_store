<template>
  <el-card class="card">
    <my-bread-crumb level1="商品管理" level2="商品分类"></my-bread-crumb>
    <el-row class="row">
      <el-col :span='24' class="btn">
        <el-button type="success" plain>
          添加角色
        </el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      :data="data"
      border
      stripe
      style="width: 100%">
      <el-table-tree-column
        prop="cat_name"
        label="分类名称"
        width="180"
        treeKey="cat_id"
        levelKey="cat_level"
        childKey="children"
        parentKey="cat_pid">
      </el-table-tree-column>
      <!-- <el-table-column
        prop="cat_name"
        label="分类名称"
        width="180">
      </el-table-column> -->
      <el-table-column
        prop="cat_level"
        label="级别"
        width="180">
        <template slot-scope='scope'>
          <span v-if="scope.row.cat_level === 0">一级</span>
          <span v-if="scope.row.cat_level === 1">二级</span>
          <span v-if="scope.row.cat_level === 2">三级</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cat_deleted"
        label="是否有效"
        width="180">
        <template slot-scope='scope'>
          {{ scope.row.cat_deleted ? '无效' : '有效' }}
        </template>
      </el-table-column>
        <!-- 增删改查小按钮 -->
      <el-table-column
        label="操作">
        <template slot-scope='scope'>
          <el-button type="primary" size="mini" icon="el-icon-edit" plain></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[4, 6, 8, 10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
import ElementTreegrid from 'element-tree-grid';
export default {
  components: {
    'el-table-tree-column': ElementTreegrid
  },
  data() {
    return {
      data: [],
      pagenum: 1,
      pagesize: 4,
      total: 0
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const response = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      // console.log(response.data);
      const { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.total = response.data.data.total;
        this.data = response.data.data.result;
      } else {
        this.$message.error(msg);
      }
    },
    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
      this.loadData();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.loadData();
    }
  }
};
</script>

<style>
.btn {
  margin: 10px 0;
}
</style>
