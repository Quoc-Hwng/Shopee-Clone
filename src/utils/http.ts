import axios, { AxiosError, AxiosInstance } from 'axios'
import HttpStatusCode from '../constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import { AuthResponse } from '../types/auth.type'
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS, setProfileToLS } from './auth'
import path from '../constants/path'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use((config) => {
      if (this.accessToken) {
        config.headers.authorization = this.accessToken
      }
      return config // Ensure config is returned in both cases
    })
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === path.login || url === path.register) {
          const data = response.data as AuthResponse
          const authResponse = response.data as AuthResponse
          if (authResponse?.data?.access_token) {
            this.accessToken = authResponse.data.access_token
            setAccessTokenToLS(this.accessToken)
            if (data.data?.user) {
              // Check if user is defined
              setProfileToLS(data.data.user)
            }
          }
        } else if (url === path.logout) {
          this.accessToken = ''
          clearLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
