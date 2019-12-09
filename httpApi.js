import api from './httpRequest'

// 地址统一管理封装
const http = (param, url) => {
    param.url = api.adornUrl(url)
    return api(param)
}
// 获取当前系统的用户信息
const getCurUserInfo = (param) => { return http(param, '/user/getCurUserInfo')}
// 获取当前用户加入的系统列表
const listCompany = (param) => { return http(param, '/erpCompany/listCompany')}

export default {
    getCurUserInfo,
    listCompany
}