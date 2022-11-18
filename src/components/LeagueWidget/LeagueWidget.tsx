import merge from 'lodash/merge'
// @mui
import { useTheme, styled } from '@mui/material/styles'
import { Card, Typography, Box, CardProps } from '@mui/material'
// utils
import { fNumber } from 'src/utils/formatNumber'
// theme
import { ColorSchema } from 'src/theme/palette'
// components
import Iconify from 'src/components/Iconify'

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.primary.darker,
}))

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 120,
  height: 120,
  opacity: 0.12,
  position: 'absolute',
  right: theme.spacing(-3),
  color: theme.palette.common.white,
}))

// ----------------------------------------------------------------------

interface Props extends CardProps {
  icon: string
  title: string
  description?: string
  color?: ColorSchema
}

const LeagueWidget = ({ title, description, icon, color = 'primary', ...other }: Props) => {
  const theme = useTheme()

  return (
    <RootStyle
      sx={{
        bgcolor: '#027b5b',
        cursor: 'pointer',
        '&:hover': {
          bgcolor: '#f9c626',
        },
      }}
      {...other}
    >
      <Box sx={{ ml: 3, color: 'common.white' }}>
        <Typography variant='h4' textTransform='uppercase'>
          {title}
        </Typography>
        <Typography variant='body2' sx={{ opacity: 0.72 }}>
          {description}
        </Typography>
      </Box>
      <IconStyle icon={icon} />
    </RootStyle>
  )
}

export default LeagueWidget
