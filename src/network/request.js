import axios from 'axios'
import { ElMessage } from 'element-plus'


export function request (config) {
    const instance = axios.create({
        baseURL: '/api',
        //baseURL: 'http://119.28.24.100:3666',
        TIMEOUT: 5000,
        headers: {
            'access-token': window.sessionStorage.getItem('token'),
        }
    })
    // 响应拦截器
    instance.interceptors.response.use(res => {
        show_msg(res)
        return res.data
    })
    return instance(config)
}



// 统一展示信息
function show_msg (res) {
    let { method } = res.config
    let { msg, code } = res.data
    if (method != 'get') {
        if (code != 0) ElMessage({ message: msg, type: 'error' })
        if (code == 0) ElMessage({ message: msg, type: 'success' })
    }
}