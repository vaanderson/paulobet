import { Link as RouterLink } from 'react-router-dom'
// @mui
import { useTheme } from '@mui/material/styles'
import { Box, BoxProps } from '@mui/material'
import LogoImg from 'src/assets/brand/paulobet.svg'
// ----------------------------------------------------------------------

interface Props extends BoxProps {
  disabledLink?: boolean
}

export default function Logo({ disabledLink = false, sx }: Props) {
  const theme = useTheme()

  // OR
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = <Box component='img' src={LogoImg} sx={{ width: 300, height: 165, ...sx }} />

  if (disabledLink) {
    return <>{logo}</>
  }

  return <RouterLink to='/'>{logo}</RouterLink>
}
