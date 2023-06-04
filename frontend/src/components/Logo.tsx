import { Link as RouterLink } from "react-router-dom"
import { Box, BoxProps } from "@mui/material"

import logoSvg from "@/assets/icons/logo.svg"

// ----------------------------------------------------------------------
type Props = {
  disabledLink?: boolean
  linkTo?: string,
  sx?: BoxProps,
}
export default function Logo({disabledLink = true, linkTo = "/", sx}: Props) {
  const LogoSvg = () => <Box component="img" src={logoSvg} sx={{...sx}} />

  return disabledLink ? <LogoSvg /> : <RouterLink to={linkTo}><LogoSvg /></RouterLink>
}
