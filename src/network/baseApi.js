import { request } from './request'



export function get_baseApi (model_name) {
    return {
        $get_one: function (params) {
            return request({ url: `/${model_name}`, method: 'get', params: params })
        },
        $post: function (params) {
            return request({ url: `/${model_name}`, method: 'post', data: params })
        },
        $put: function (params) {
            return request({ url: `/${model_name}`, method: 'put', data: params })
        },
        $delete: function (params) {
            return request({ url: `/${model_name}`, method: 'delete', params: params })
        },
        $get_page: function (params) {
            return request({ url: `/${model_name}/page`, method: 'get', params: params })
        },
        $get_all: function (params) {
            return request({ url: `/${model_name}/all`, method: 'get', params: params })
        },
        $delete_many: function (params) {
            return request({ url: `/${model_name}/many`, method: 'put', data: params })
        },
    }

}

