import { request } from '../request'




export function put_customer_topUp(params) {
    return request({
        url: '/v0/customer/top_up',
        method: 'put',
        data: params
    })
}

export function put_customer_cost(params) {
    return request({
        url: '/v0/customer/cost',
        method: 'put',
        data: params
    })
}



