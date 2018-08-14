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
    <el-steps :active="1" finish-status="success" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- 侧边选项卡 -->
    <el-tabs tab-position="left" style="height: 200px; margin-top: 30px">
      <el-tab-pane label="基本信息">基本信息</el-tab-pane>
      <el-tab-pane label="商品参数">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容">商品内容</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

</script>

<style>
.info {
  margin: 10px 0;
}
.el-step__title {
  font-size: 12px;
}
</style>
