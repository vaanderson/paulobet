import React from 'react'
import { Navigate } from 'react-router'

interface UserType {
  token: string | null
  login: string
  userName: string
  thumb?: string
  isLogged: boolean
}

export interface AuthContextData {
  token: UserType
  setToken: React.Dispatch<React.SetStateAction<UserType>>

  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>

  saveUserStorage: (values: UserType) => void
  clearUserStorage: () => void
}

interface AuthProviderProps {
  children: React.ReactNode | undefined
}

const AuthContext = React.createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = React.useState(true)
  const [token, setToken] = React.useState<UserType>({
    token: null,
    login: '',
    userName: '',
    thumb: '',
    isLogged: false,
  })

  const saveUserStorage = (values: UserType) => {
    localStorage.setItem('@user', JSON.stringify(values))
  }

  const clearUserStorage = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        loading,
        setLoading,
        saveUserStorage,
        clearUserStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
