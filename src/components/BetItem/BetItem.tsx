import React from 'react'
import { Chip, Card, CardContent, Box, Paper, Typography } from '@mui/material'
import { Bet } from 'src/@types/Bet.types'

interface BetItemProps {
  bet: Bet
}

const BetItem = ({ bet }: BetItemProps) => {
  const getIcon = (name: string) => (
    <Box justifyContent='center' display='flex'>
      <Box
        component='img'
        src={`/countries/${name}.svg`}
        alt={name}
        sx={{ width: 60, height: 60 }}
      />
    </Box>
  )
  const matchSplit = bet.matchId.split('-')
  console.log(matchSplit)
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            gap: 3,
            gridTemplateColumns: 'repeat(2, 1fr)',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Paper
            variant='outlined'
            sx={{
              py: 2.5,
              textAlign: 'center',
              flex: 1,
              flexDirection: 'row',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <Box pl={5}>
              <Box sx={{ mb: 0.5 }}>{getIcon(matchSplit[0])}</Box>

              <Typography variant='h5'>{bet.home}</Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {matchSplit[0]}
              </Typography>
            </Box>
            <Box>
              <Chip label={bet.date} variant='filled' />
              <Typography variant='h3' sx={{ color: 'text.secondary' }}>
                x
              </Typography>
              <Chip label={`${bet.score} pontos`} color='info' variant='filled' />
            </Box>
            <Box pr={5}>
              <Box sx={{ mb: 0.5 }}>{getIcon(matchSplit[1])}</Box>

              <Typography variant='h5'>{bet.visitors}</Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {matchSplit[1]}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </CardContent>
    </Card>
  )
}

export default BetItem
