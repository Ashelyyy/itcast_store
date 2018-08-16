<template>
  <el-card class="card">
    <my-bread-crumb level1="订单管理" level2="订单列表"></my-bread-crumb>
    <!-- 表格 -->
    <el-table
      :data="data"
      border
      stripe
      style="width: 100%; margin-top: 10px">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="order_number"
        label="订单编号"
        width="260">
      </el-table-column>
      <el-table-column
        align="center"
        prop="order_price"
        label="订单价格"
        width="100">
      </el-table-column>
      <el-table-column
        prop="order_pay"
        label="是否付款"
        align="center"
        width="100">
        <template slot-scope='scope'>
          <el-button type="danger" plain size="small">{{ scope.row.order_pay ? '未付款' : '已付款' }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="is_send"
        label="是否发货"
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        prop="create_time"
        label="下单时间"
        width="200">
        <template slot-scope='scope'>
          {{ scope.row.create_time | fmtdate('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope='scope'>
          <el-button
            @click="OrderDialogFormVisible = true"
            type="primary"
            size="mini"
            icon="el-icon-edit"
            plain>
          </el-button>
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
    <!-- 点击编辑按钮弹出对话框 -->
    <el-dialog
      title="修改订单地址"
      :visible.sync="OrderDialogFormVisible">
      <el-form
        label-width="80px">
        <el-form-item label="省市区/县">
          <el-cascader
            clearable
            placeholder="请选择"
            change-on-select
            expand-trigger="hover"
            :options="options">
          </el-cascader>
        </el-form-item>
        <el-form-item
          label="详细地址">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="OrderDialogFormVisible = false">取 消</el-button>
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
      pagenum: 1,
      pagesize: 4,
      total: 0,
      OrderDialogFormVisible: false,
      options: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const response = await this.$http.get(`orders?&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      // console.log(response.data);
      this.total = response.data.data.total;
      const { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.data = response.data.data.goods;
      } else {
        this.$message.err(msg);
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

</style>
