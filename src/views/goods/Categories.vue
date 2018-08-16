<template>
  <el-card class="card">
    <my-bread-crumb level1="商品管理" level2="商品分类"></my-bread-crumb>
    <el-row class="row">
      <el-col :span='24' class="btn">
        <el-button
        type="success"
        plain
        @click="handleAdd">
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
          <el-button
            @click="handleEdit(scope.row)"
            type="primary"
            size="mini"
            icon="el-icon-edit"
            plain>
          </el-button>
          <el-button
          type="danger"
          size="mini"
          icon="el-icon-delete"
          plain
          @click="handleDelete(scope.row.cat_id)">
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
    <!-- 点击添加弹出对话框 -->
    <el-dialog
      title="添加商品分类"
      :visible.sync="AddDialogFormVisible">
      <el-form
      :model="form"
      label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="form.cat_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="分类层级">
          <el-cascader
            clearable
            placeholder="默认添加一级分类"
            change-on-select
            expand-trigger="hover"
            :options="options"
            :props="defaultProps"
            v-model="catIds">
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="AddDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSure">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 点击编辑弹出对话框 -->
    <el-dialog
      title="编辑商品分类"
      :visible.sync="EditDialogFormVisible">
      <el-form
        :model="form"
        label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="form.cat_name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="EditDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditSure">确 定</el-button>
      </div>
    </el-dialog>
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
      total: 0,
      form: {
        cat_pid: -1,
        cat_name: '',
        cat_level: 0
      },
      AddDialogFormVisible: false,
      EditDialogFormVisible: false,
      catIds: [],
      options: [],
      defaultProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      currentId: -1
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
    },
    // 点击添加按钮获取数据
    async handleAdd() {
      this.AddDialogFormVisible = true;
      const response = await this.$http.get('categories?type=2');
      // console.log(response);
      this.options = response.data.data;
    },
    // 点击确定按钮时发送请求
    async handleSure() {
      // cat_level 一级分类  0
      // cat_level 二级分类  1
      // cat_level 三级分类  2
      // cat_pid   一级分类的父id为 0
      // cat_pid   二级分类的父id为 catIds[0]
      // cat_pid   三级分类的父id为 catIds[1]
      // catIds.length === 0 一级分类
      // catIds.length === 1 二级分类
      // catIds.length === 2 三级分类
      this.form.cat_level = this.catIds.length;
      if (this.catIds.length === 0) {
        this.form.cat_pid = 0;
      } else if (this.catIds.length === 1) {
        this.form.cat_pid = this.catIds[0];
      } else if (this.catIds.length === 2) {
        this.form.cat_pid = this.catIds[1];
      };
      const response = await this.$http.post('categories', this.form);
      // console.log(response);
      const { meta: { status, msg } } = response.data;
      if (status === 201) {
        this.loadData();
        this.AddDialogFormVisible = false;
      } else {
        this.$message.error(msg);
      }
    },
    // 点击删除按钮,删除数据
    handleDelete(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const response = await this.$http.delete(`categories/${id}`);
        // console.log(response);
        const { meta: { status, msg } } = response.data;
        if (status === 200) {
          this.loadData();
          this.$message.success(msg);
        } else {
          this.$message.error(msg);
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 点击编辑按钮
    handleEdit(cat) {
      this.EditDialogFormVisible = true;
      this.form.cat_name = cat.cat_name;
      this.currentId = cat.cat_id;
    },
    // 点击编辑按钮里面的确定按钮
    async handleEditSure() {
      const response = await this.$http.put(`categories/${this.currentId}`, this.form);
      const { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.EditDialogFormVisible = false;
        this.$message.success(msg);
        this.loadData();
      } else {
        this.$message.success(msg);
      }
    }
  }
};
</script>

<style>
.btn {
  margin: 10px 0;
}
</style>
