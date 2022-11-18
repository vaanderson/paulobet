import * as React from 'react'
// @mui
import { styled } from '@mui/material/styles'
import { Box, Card, Container, Typography } from '@mui/material'

// hooks
import useResponsive from 'src/hooks/useResponsive'
import Page from 'src/components/Page'

import { useNavigate } from 'react-router-dom'
// form
import { useForm } from 'react-hook-form'
// @mui
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import LoadingButton from '@mui/lab/LoadingButton'
// routes
import useIsMountedRef from 'src/hooks/useIsMountedRef'
// components
import Iconify from 'src/components/Iconify'
import { FormProvider, RHFTextField, RHFCheckbox } from 'src/components/hook-form'
import api from 'src/services/axios'
import { toast } from 'react-toastify'
import AuthContext from 'src/contexts/AuthContext'
import LogoImg from 'src/assets/brand/paulobet.svg'
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}))

const SectionStyle = styled(Card)(() => ({
  width: '100%',
  maxWidth: 900,
  display: 'flex',
  padding: 50,
  flexDirection: 'column',
  justifyContent: 'center',
  background: '#027b5b',
  borderRadius: 0,
  alignItems: 'center',
}))

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}))

type FormValuesProps = {
  login: string
  password: string
  remember: boolean
  afterSubmit?: string
}

const Login = () => {
  const mdUp = useResponsive('up', 'md')
  const navigate = useNavigate()
  const isMountedRef = useIsMountedRef()
  const { saveUserStorage } = React.useContext(AuthContext)
  const [showPassword, setShowPassword] = React.useState(false)

  const defaultValues = {
    login: '',
    password: '',
  }

  const methods = useForm<FormValuesProps>({
    defaultValues,
  })

  const {
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods

  const onSubmit = async (data: FormValuesProps) => {
    api
      .post('/login', data)
      .then((response) => {
        const tokenValues = {
          ...response.data,
          thumb: response.data?.thumb ?? '',
          login: data.login,
          isLogged: true,
        }
        saveUserStorage(tokenValues)
        toast.success('Logado com sucesso, redirecionando...')
        window.location.reload()
      })
      .catch((error) => {
        if (isMountedRef.current) {
          setError('afterSubmit', {
            ...error,
            message: 'Dados de acesso inválidos, tente novamente.',
          })
        }
      })
  }

  return (
    <Page title='Login'>
      <RootStyle>
        {mdUp && (
          <SectionStyle>
            <Box
              component='img'
              src={LogoImg}
              sx={{ width: 350, height: 215, textAlign: 'center' }}
            />
          </SectionStyle>
        )}

        <Container maxWidth='sm'>
          <ContentStyle>
            <Stack direction='row' alignItems='center' sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant='h4' gutterBottom>
                  Bem-vindo(a) de volta!
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Entre com suas credenciais para continuar.
                </Typography>
              </Box>
            </Stack>

            <Alert severity='info' sx={{ mb: 3 }}>
              v: {process.env.REACT_APP_VERSION}
            </Alert>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                {!!errors.afterSubmit && (
                  <Alert severity='error'>{errors.afterSubmit.message}</Alert>
                )}

                <RHFTextField name='login' label='Usuário' />

                <RHFTextField
                  name='password'
                  label='Senha'
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                sx={{ my: 2 }}
              >
                <RHFCheckbox name='remember' label='Permancer logado' />
              </Stack>

              <LoadingButton
                fullWidth
                size='large'
                type='submit'
                variant='contained'
                style={{
                  backgroundColor: '#027b5b',
                }}
                loading={isSubmitting}
              >
                Entrar
              </LoadingButton>
            </FormProvider>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  )
}

export default Login
