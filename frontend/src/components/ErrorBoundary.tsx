import { Component, PropsWithChildren, ReactElement } from "react"

// ----------------------------------------------------------------------

type FallbackRender = (props: { error: Error | null }) => ReactElement
type P = PropsWithChildren<{ fallbackRender: FallbackRender }> // { children: ReactNode, fallbackRender: FallbackRender }
type S = { error: Error | null } // State

// http://github.com/bvaughn/react-error-boundary
export class ErrorBoundary extends Component<P, S> {
  state = {error: null}

  static getDerivedStateFromError(error: Error) {
    return {error}
  }

  render() {
    const {error} = this.state
    const {fallbackRender, children} = this.props
    return error ? fallbackRender({error}) : children
  }
}
