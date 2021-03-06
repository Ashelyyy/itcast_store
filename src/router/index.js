import Vue from 'vue';
import Router from 'vue-router';
// 自定义面包屑组件
import MyBreadCrumb from '@/components/MyBreadCrumb.vue';
// 导入组件
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import Users from '@/views/users/Users.vue';
import Rights from '@/views/rights/Right.vue';
import Roles from '@/views/rights/Roles.vue';
import Categories from '@/views/goods/Categories.vue';
import Lists from '@/views/goods/Lists.vue';
import ListsAdd from '@/views/goods/ListsAdd.vue';
import Order from '@/views/order/Order.vue';

// 注册Router
Vue.use(Router);
// 注册面包屑插件
Vue.component(MyBreadCrumb.name, MyBreadCrumb);

export default new Router({
  routes: [
    {name: 'Login', path: '/login', component: Login},
    {
      name: 'Home',
      path: '/',
      component: Home,
      // home的子路由
      children: [
        {name: 'Users', path: '/users', component: Users},
        {name: 'Rights', path: '/rights', component: Rights},
        {name: 'Roles', path: '/roles', component: Roles},
        {name: 'Categories', path: '/categories', component: Categories},
        {name: 'Lists', path: '/lists', component: Lists},
        {name: 'ListsAdd', path: '/lists/add', component: ListsAdd},
        {name: 'Order', path: '/order', component: Order}

      ]
    }
  ]
});
