/* eslint-disable no-sparse-arrays */
import React from 'react'
import Page from 'src/components/Page'
import Container from '@mui/material/Container'
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs'
import { Alert, Grid, Stack } from '@mui/material'
import api from 'src/services/axios'
import AuthContext from 'src/contexts/AuthContext'
import { useNavigate, useParams } from 'react-router'
import { Bet as BetDataType, BetType } from 'src/@types/Bet.types'
import BetItem from 'src/components/BetItem/BetItem'
import { DialogAnimate } from 'src/components/animate'
import BetModal from './BetModal'
import BackButton from 'src/components/BackButton'
import { Countries } from 'src/constants/teams'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { Icon } from '@iconify/react'
import MenuItem from '@mui/material/MenuItem'
import { m } from 'framer-motion'
import getStatusDate from 'src/utils/getStatusDate'

interface Option {
  label: string
  value: string
}
const Bet = () => {
  const navigate = useNavigate()
  const { leagueId, userId } = useParams()

  const { token } = React.useContext(AuthContext)
  const [betData, setBetData] = React.useState<BetType>()
  const [openModal, setOpenModal] = React.useState(false)
  const [match, setMatch] = React.useState<BetDataType | null>()
  const [searchBet, setSearchBet] = React.useState('')
  const [statusSelect, setStatusSelect] = React.useState('ALL')
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

  const betDataFilter = betData?.bets
    ?.map((bet) => {
      const matchSplit = bet.matchId.split('-')
      return {
        ...bet,
        homeLabel: Countries[matchSplit[0] as keyof typeof Countries],
        homeValue: matchSplit[0],
        visitorsLabel: Countries[matchSplit[1] as keyof typeof Countries],
        visitorsValue: matchSplit[1],
        status: getStatusDate(bet.date),
      }
    })
    ?.filter(
      (item) =>
        item.homeLabel?.toLowerCase().includes(searchBet.toLowerCase()) ||
        item.visitorsLabel?.toLowerCase().includes(searchBet.toLowerCase()),
    )
    ?.filter((item) =>
      item.status
        ?.toLocaleLowerCase()
        .includes(statusSelect === 'ALL' ? '' : statusSelect.toLowerCase()),
    )

  const options = [
    {
      value: 'ALL',
      label: 'Todos',
    },
    ,
    {
      value: 'IN_PROGRESS',
      label: 'Em andamento',
    },
    {
      value: 'NEXT',
      label: 'Próximos',
    },
    {
      value: 'FINISH',
      label: 'Finalizados',
    },
  ] as Option[]

  return (
    <Page title='Bets'>
      <Container>
        <BackButton onClick={() => navigate(`/ranking/${leagueId}`)} />
        <HeaderBreadcrumbs
          heading='Bet'
          links={[
            { name: 'Bolão', href: '/' },
            { name: 'Bet', href: '/' },
            { name: 'Ranking', href: `/ranking/${leagueId}` },
            { name: userId ?? '' },
          ]}
        />
        <Grid container>
          <Grid item xs={12} mb={5}>
            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
              <TextField
                autoComplete='off'
                fullWidth
                select
                label='Status'
                SelectProps={{
                  MenuProps: {
                    sx: { '& .MuiPaper-root': { maxHeight: 260 } },
                  },
                }}
                sx={{
                  maxWidth: { sm: 240 },
                  textTransform: 'capitalize',
                }}
                value={statusSelect}
                onChange={(event) => setStatusSelect(event.target.value)}
              >
                {options.map((item) => (
                  <MenuItem
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                    }}
                    key={item?.value}
                    value={item?.value}
                  >
                    {item?.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                autoComplete='off'
                fullWidth
                onChange={(event) => setSearchBet(event.target.value)}
                id='input-with-icon-textfield'
                label='Pesquisar seleção'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon icon='material-symbols:search' />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Stack spacing={3}>
              {betDataFilter?.length ? (
                betDataFilter.map((bet) => (
                  <BetItem
                    style={{ pointerEvents: bet.editable ? 'auto' : 'none' }}
                    onClick={() => handleOpenModal(bet)}
                    key={bet.matchId}
                    bet={bet}
                  />
                ))
              ) : (
                <Alert severity='warning' style={{ textAlign: 'center' }}>
                  Nenhum resultado encontrado.
                </Alert>
              )}
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
