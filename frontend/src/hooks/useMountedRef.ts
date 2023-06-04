import { useEffect, useRef } from "react"

// ----------------------------------------------------------------------

export default function useMountedRef() {
    const mountedRef = useRef(false)

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    })

    return mountedRef
}
