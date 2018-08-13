import axios from 'axios';
const MyAxios = {};
MyAxios.install = function (Vue) {
  // 配置请求地址的基地址
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';

  // 设置请求拦截
  axios.interceptors.request.use(function (config) {
    // console.log(config.headers);
    // console.log(config.url);
    if (config.url !== 'login') {
      const token = sessionStorage.getItem('token');
      config.headers.Authorization = token;
    }
    return config;
  }, function(error) {
    return Promise.reject(error);
  });
  // 给vue实例添加$http属性
  Vue.prototype.$http = axios;
};
// 导出插件
export default MyAxios;
