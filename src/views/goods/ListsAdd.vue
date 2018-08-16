<template>
  <div>
    <my-bread-crumb level1="商品管理" level2="商品列表"></my-bread-crumb>
    <!-- 消息提示框 -->
     <el-alert
      class="info"
      title="添加商品信息"
      type="info"
      :closable="false"
      center
      show-icon>
    </el-alert>
    <!-- 步骤条 -->
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- 侧边选项卡 -->
    <el-form
      :model="form"
      label-position="top"
      label-width="80px">
      <el-tabs
        tab-position="left"
        @tab-click="handleClick"
        style="margin-top: 30px">
        <el-tab-pane label="基本信息">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
              {{ selectedOptions }}
            <el-cascader
              style="width: 250px"
              clearable
              placeholder="请选择商品分类"
              expand-trigger="hover"
              :options="options"
              :props="{value: 'cat_id', label: 'cat_name', children: 'children'}"
              v-model="selectedOptions"
              @change="handleChange">
            </el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数">
          <el-form-item
            v-for="item in dongParams"
            :key="item.attr_id"
            :label="item.attr_name">
            <el-checkbox-group v-model="item.params">
              <el-checkbox
                v-for="param in item.params"
                :key="param"
                :label="param"
                border>
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品属性">
          <el-form-item
            v-for="item in staticParams"
            :key="item.attr_id"
            :label="item.attr_name">
            <el-input
              v-model="item.attr_vals">
            </el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品图片">
        <!-- 图片上传 -->
          <el-upload
            action="http://localhost:8888/api/private/v1/upload"
            :headers="headers"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容">
          <el-button type="primary" class="addBtn" @click="handleAdd">添加商品</el-button>
          <quill-editor v-model="form.goods_introduce">
          </quill-editor>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
export default {
  components: {
    quillEditor
  },
  created() {
    this.loadData();
  },
  data() {
    return {
      active: 0,
      form: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        // 上传的图片临时路径
        pics: [],
        // 商品的参数(数组)
        attrs: []
      },
      // 级联选择器绑定数据
      // 绑定的数据
      options: [],
      // 分类的id
      selectedOptions: [],
      // 上传图片时绑定token
      headers: {
        'Authorization': sessionStorage.getItem('token')
      },
      // 动态数据
      dongParams: [],
      // 静态数据
      staticParams: []

    };
  },
  methods: {
    // 选项卡切换时触发
    handleClick(tab, event) {
      // console.log(tab, event);
      // tab.index是字符串
      // this.active需要的是数值类型
      // this.active = parseInt(tab.index);
      // 与步骤条建立关系
      this.active = tab.index - 0;
      // 点击商品参数或者商品属性
      // 判断是否是三级分类
      if (tab.index === '1' || tab.index === '2') {
        if (this.selectedOptions.length !== 3) {
          this.$message.warning('请选择商品分类');
        } else {
          // 获取商品参数
          this.loadParams(tab.index);
        }
      }
    },
    // 获取商品数据列表
    async loadData() {
      const response = await this.$http.get(`categories?type=3`);
      this.options = response.data.data;
    },
    // 获取商品参数
    async loadParams(index) {
      const sel = index === '1' ? 'many' : 'only';
      const response = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=${sel}`);
      // console.log(response);
      if (sel === 'many') {
        this.dongParams = response.data.data;
        // 按钮数据的样子
        // attr_vals:"曜石黑,浅艾蓝,银钻灰,4G+64G,6G+64G,张艺兴定制版"
        this.dongParams.map((item) => {
          // 给对象添加新属性
          // 动态添加的属性,不能实现双向绑定
          const arr = item.attr_vals.length === 0 ? [] : item.attr_vals.split(',');
          // 使用$set使动态添加的数据实现双向绑定
          this.$set(item, 'params', arr);
        });
      } else if (sel === 'only') {
        this.staticParams = response.data.data;
        // console.log(this.staticParams);
      }
    },
    // 级联选择器发生改变时触发
    handleChange() {
    },
    // 删除图片时
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      // file.response.tmp_path;
      const index = this.form.pics.findIndex((item) => {
        if (item.pic === file.response.tmp_path) {
          return true;
        }
      });
      this.form.pics.splice(index, 1);
    },
    // 图片上传成功
    handleSuccess(response, file, fileList) {
      // console.log(response);
      const { status, msg } = response.meta;
      if (status === 200) {
        // 把图片信息存到数组中
        this.form.pics.push({
          pic: response.tmp_path
        });
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },
    // 添加商品
    async handleAdd() {
      // goods_cat  以为','分割的分类列表
      // attrs  商品的参数（数组）
      this.form.goods_cat = this.selectedOptions.join(',');
      const arr1 = this.dongParams.map((item) => {
        return {'attr_id': item.attr_id, 'attr_value': item.attr_vals};
      });
      const arr2 = this.staticParams.map((item) => {
        return {'attr_id': item.attr_id, 'attr_value': item.attr_vals};
      });
      this.form.attrs = [...arr1, ...arr2];
      const response = await this.$http.post('goods', this.form);
      const { meta: { status, msg } } = response.data;
      if (status === 201) {
        this.$message.success(msg);
        this.$router.push('/lists');
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style>
.info {
  margin: 10px 0;
}
.el-step__title {
  font-size: 12px;
}
.addBtn {
  margin-bottom: 10px;
}
.ql-container {
  height: 260px;
}
</style>
