import { useMemo, useState } from "react"
import { useSearchParams, URLSearchParamsInit } from "react-router-dom"
import Helper from "@/utils/helper"

// ----------------------------------------------------------------------

/**
 * 返回 url 指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const setSearchParams = useSetUrlSearchParam() // 设置参数
    const [searchParams] = useSearchParams() // 获取参数
    const [stateKeys] = useState(keys) // 防止过渡渲染

    return [
        useMemo(
            () => Helper.subset(Object.fromEntries(searchParams), stateKeys) as { [key in K]: string },
            [searchParams, stateKeys] // 注意：基本类型, 组件状态可以放在依赖里, 但是其他引用类型不能放在依赖里
        ),
        (params: Partial<{ [key in K]: unknown }>) => setSearchParams(params) // 约束传入类型
    ] as const // 推断为字面量类型
}

/**
 * 设置 URL 参数
 */
export const useSetUrlSearchParam = () => {
    const [searchParams, setSearchParam] = useSearchParams() // 当前参数

    return (params: { [key in string]: unknown }) => {
        if (Helper.isEmptyObject(params)) {
            return setSearchParam({})
        } else {
            return setSearchParam(
                Helper.cleanObject(
                    // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
                    // Object.fromEntries 执行 URLSearchParams iterator 将其转成对象
                    {...Object.fromEntries(searchParams), ...params} // 新参数覆盖当前参数
                ) as URLSearchParamsInit
            )
        }
    }
}