import { useEffect, useLayoutEffect } from "react"

// ----------------------------------------------------------------------

export function useDidMount(func: () => void) {
  useEffect(func, [func])
}

export function useDidMountSync(func: () => void) {
  useLayoutEffect(func, [func])
}

export default useDidMount
