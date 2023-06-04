import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

// ----------------------------------------------------------------------

// 请求拦截器
export interface RequestInterceptors {
  // 请求拦截
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  // 响应拦截
  responseInterceptors?: <T = AxiosResponse>(result: T) => T
  responseInterceptorsCatch?: (err: any) => any
}

// Token 存储器
export interface StorageConfig {
  tokenKey: string
  getToken: (key: string) => string | null
  setToken: (key: string, val: string) => void
}

// 自定义传入的参数
export interface RequestConfig extends AxiosRequestConfig {
  storage: StorageConfig
  interceptors?: RequestInterceptors
}

// 取消请求
export interface CancelRequestSource {
  [index: string]: () => void
}

/**
 * Axios 类封装
 * 使用类封装可以创建多个实例，适用范围更广，封装性更强
 * 拦截器的执行顺序为 实例请求 > 类请求 >实例响应 > 类响应
 */
export default class Axios {
  public instance: AxiosInstance // 实例
  public storage: StorageConfig // Token 存储器
  public interceptorsObj?: RequestInterceptors // 拦截器对象
  public requestUrlList?: string[] // 存放所有请求 URL 的集合
  public cancelRequestSourceList?: CancelRequestSource[] // 存放取消方法的集合

  /**
   * @description: 构造函数
   */
  constructor(requestConfig: RequestConfig) {
    const {storage, ...config} = requestConfig
    this.storage = storage
    this.instance = axios.create(config)
    this.interceptorsObj = config.interceptors
    this.requestUrlList = []
    this.cancelRequestSourceList = []

    // 全局类请求拦截器
    // @ts-ignore
    this.instance.interceptors.request.use((req: AxiosRequestConfig) => {
        const token = this.storage.getToken(this.storage.tokenKey)
        // @ts-ignore
        token && (req.headers.Authorization = token) // 获取缓存中 token 添加到请求头
        return req
      },
      (err: any) => {
        return err
      }
    )

    // 实例请求拦截器
    this.instance.interceptors.request.use(
      // @ts-ignore
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch,
    )
    // 实例响应拦截器
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch,
    )

    // 全局类响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        res.headers?.Authorization && this.storage.setToken(this.storage.tokenKey, res.headers.Authorization)
        return res.data
      },
      (err: any) => {
        return Promise.reject(err)
      },
    )
  }

  /**
   * @description: 请求方法，T: HttpResponse<RES>
   */
  public request<T>(config: Omit<RequestConfig, "storage">): Promise<T> {
    return new Promise((resolve, reject) => {
      // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      // url 存在保存取消请求方法和当前请求 url
      const url = config.url
      if (url) {
        this.requestUrlList?.push(url)
        config.cancelToken = new axios.CancelToken(cancel => {
          this.cancelRequestSourceList?.push({[url]: cancel})
        })
      }
      // 发送请求
      this.instance.request<any, T>(config)
        .then(res => {
          // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors<T>(res)
          }
          resolve(res)
        })
        .catch((err: any) => {
          reject(err)
        })
        .finally(() => {
          url && this.delUrl(url)
        })
    })
  }

  /**
   * @description: 取消请求
   * @param {string | string[]} url
   * @return void
   */
  public cancelRequest(url: string | string[]): void {
    if (typeof url === 'string') {
      const sourceIndex = this.getSourceIndex(url)
      sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][url]()
    } else {
      url.forEach(val => {
        const sourceIndex = this.getSourceIndex(val)
        sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][val]()
      })
    }
  }

  /**
   * @description: 取消全部请求
   * @return void
   */
  public cancelAllRequest(): void {
    this.cancelRequestSourceList?.forEach(source => {
      const key = Object.keys(source)[0]
      source[key]()
    })
  }

  /**
   * @description: 获取指定 url 在 cancelRequestSourceList 中的索引
   * @param {string} url
   * @returns {number} 索引位置
   */
  private getSourceIndex(url: string): number {
    return this.cancelRequestSourceList?.findIndex((item: CancelRequestSource) => {
      return Object.keys(item)[0] === url
    }) as number
  }

  /**
   * @description: 删除 requestUrlList 和 cancelRequestSourceList
   * @param {string} url
   * @returns {*}
   */
  private delUrl(url: string): void {
    const urlIndex = this.requestUrlList?.findIndex(u => u === url)
    const sourceIndex = this.getSourceIndex(url)
    // 删除 url 和 cancel 方法
    urlIndex !== -1 && this.requestUrlList?.splice(urlIndex as number, 1)
    sourceIndex !== -1 &&
    this.cancelRequestSourceList?.splice(sourceIndex as number, 1)
  }
}
