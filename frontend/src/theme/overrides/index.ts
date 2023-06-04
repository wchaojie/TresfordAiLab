import { ThemeOptions } from "@mui/material"

import Card from './Card'
import Paper from './Paper'
import Input from './Input'
import Button from './Button'
import Tooltip from './Tooltip'
import Backdrop from './Backdrop'
import Typography from './Typography'
import CssBaseline from './CssBaseline'
import Autocomplete from './Autocomplete'

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: ThemeOptions) {
  return Object.assign(
    Card(theme),
    Input(theme),
    Button(theme),
    Tooltip(theme),
    Backdrop(theme),
    Typography(theme),
    Autocomplete(theme),
    Paper(),
    CssBaseline(),
  )
}
