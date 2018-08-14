<template>
  <el-card class="card">
    <my-bread-crumb level1="商品管理" level2="商品分类"></my-bread-crumb>
    <!-- 文本输入框,因为要一行显示-->
    <el-row>
      <el-col :span="24">
        <el-input clearable placeholder="请输入内容" v-model="txt" class="textInput">
          <el-button
          @click="handleSearch"
          slot="append"
          icon="el-icon-search">
          </el-button>
        </el-input>
        <el-button type="success" plain @click="$router.push('/lists/add')">添加商品</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      class="el-table"
      :data="data"
      border
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="500">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格(元)"
        width="120">
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量"
        width="100">
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="120">
        <template slot-scope="scope">
          {{ scope.row.add_time | fmtdate('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <!-- {{ scope.row}} -->
          <el-button type="primary" size="mini" icon="el-icon-edit" plain></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            plain
            @click.prevent="handleDelete(scope.row.goods_id)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[6, 12, 24, 48]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      txt: '',
      pagenum: 1,
      pagesize: 6,
      total: 0
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const response = await this.$http.get(`goods?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.txt}`);
      // console.log(response.data);
      const { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.data = response.data.data.goods;
        this.total = response.data.data.total;
      } else {
        this.$message.error(msg);
      }
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.loadData();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.loadData();
    },
    // 点击搜索框进行匹配查询
    handleSearch() {
      this.loadData();
    },
    // 点击删除删除数据
    handleDelete(id) {
      this.$confirm('是否要删除该商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const response = await this.$http.delete(`goods/${id}`);
        const { meta: { status, msg } } = response.data;
        if (status === 200) {
          this.$message.success(msg);
          this.loadData();
        } else {
          this.$message.error(msg);
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
};
</script>

<style>
.el-table .cell {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
