import { ReactNode } from "react"
import { HelmetProvider } from "react-helmet-async"

// Context
import { ThemeProvider } from "./ThemeContext"

// ----------------------------------------------------------------------

export const Providers = ({children}: { children: ReactNode }) => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </HelmetProvider>
  )
}
