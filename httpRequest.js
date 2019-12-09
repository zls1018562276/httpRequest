import axios from 'axios'
import qs from 'qs'
import merge from 'lodash/merge'

var http = axios.create({
    timeout: 1000 * 30,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;'
    }
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
    // 请求头带上token
    config.headers['token'] = document.cookie.substring(document.cookie.indexOf('token'),document.cookie.indexOf(';',document.cookie.indexOf('token')) > 0 ? document.cookie.indexOf(';',document.cookie.indexOf('token')) : document.cookie.length).split('=')[1]
    return config
}, error => {
    return Promise.reject(error)
})


/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
    return 'https://www.xxx.com' + actionName // 统一管理请求地址，根据自己服务器端地址更换
}
/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
    var defaults = {
        't': new Date().getTime()
    }
    return openDefultParams ? merge(defaults, params) : params
}

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
    console.log('请求拦截里面的response')
    console.log(response)
    if ( !response.data ||  response.data.code === 500106) { // 401, token失效
        // 请求拦截后触发
    }
    return response
}, error => {
    if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
      console.log("超时", error)
    }
    return Promise.reject(error)
})

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'form') => {
    var defaults = {
        't': new Date().getTime(),
        'token': document.cookie.substring(document.cookie.indexOf('token'),document.cookie.indexOf(';',document.cookie.indexOf('token')) > 0 ? document.cookie.indexOf(';',document.cookie.indexOf('token')) : document.cookie.length).split('=')[1]
    }
    data = openDefultdata ? merge(defaults, data) : data
    return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

export default http