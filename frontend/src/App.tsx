import { BrowserRouter } from "react-router-dom"
import { Containers } from "@/containers"
import { Providers } from "@/contexts"
import Router from "@/router"

// ErrorBoundary
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { FullPageErrorFallback } from "@/components/Common"

// Components
import ScrollToTop from "@/components/ScrollToTop"

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ErrorBoundary fallbackRender={FullPageErrorFallback}>
      <BrowserRouter>
        <Providers>
          <Containers>
            <ScrollToTop />
            <Router />
          </Containers>
        </Providers>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
