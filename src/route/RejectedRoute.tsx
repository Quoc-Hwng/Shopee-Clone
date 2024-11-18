import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../contexts/app.context'

export function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}
