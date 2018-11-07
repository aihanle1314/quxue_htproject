import axios from 'axios'
import { Message } from 'element-ui'
// import store from '../store'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API_APP, // api的base_url 发布/正式地址
  // baseURL: process.env.BASE_API_APP_TEST, // api的base_url 测试地址
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // if (getToken()) {
  //   config.headers['Access-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return config
}, error => {
// Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
    * code为非20000是抛错 可结合自己业务进行修改
    */
    const res = response.data
    if (res.code !== 200) {
      Message.error(res.error)
      return null
      // return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service