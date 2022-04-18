import { request } from '../request'




export function get_user_bindWechatQrcode (params) {
    return request({ url: '/v0/user/bind_wx', method: 'get', params: params })
}




