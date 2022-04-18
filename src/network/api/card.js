export default (request) => {
  return {
    post_bulkCreate (params) {
      return request({ url: '/card', method: 'post', data: params })
    }
  }
}


