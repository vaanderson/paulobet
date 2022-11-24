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
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import InputAdornment from '@mui/material/InputAdornment'
import { Icon } from '@iconify/react'
import BackButton from 'src/components/BackButton'
import FloatActions from 'src/components/FloatActions'
import Iconify from 'src/components/Iconify'
import { Link as RouterLink } from 'react-router-dom'

const Ranking = () => {
  const { leagueId } = useParams()

  const navigate = useNavigate()
  const { token } = React.useContext(AuthContext)
  const [rankingData, setRankingData] = React.useState<RankingType>()
  const [userSearch, setUserSearch] = React.useState('')
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

  const handleNavigateBet = () => {
    navigate(`/bets/${leagueId}/${token.login}`)
  }

  return (
    <Page title='Ranking'>
      <Container>
        <BackButton onClick={() => navigate('/')} />
        <HeaderBreadcrumbs
          heading='Ranking'
          links={[{ name: 'Bolão', href: '/' }, { name: 'Bet', href: '/' }, { name: 'Ranking' }]}
          action={
            <Button
              variant='contained'
              component={RouterLink}
              to={`/bets/${leagueId}/${token.login}`}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              Meus palpites
            </Button>
          }
        />
        <Grid container>
          <Grid item xs={12} mb={5}>
            <TextField
              fullWidth
              onChange={(event) => setUserSearch(event.target.value)}
              id='input-with-icon-textfield'
              label='Pesquisar usuário'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Icon icon='material-symbols:search' />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Stack spacing={3}>
              {orderBy(rankingData?.ranking, ['score'], ['desc'])
                .filter((item) => item.userId.toLowerCase().includes(userSearch.toLowerCase()))
                .map((ranking, index) => (
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
        <FloatActions refresh={fetchRanking} bet={handleNavigateBet} />
      </Container>
    </Page>
  )
}

export default Ranking
