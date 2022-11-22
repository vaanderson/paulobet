import * as React from 'react'
import { useNavigate } from 'react-router'
import AuthContext from 'src/contexts/AuthContext'

import { Navigate, useLocation, Routes, Route } from 'react-router-dom'
import LoadingScreen from 'src/components/LoadingScreen'
import DashboardLayout from 'src/layouts/dashboard'
import LogoOnlyLayout from 'src/layouts/LogoOnlyLayout'
import Page404 from 'src/pages/Page404'
import Ranking from 'src/pages/Ranking'
import Bet from 'src/pages/Bet'

// Dashboard

const Loadable = (Component: React.ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation()
  return (
    <React.Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/')} />}>
      <Component {...props} />
    </React.Suspense>
  )
}

const Dashboard = Loadable(React.lazy(() => import('../pages/Dashboard')))
const Login = Loadable(React.lazy(() => import('../pages/Auth/Login')))

const Router = () => {
  const { loading, setLoading, token, setToken } = React.useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  React.useEffect(() => {
    const loadLocalStorage = () => {
      if (localStorage.getItem('@user')) {
        setToken(JSON.parse(localStorage.getItem('@user') as string))
        setLoading(false)
        if (location.pathname === '/login') {
          navigate('/')
        } else {
          navigate(location.pathname)
        }
      } else {
        navigate('/login')
        setLoading(false)
      }
    }
    if (token.isLogged) {
      if (location.pathname === '/login') {
        navigate('/')
      }
    } else {
      navigate('/login')
    }
    loadLocalStorage()
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<DashboardLayout />}>
          <Route path='/' element={<Dashboard />} index />
          <Route path='/ranking/:leagueId' element={<Ranking />} />
          <Route path='/bets/:leagueId/:userId' element={<Bet />} />
        </Route>
        <Route path='*' element={<LogoOnlyLayout />}>
          <Route path='404' element={<Page404 />} />
          <Route path='*' element={<Navigate to='/404' replace />} />
        </Route>
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </>
  )
}
export default Router
