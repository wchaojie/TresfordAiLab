import { ThemeOptions } from "@mui/material"

// ----------------------------------------------------------------------

export default function Tooltip(theme: ThemeOptions) {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette!.grey![800],
        },
        arrow: {
          color: theme.palette!.grey![800],
        },
      },
    },
  }
}
