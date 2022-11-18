import React from 'react'
import Page from 'src/components/Page'
import Container from '@mui/material/Container'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import { Grid, Stack } from '@mui/material'
import LeagueWidget from 'src/components/LeagueWidget'
import api from 'src/services/axios'
import AuthContext from 'src/contexts/AuthContext'
import { LeaguesType } from 'src/@types/Leagues.types'
import { useNavigate } from 'react-router'
import Card from '@mui/material/Card'

const Dashboard = () => {
  const navigate = useNavigate()
  const { token } = React.useContext(AuthContext)
  const [leaguesData, setLeaguesData] = React.useState<LeaguesType>()

  const fetchLeagues = () => {
    api
      .get(`/leagues/${token.login}?token=${token.token}`)
      .then((response) => {
        console.log(response.data)
        setLeaguesData(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  React.useEffect(() => {
    fetchLeagues()
  }, [])

  return (
    <Page title='Inicio'>
      <Container>
        <HeaderBreadcrumbs
          heading='Bolão'
          links={[{ name: 'Bolão', href: '/' }, { name: 'Todos' }]}
        />
        <Grid container>
          <Grid item xs={12} md={12} lg={12}>
            <Card>
              <Stack spacing={3}>
                {leaguesData?.leagues.map((league) => (
                  <LeagueWidget
                    onClick={() => navigate(`/ranking/${league.leagueId}`)}
                    key={league.leagueId}
                    title={league.leagueId}
                    icon='noto-v1:soccer-ball'
                  />
                ))}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  )
}

export default Dashboard
