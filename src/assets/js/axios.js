import axios from 'axios'
import { getToken } from './util'
import Toast from '@/components/toast'
import Dialog from '@/components/dialog'

/**
 * 创建axios实例
 * 对axios请求头 X-Access-Token
 * 超时 timeout
 * 返回response状态进行拦截处理
 */
const qbAxios = axios.create({
  // baseURL: process.env.BASE_API, // 存在多个不同baseURL情况，此处不使用
  timeout: 60000,
})

qbAxios.interceptors.request.use(
  (config) => {
    // config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    config.headers.post['Content-Type'] = 'application/json'
    // 让每个请求携带token-- ['X-Access-Token']为自定义key 请根据实际情况自行修改
    config.headers['X-Access-Token'] = getToken()
    if (config.method.toLocaleLowerCase() === 'post'
      && (typeof config.data.loading === 'undefined'
        || config.data.loading)) Toast.loading('处理中...')
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

qbAxios.interceptors.response.use((response) => {
  // token无效重新登录
  if (response.data.status === '40100122' || response.data.status === '40399114') {
    // if (window.location.hash.indexOf('#/login') === -1) {
    //   sessionStorage.setItem('redirectUrl', `"${window.location.href}"`)
    //   sessionStorage.setItem('backUrl', `"${window.location.href}"`)
    // }
    // window.location.href = globalInfo.htmlRoot + '/index.html#/agency';
  }
  Toast.hide()
  return response
}, (err) => {
  Toast.hide()
  // 这里是返回状态码不为200时候的错误处理
  if (err && err.request) {
    switch (err.request.status) {
      case 0:
      case 504:
        err.message = '连接超时，请稍后再试'
        break
      default:
    }
    Dialog.alert({
      title: '请求错误',
      content: err.message,
      cancelText: '取消',
      confirmText: '确认',
    })
  }
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break
      // case 401:
      //   err.message = err.message
      //   break
      case 403:
        err.message = '拒绝访问'
        break
      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break
      case 408:
        err.message = '请求超时'
        break
      // case 500:
      //   err.message = err.message
      //   break
      case 501:
        err.message = '服务未实现'
        break
      case 502:
        err.message = '网关错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网关超时'
        break
      case 505:
        err.message = 'HTTP版本不受支持'
        break
      default:
    }
  }
  return Promise.reject(err)
})
export default qbAxios
