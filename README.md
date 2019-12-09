# pc端api接口封装及地址统一管理
<br>
httpRequest.js // 接口封装，拦截
httpApi.js // 接口二次封装，统一管理接口地址

**由于该封装使用到qs、merge和axios工具，需要使用npm安装依赖**

### https://www.xxx.com 根据自己开发服务器请求根路径设置
```
/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
    return 'https://www.xxx.com' + actionName // 统一管理请求地址，根据自己服务器端地址更换
}

```
### 请求响应回调拦截 服务器端发送回客户端时对接口进行拦截操作，下端代码是对接口401无效的拦截，可根据自己需求更改，常用于登录过时、用户过期等验证功能

```
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
```

## vue中使用httpRequset.js

在src/main.js中挂载全局方法

`import httpRequest from '@/utils/httpRequest'`

`Vue.prototype.$http = httpRequest`

*页面使用方法如下*

```
this.$http({
  url: this.$http.adornUrl('xxxx'),
  method: 'get'(或post)
  （get请求
    params: this.$http.adornParams({ 
      'xxx': 'xxx'
    })
  ）
  （post请求：
    data: this.%http.adornData({
      'xxx': 'xxx'
    })
  ）
})
```

## vue中使用httpRequset.js和httpApi.js
两个文件处于同级文件夹中

在src/main.js中挂载全局方法

```
import httpApi from '@/utils/httpApi' 

Vue.prototype.$api = httpApi 

```
*页面请求方法如下*

```
this.$api.getCurUserInfo({
  method: 'get'(或post)
  （get请求
    params: this.$http.adornParams({ 
      'xxx': 'xxx'
    })
  ）
  （post请求：
    data: this.%http.adornData({
      'xxx': 'xxx'
    })
  ）
})
```
