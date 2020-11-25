import axios from 'axios'
import router from '../router'
import { Toast } from 'vant';



axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.baseURL = "/api"
// import _this from '../main.js'
import _this from '../components/User/personal.vue'

// 企业用户注册
export const userRegister = params => {
  return axios.post("/api/v1/staff/register", params).then(res => res.data)
}
// 企业用户登录
export const userLogin = (userName, password) => {
  return axios.post("/api/v1/staff/login?userName=" + userName + "&password=" + password).then(res => res.data)
}
//获取工程师的全部订单
export const getList = params => {
  return axios.get("/api/v1/service/order/engineer").then(res => res.data)
}
//获取工程师的信息
export const getEngineer = params => {
  return axios.get("/api/v1/engineer").then(res => res.data)
}
//开始维修任务
export const start = params => {
  return axios.get("/api/v1/engineer/start/" + params).then(res => res.data)
}
//到达目的地
export const arrive = params => {
  return axios.get("/api/v1/engineer/reach/" + params).then(res => res.data)
}
//结束维修
export const over = params => {
  return axios.get("/api/v1/engineer/over/" + params).then(res => res.data)
}
//更新旧token
export const updateToken = params =>{
  return axios.get("/api/v1/staff/token").then(res => res.data)
}
//更新工程师位置
export const upPosition = params =>{
  return axios.put("/api/v1/engineer/location").then(res => res.data)
}

// http request 请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  let pathname = location.pathname;
  if (localStorage.getItem('token')) {
    if (pathname != '/personal/login/register' && pathname != '/personal/login') {
      config.headers.Token = localStorage.getItem('token');
      //config.headers.Token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNTEiLCJzdWIiOiI0IiwiZXhwIjoxNjAyNTE3ODEyLCJpYXQiOjE2MDI1MTA2MTJ9.jCJQ3GYN6MWCTeL87VQN-kF2SOVben3TGZPrNV7552A"
    }
  }
  return config;
}, error => {
  // 对请求错误做些什么
  localStorage.removeItem("token");
  console.log('请求错误')
  console.log(Promise.reject(error))
  this.$toast({
    message:"请求错误"
  });
  this.$router.push('/notFound')
  
  return Promise.reject(error);
});
// http response 响应拦截器
axios.interceptors.response.use(response => {
  return response;
}, error => {
  console.log(error.response.data)
  if (error.response.data) {
    switch (error.response.data.status) {
      // 返回401，清除token信息并跳转到登录页面
      // 状态码401 用户没有授权信息
      // 关掉定时器
      case 401:
        localStorage.removeItem('token');
        clearInterval(Number(localStorage.getItem("uptoken")));
        clearInterval(Number(localStorage.getItem("uplocation")));
        //进入登录界面重新登录
        router.replace({
          path: '/personal/login'
          //登录成功后跳入浏览的当前页面
        })
        break;
        //返回400，工程师很忙
      case 400:
        Toast('还有订单未完成')
        break;
       default:
        localStorage.removeItem('token');
        console.log(error.response.data.message)
        break;
    }
    // 返回接口返回的错误信息
    return Promise.reject(error.response.data);
  }
});