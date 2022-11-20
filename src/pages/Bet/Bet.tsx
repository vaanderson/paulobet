import React from 'react'
import Page from 'src/components/Page'
import Container from '@mui/material/Container'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import { Grid, Stack } from '@mui/material'
import api from 'src/services/axios'
import AuthContext from 'src/contexts/AuthContext'
import { useParams } from 'react-router'
import { Bet as BetDataType, BetType } from 'src/@types/Bet.types'
import BetItem from 'src/components/BetItem/BetItem'
import { DialogAnimate } from 'src/components/animate'
import BetModal from './BetModal'
const Bet = () => {
  const { leagueId, userId } = useParams()

  const { token } = React.useContext(AuthContext)
  const [betData, setBetData] = React.useState<BetType>()
  const [openModal, setOpenModal] = React.useState(false)
  const [match, setMatch] = React.useState<BetDataType | null>()
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
  }, [match])

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleOpenModal = (match: BetDataType) => {
    setMatch(match)
    setOpenModal(true)
  }

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
                <BetItem
                  style={{ pointerEvents: bet.editable ? 'auto' : 'none' }}
                  onClick={() => handleOpenModal(bet)}
                  key={bet.matchId}
                  bet={bet}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {openModal && match && (
        <DialogAnimate open={openModal} onClose={handleCloseModal}>
          <BetModal match={match} setMatch={setMatch} onClose={handleCloseModal} />
        </DialogAnimate>
      )}
    </Page>
  )
}

export default Bet
