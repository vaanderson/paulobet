import * as React from 'react'
// @mui
import { alpha } from '@mui/material/styles'
import { Box, Divider, Typography, Stack, MenuItem, Avatar } from '@mui/material'
// components
import MenuPopover from '../../../components/MenuPopover'
import { IconButtonAnimate } from '../../../components/animate'
import AuthContext from 'src/contexts/AuthContext'
import defaultThumb from '../../../assets/img/defaultThumb.png'
import { useNavigate } from 'react-router'
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Inicio',
    linkTo: '/',
  },
  {
    label: 'Perfil',
    linkTo: '/profile',
  },
]

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate()
  const { token, clearUserStorage } = React.useContext(AuthContext)
  const [open, setOpen] = React.useState<HTMLElement | null>(null)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(null)
  }

  const handleNavigate = (route: string) => {
    navigate(route)
    handleClose()
  }

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: '""',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={token?.thumb ?? defaultThumb} alt={token?.userName} />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant='subtitle2' noWrap>
            {token?.userName}
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
            {token?.login}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleNavigate(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={() => clearUserStorage()} sx={{ m: 1 }}>
          Sair
        </MenuItem>
      </MenuPopover>
    </>
  )
}
