export default (request) => {
  return {
    takeCard (params) {
      return request({ url: '/takeCard', method: 'post', data: params })
    }
  }
}


