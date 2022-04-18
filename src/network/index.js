



import { request } from "./request"
import { get_baseApi } from "./baseApi"
import card from "./api/card"


const Api = {
  get_baseApi: get_baseApi,
  card: card(request)
}

export default Api