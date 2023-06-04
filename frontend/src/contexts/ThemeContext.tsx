import { ReactNode, useMemo } from "react"
import { CssBaseline } from "@mui/material"
import { createTheme, StyledEngineProvider, ThemeProvider as MUIThemeProvider } from "@mui/material/styles"

import palette from "@/theme/palette"
import typography from "@/theme/typography"
import componentsOverride from "@/theme/overrides"
import { customShadows, shadows } from "@/theme/shadows"

// ----------------------------------------------------------------------

export const ThemeProvider = ({children}: { children: ReactNode }) => {
  const themeOptions = useMemo(() => ({
      palette, // 调色板
      // shape: {borderRadius: 16}, // 圆角
      typography, // 字体
      shadows, // 阴影
      customShadows, // 自定义阴影
    }),
    [],
  )

  // 通过接收的选项生成一个主题基础
  // @ts-ignore
  const theme = createTheme(themeOptions)
  theme.components = componentsOverride(theme) // 组件覆盖

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  )
}
