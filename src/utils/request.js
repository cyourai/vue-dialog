import axios from 'axios'
import { getToken } from '@/utils'

import {
  Message
} from 'element-ui'

// create an axios instance
// const service = axios

// 开发模式未移动到项目时设置拦截，否则注释此方法
// /** ↓------------------------------------------------↓
const service = axios.create({
  baseURL: process.env.BASE_API + process.env.PREFIX,
  timeout: 10000 // request timeout
})
// ↑------------------------------------------------↑*/
service.interceptors.request.use(
  config => {
    // 开发模式时设置测试token
    config.headers['token-header'] = getToken()
    // config.headers['token-header'] = 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImp3dF91c2VyaWQiOiI3ZWU2ZWIzNy1iZDc5LTExZTgtYWFhNy0wMDE2M2UwMDRmNzkiLCJqd3RfbmFtZSI6IiIsImV4cCI6MTUzOTQzMzY0NH0.eGSKNv_uaQaJ6OtZvBWncrvB3vloSgGttGzGAiTAAIDWHzRs91NG0_ZsORbxCrCK_Lka_BCX_VgNn-Tp9BP_-_tQRfgc3vsHzkr4ijdUMSgSnSJ1RzgexPZKzJk3EOlOe1DCL60xVC-wbIRTpl1mwU9-ogFm-Yx1_TRmGYT0UnU'
    return config
  }
)

/**
 * 回文拦截：
 * response.status = 200 请求到达 根据response.data.status 判断 success/waring
 * 其他为error
 */

service.interceptors.response.use(
  response => {
    // console.log(response)
    if (response.status === 200 || response.data.status === 200) {
      if (response.data.status) {
        // token 错误跳转到登陆页 todo 910前端错频
        if (response.data.status.toString().indexOf('900') === 0) {
          Message({
            message: response.data.message,
            type: 'error'
          })
          window.location.href = '/#/logout'
        } else {
          if (response.data.message != null && response.data.message !== '') {
            const status =
              response.data.status.toString().indexOf('200') !== 0
                ? 'warning'
                : 'success'
            Message({
              message: response.data.message,
              type: status,
              duration: 5 * 1000
            })
          }
        }
      }
    } else {
      if (response.data.message != null && response.data.message !== '') {
        Message({
          message: response.data.message,
          type: 'warning',
          duration: 5 * 1000
        })
      }
    }
    return Promise.resolve(response)
  },
  error => {
    console.error('err' + error)
    const response = error.response
    let message = error.message
    if (response.data && response.data.message) {
      message = response.data.message
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export {
  service as request
}
