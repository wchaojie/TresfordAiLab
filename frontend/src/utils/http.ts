import ApiConfig from "@/configs/api"
import Axios, { RequestConfig } from "./axios"
import { ErrorCode } from "./constant"
import Helper from "./helper"

// ----------------------------------------------------------------------

// const TOKEN_KEY = process.env.REACT_APP_API_TOKEN_KEY || "token"

export interface HttpRequestConfig<T> extends Omit<RequestConfig, "storage"> {
  data?: T
}

export interface HttpResponse<T> {
  code: number
  status: string
  message?: string
  data?: T
}

// 实例化 Axios
const http = new Axios({
  baseURL: ApiConfig.baseURL,
  timeout: ApiConfig.timeout,
  storage: {
    tokenKey: ApiConfig.tokenKey,
    getToken: (key) => localStorage.getItem(key),
    setToken: (key, val) => {
      console.log("Refresh Token --->", val)
      localStorage.setItem(key, val)
    },
  },
  interceptors: {
    // 实例请求拦截器
    requestInterceptors: config => {
      config.headers && (config.headers["X-Requested-With"] = "XMLHttpRequest") // Ajax
      if (config?.url?.includes("/export")) {
        config.headers && (config.headers["responseType"] = "blob") // 返回二进制流时，需要设置请求响应类型为 blob
      }
      if (config?.url?.includes("/upload")) {
        config.headers && (config.headers["Content-Type"] = "multipart/form-data") // 发送二进制流时，需要设置请求头的 Content-Type
      }
      return config
    },
    // 实例响应拦截器
    responseInterceptors: result => {
      return result
    },
    // 实例响应拦截器异常处理
    responseInterceptorsCatch: error => {
      // 将错误统一抛出
      return Promise.reject(handleError(error))
    }
  }
})

// 错误处理
const handleError = ({response}: {response: any}) => {
  return response?.data
    ? `[${response.data.code}] ${response.data.message}`
    // @ts-ignore
    : ErrorCode[response.status]
}

// export const Stream = <REQ = any>(url: string, data: REQ) => {
//   return http.request<any>({method: "POST", responseType: "stream", url, data})
// }
//
// export const All = args => {
//   return axios.all(args)
// }
//
// export const Spread = callback => {
//   return axios.spread(callback)
// }

export const Get = <RES = any, REQ = any>(url: string, params?: REQ) => {
  return http.request<HttpResponse<RES>>({method: "GET", url, params})
}
export const Post = <RES = any, REQ = any>(url: string, data: REQ) => {
  return http.request<HttpResponse<RES>>({method: "POST", url, data})
}
export const Put = <RES = any, REQ = any>(url: string, data: REQ) => {
  return http.request<HttpResponse<RES>>({method: "PUT", url, data})
}
export const Patch = <RES = any, REQ = any>(url: string, data: REQ) => {
  return http.request<HttpResponse<RES>>({method: "PATCH", url, data})
}
export const Delete = <RES = any, REQ = any>(url: string, params?: REQ) => {
  return http.request<HttpResponse<RES>>({method: "DELETE", url, params})
}
export const Http = <RES = any, REQ = any>(url: string, config: HttpRequestConfig<REQ> = {}) => {
  const {method = "GET"} = config
  if (method === "GET" || method === "get") {
    config.params = config.data
  }
  return http.request<HttpResponse<RES>>({...config, url})
}

export default Http

