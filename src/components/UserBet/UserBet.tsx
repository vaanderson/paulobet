// @mui
import { alpha, styled } from '@mui/material/styles'
import { Box, Stack, Card, Avatar, CardHeader, Typography, CardProps } from '@mui/material'
// utils
import { fShortenNumber } from 'src/utils/formatNumber'
// components
import Iconify from 'src/components/Iconify'
import { Ranking } from 'src/@types/Rankings.types'
import defaultThumb from 'src/assets/img/defaultThumb.png'
import React from 'react'
// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
}))

// ----------------------------------------------------------------------

interface UserBetProps extends CardProps {
  title?: string
  subheader?: string
  userRanking: Ranking
  position: number
}

const UserBet = ({ position, userRanking, title, subheader, ...props }: UserBetProps) => {
  const [hover, setHover] = React.useState(false)
  return (
    <Card
      sx={{
        cursor: 'pointer',
        '&:hover': {
          bgcolor: '#f9c626',
        },
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      <Stack spacing={1} sx={{ p: 3 }}>
        <Stack direction='row' alignItems='center' spacing={2}>
          <Avatar alt={userRanking.userId} src={userRanking?.thumb ?? defaultThumb} />

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='subtitle2' color={hover ? '#027b5b' : ''}>
              {userRanking.userId}
            </Typography>

            <Typography
              variant='caption'
              sx={{
                mt: 0.5,
                display: 'flex',
                alignItems: 'center',
                color: 'text.secondary',
                fontWeight: 'bold',
              }}
              color={hover ? '#027b5b' : 'primary'}
            >
              <Iconify
                icon={'icon-park-outline:soccer-one'}
                sx={{ width: 16, height: 16, mr: 0.5 }}
              />
              {fShortenNumber(userRanking.score)}
              {` ponto${userRanking.score - 1 ? 's' : ''}`}
            </Typography>
          </Box>
          {position === 1 && (
            <IconWrapperStyle
              sx={{
                color: 'info.main',
                bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
              }}
            >
              <Iconify icon={'ant-design:trophy-filled'} width={20} height={20} />
            </IconWrapperStyle>
          )}
          {position === 2 && (
            <IconWrapperStyle
              sx={{
                color: 'error.main',
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
              }}
            >
              <Iconify icon={'ant-design:trophy-filled'} width={20} height={20} />
            </IconWrapperStyle>
          )}
          {position === 3 && (
            <IconWrapperStyle
              sx={{
                color: 'success.main',
                bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
              }}
            >
              <Iconify icon={'ant-design:trophy-filled'} width={20} height={20} />
            </IconWrapperStyle>
          )}
        </Stack>
      </Stack>
    </Card>
  )
}

export default UserBet
