import React from 'react'
import { Chip, Card, CardContent, Box, Typography, CardProps, Grid } from '@mui/material'
import { Bet } from 'src/@types/Bet.types'
import { Countries } from 'src/constants/teams'
import { getIcon } from 'src/utils/getItem'

interface BetItemProps extends CardProps {
  bet: Bet
}

const BetItem = ({ bet, ...props }: BetItemProps) => {
  const [hover, setHover] = React.useState(false)

  const matchSplit = bet.matchId.split('-')
  return (
    <Card
      sx={{
        cursor: 'pointer',
        '&:hover': {
          border: '2px solid #f9c626',
        },
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      <CardContent>
        <Grid container>
          <Grid
            item
            xs={4}
            display='flex'
            justifyContent='center'
            alignContent='center'
            alignItems='center'
          >
            <Box pl={5} textAlign='center'>
              <Box sx={{ mb: 0.5 }}>{getIcon(matchSplit[0])}</Box>

              <Typography variant='h5'>{bet.home}</Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {Countries[matchSplit[0] as keyof typeof Countries]}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={4}
            display='flex'
            justifyContent='center'
            alignContent='center'
            alignItems='center'
          >
            <Box style={{ textAlign: 'center' }}>
              <Chip label={bet.date} variant='filled' />
              <Typography variant='h3' sx={{ color: 'text.secondary', textAlign: 'center' }}>
                x
              </Typography>
              <Chip
                label={`${bet.score} pontos`}
                style={{
                  backgroundColor: !bet.editable ? '#027b5b' : '#f9c626',
                  color: !bet.editable ? '#FFF' : '#027b5b',
                }}
                variant='filled'
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={4}
            display='flex'
            justifyContent='center'
            alignContent='center'
            alignItems='center'
          >
            <Box pr={5} textAlign='center'>
              <Box sx={{ mb: 0.5 }}>{getIcon(matchSplit[1])}</Box>

              <Typography variant='h5'>{bet.visitors}</Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {Countries[matchSplit[1] as keyof typeof Countries]}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default BetItem
