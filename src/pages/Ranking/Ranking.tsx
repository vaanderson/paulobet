import React from 'react'
import Page from 'src/components/Page'
import Container from '@mui/material/Container'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import { Grid, Stack } from '@mui/material'
import api from 'src/services/axios'
import AuthContext from 'src/contexts/AuthContext'
import { useNavigate, useParams } from 'react-router'
import { RankingType } from 'src/@types/Rankings.types'
import UserBet from 'src/components/UserBet'
import orderBy from 'lodash/orderBy'
const Ranking = () => {
  const { leagueId } = useParams()

  const navigate = useNavigate()
  const { token } = React.useContext(AuthContext)
  const [rankingData, setRankingData] = React.useState<RankingType>()

  const fetchRanking = () => {
    api
      .get(`/ranking/${leagueId}?token=${token.token}&login=${token.login}`)
      .then((response) => {
        setRankingData(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  React.useEffect(() => {
    fetchRanking()
  }, [])

  return (
    <Page title='Ranking'>
      <Container>
        <HeaderBreadcrumbs
          heading='Ranking'
          links={[{ name: 'Bolão', href: '/' }, { name: 'Rankings' }, { name: 'Todos' }]}
        />
        <Grid container>
          <Grid item xs={12} md={12} lg={12}>
            <Stack spacing={3}>
              {orderBy(rankingData?.ranking, ['score'], ['desc']).map((ranking, index) => (
                <UserBet
                  onClick={() => navigate(`/bets/${leagueId}/${ranking.userId}`)}
                  key={ranking.userId}
                  position={index + 1}
                  userRanking={ranking}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Page>
  )
}

export default Ranking
