// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import moment from 'moment';
import myAxios from '@/plugins/MyAxios';
// 导入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/index.css';

// 注册插件
Vue.use(ElementUI);
Vue.use(myAxios);
Vue.config.productionTip = false;
// 格式化日期
Vue.filter('fmtdate', (value, fmtstring) => {
  return moment(value).format(fmtstring);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
