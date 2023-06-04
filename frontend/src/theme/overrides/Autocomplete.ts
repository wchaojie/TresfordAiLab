// @ts-nocheck
import { ThemeOptions } from "@mui/material"

// ----------------------------------------------------------------------

export default function Autocomplete(theme: ThemeOptions) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows.z20,
        },
      },
    },
  }
}
