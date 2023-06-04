import { ForwardedRef, forwardRef, HTMLAttributes, ReactNode } from "react"
import { Helmet } from "react-helmet-async"
import { Box } from "@mui/material"

import appConfig from "@/configs/app"

// ----------------------------------------------------------------------

type Props = {
  children?: ReactNode
  title?: string
  meta?: string
  other?: HTMLAttributes<any>
}
const Page = forwardRef(({children, title = "", meta, ...other}: Props, ref: ForwardedRef<any>) => (
  <>
    <Helmet>
      <title>{`${title} | ${appConfig.appName}`}</title>
      {meta}
    </Helmet>
    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
))

export default Page
