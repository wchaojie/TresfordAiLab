import { Box } from '@mui/material'

// ----------------------------------------------------------------------

type Props = {
  src: string
  size?: number
  color?: string
  sx?: object
}

export default function IconSvg({src, size, color, sx}: Props) {
  return (
    <Box
      component="span"
      sx={{
        width: size || 24,
        height: size || 24,
        display: 'inline-block',
        color: color,
        backgroundColor: 'currentColor',
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
    />
  )
}
