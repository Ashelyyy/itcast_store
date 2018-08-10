import axios from 'axios';
const MyAxios = {};
MyAxios.install = function (Vue) {
  // 配置请求地址的基地址
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
  // 给vue实例添加$http属性
  Vue.prototype.$http = axios;
};
// 导出插件
export default MyAxios;
