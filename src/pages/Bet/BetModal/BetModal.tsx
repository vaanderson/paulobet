import React from 'react'
import { Box, Container, DialogActions, DialogTitle, Grid, Typography, Button } from '@mui/material'
import { Countries } from 'src/constants/teams'
import { getIcon } from 'src/utils/getItem'
import { useForm } from 'react-hook-form'
import { FormProvider, RHFTextField } from 'src/components/hook-form'
import AuthContext from 'src/contexts/AuthContext'
import api from 'src/services/axios'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import { Bet } from 'src/@types/Bet.types'

interface BetModalProps {
  match: Bet
  onClose: VoidFunction
  setMatch: React.Dispatch<React.SetStateAction<Bet | null | undefined>>
}

interface BetFormValuesProps {
  matchId: string
  home: number
  visitors: number
  afterSubmit?: string
}

const BetModal = ({ match, onClose, setMatch }: BetModalProps) => {
  const { leagueId, userId } = useParams()
  const { token } = React.useContext(AuthContext)
  const matchSplit = match.matchId.split('-')

  const defaultValues = {
    matchId: match.matchId,
    home: match.home ?? 0,
    visitors: match.visitors ?? 0,
  }

  const methods = useForm<BetFormValuesProps>({
    defaultValues,
  })

  const { handleSubmit } = methods

  const onSubmit = (values: BetFormValuesProps) => {
    const data = {
      token: token.token,
      matchId: values.matchId,
      home: Number(values.home),
      visitors: Number(values.visitors),
    }

    api
      .post(`/bets/${leagueId}/${userId}`, data)
      .then(() => {
        toast.success('Palpite registrado com sucesso')
        setMatch(null)
        onClose()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <DialogTitle>Realizar palpite</DialogTitle>
      <Container>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container pb={2}>
            <Grid
              item
              xs={5}
              display='flex'
              justifyContent='center'
              alignContent='center'
              alignItems='center'
            >
              <Box pl={5} textAlign='center'>
                <Box sx={{ mb: 0.5 }}>{getIcon(matchSplit[0])}</Box>
                <Box mt={5}>
                  <RHFTextField
                    style={{ textAlign: 'center' }}
                    name='home'
                    type='number'
                    label={`Placar ${Countries[matchSplit[0] as keyof typeof Countries]}`}
                  />
                </Box>

                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                  {Countries[matchSplit[0] as keyof typeof Countries]}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              display='flex'
              justifyContent='center'
              alignContent='center'
              alignItems='center'
            >
              <Box style={{ textAlign: 'center' }}>
                <Typography variant='h3' sx={{ color: 'text.secondary', textAlign: 'center' }}>
                  x
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={5}
              display='flex'
              justifyContent='center'
              alignContent='center'
              alignItems='center'
            >
              <Box pr={5} textAlign='center'>
                <Box sx={{ mb: 0.5 }}>{getIcon(matchSplit[1])}</Box>
                <Box mt={5}>
                  <RHFTextField
                    style={{ textAlign: 'center' }}
                    name='visitors'
                    type='number'
                    label={`Placar ${Countries[matchSplit[1] as keyof typeof Countries]}`}
                  />
                </Box>
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                  {Countries[matchSplit[1] as keyof typeof Countries]}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <DialogActions style={{ textAlign: 'center' }}>
            <Grid container display='flex' justifyContent='center' spacing={3}>
              <Grid item>
                <Button variant='contained' type='submit' style={{ backgroundColor: '#027b5b' }}>
                  Confirmar
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={onClose} style={{ color: '#027b5b' }}>
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </FormProvider>
      </Container>
    </>
  )
}

export default BetModal
