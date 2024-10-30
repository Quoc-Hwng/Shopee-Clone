import { createContext, useState, useMemo } from 'react'
import { getAccessTokenFromLS, getProfileFromLS } from '../utils/auth'
import { User } from '../types/user.type'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

const inititalAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null
}

export const AppContext = createContext<AppContextInterface>(inititalAppContext)

// export const AppProvider = ({ children }: { children: React.ReactNode }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(inititalAppContext.isAuthenticated)
// const [profile, setProfile] = useState<User | null>(inititalAppContext.profile)

//   return <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, profile, setProfile  }}>{children}</AppContext.Provider>
// }

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(inititalAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(inititalAppContext.profile)

  const value = useMemo(
    () => ({ isAuthenticated, setIsAuthenticated, profile, setProfile }),
    [isAuthenticated, profile]
  ) // Wrapped in useMemo

  return <AppContext.Provider value={value}>{children}</AppContext.Provider> // Updated to use memoized value
}
