import React from 'react'
import Page from 'src/components/Page'
import Container from '@mui/material/Container'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import { Grid, Stack } from '@mui/material'
import api from 'src/services/axios'
import AuthContext from 'src/contexts/AuthContext'
import { useParams } from 'react-router'
import { BetType } from 'src/@types/Bet.types'
import BetItem from 'src/components/BetItem/BetItem'
const Bet = () => {
  const { leagueId, userId } = useParams()

  const { token } = React.useContext(AuthContext)
  const [betData, setBetData] = React.useState<BetType>()

  const fetchBets = () => {
    api
      .get(`/bets/${leagueId}/${userId}?token=${token.token}&login=${token.login}`)
      .then((response) => {
        setBetData(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  React.useEffect(() => {
    fetchBets()
  }, [])

  return (
    <Page title='Bets'>
      <Container>
        <HeaderBreadcrumbs
          heading='Bet'
          links={[{ name: 'Bolão', href: '/' }, { name: 'Bets' }, { name: userId ?? '' }]}
        />
        <Grid container>
          <Grid item xs={12} md={12} lg={12}>
            <Stack spacing={3}>
              {betData?.bets.map((bet) => (
                <BetItem key={bet.date} bet={bet} />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Page>
  )
}

export default Bet
