import Vue from 'vue';
import Router from 'vue-router';
// 导入组件
import Login from '@/views/Login.vue';

// 注册Router
Vue.use(Router);

export default new Router({
  routes: [
    {name: 'Login', path: '/login', component: Login}
  ]
});
