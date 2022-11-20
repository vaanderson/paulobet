// @mui
import { styled } from '@mui/material/styles'
import { Box, Link, Typography, Avatar } from '@mui/material'
import AuthContext from 'src/contexts/AuthContext'
import React from 'react'
import defaultThumb from '../../../assets/img/defaultThumb.png'
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}))

// ----------------------------------------------------------------------

type Props = {
  isCollapse: boolean | undefined
}

export default function NavbarAccount({ isCollapse }: Props) {
  const { token } = React.useContext(AuthContext)
  return (
    <Link underline='none' color='inherit'>
      <RootStyle
        sx={{
          ...(isCollapse && {
            bgcolor: 'transparent',
          }),
        }}
      >
        <Avatar src={token?.thumb ?? defaultThumb} alt={token?.userName} />

        <Box
          sx={{
            ml: 2,
            transition: (theme) =>
              theme.transitions.create('width', {
                duration: theme.transitions.duration.shorter,
              }),
            ...(isCollapse && {
              ml: 0,
              width: 0,
            }),
            textTransform: 'ellipse',
            overflow: 'hidden',
          }}
        >
          <Typography variant='subtitle2' noWrap>
            {token && token.userName}
          </Typography>
          <Typography variant='body2' noWrap sx={{ color: 'text.secondary' }}>
            {token && token.login}
          </Typography>
        </Box>
      </RootStyle>
    </Link>
  )
}
