import Vue from 'vue';
import Router from 'vue-router';
// 导入组件
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import Users from '@/views/users/Users.vue';

// 注册Router
Vue.use(Router);

export default new Router({
  routes: [
    {name: 'Login', path: '/login', component: Login},
    {
      name: 'Home',
      path: '/',
      component: Home,
      // home的子路由
      children: [
        {name: 'Users', path: '/users', component: Users}

      ]
    }
  ]
});
