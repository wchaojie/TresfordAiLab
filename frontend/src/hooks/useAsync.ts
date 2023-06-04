import { useCallback, useReducer, useState } from "react"
import useMountedRef from "@/hooks/useMountedRef"

// ----------------------------------------------------------------------

// 状态类型
interface State<D> {
  status: "idle" | "loading" | "error" | "success"
  error: Error | null
  data: D | null
}

// 默认初始化状态
const defaultInitState: State<null> = {
  status: "idle",
  error: null,
  data: null,
}

// 默认配置项
const defaultConfig = {
  throwOnError: false // 是否以抛出异常的方式让外部 promise 接受到异常
}

// 防止更新已经卸载的组件
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef() // 组件是否已挂载状态

  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0), // undefined
    [dispatch, mountedRef]
  )
}

// 异步请求状态
const useAsync = <D>(initState?: State<D>, initConfig?: typeof defaultConfig) => {
  const config = {...defaultConfig, ...initConfig} // 覆盖默认配置项

  const [current, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({...state, ...action}),
    {...defaultInitState, ...initState}
  )

  const safeDispatch = useSafeDispatch(dispatch)

  // useState 直接传入函数的含义是：惰性初始化；
  // 所以，要用 useState 保存函数，不能直接传入函数；
  const [retryFunc, setRetryFunc] = useState(() => () => {
  }) // 初始化一个空函数
  // 也可使用 useRef 保存函数
  // callbackRef = useRef(() => {})
  // () => (callbackRef.current = () => alert('updated'))
  // () => callbackRef.current()

  // 设置成功
  // 自定义 Hook 返回函数尽量使用 useCallback 包裹
  const setData = useCallback(
    (data: D) => safeDispatch({
      status: "success",
      error: null,
      data,
    }),
    [safeDispatch]
  )

  // 设置失败
  const setError = useCallback(
    (error: Error) => safeDispatch({
      status: "error",
      error,
      data: null,
    }),
    [safeDispatch]
  )

  // run 用来触发异步请求
  const run = useCallback((promise: Promise<D>, runConfig?: { retryFunc: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 Promise 类型数据!")
      }

      // 设置重试函数
      setRetryFunc(() => () => {
        if (runConfig?.retryFunc) run(runConfig?.retryFunc(), runConfig)
      })

      // setState(prevState => ({...prevState, stat: :"loading"})) // 防止 state 依赖，无限渲染
      safeDispatch({status: "loading"}) // 载入状态
      return promise.then(res => {
        setData(res)
        return res
      }).catch(err => {
        setError(err)
        // catch 会消化异常，如果不主动抛出，外面是接收不到异常的
        if (config.throwOnError) {
          return Promise.reject(err)
        }
        return err
      })
    },
    [config.throwOnError, setData, setError, safeDispatch]
  )

  return {
    isIdle: current.status === "idle",
    isLoading: current.status === "loading",
    isSuccess: current.status === "success",
    isError: current.status === "error",
    run,
    setData,
    setError,
    retryFunc, // retryFunc 被调用时重新跑一遍 run，让 state 刷新一遍
    ...current
  }
}

export default useAsync
