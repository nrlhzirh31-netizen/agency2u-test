import axios from 'axios'
import router from '@/router'
import { API, SESSION } from '@/constants'
import { ROUTE_NAME } from '@/constants/route.constants'
const numOfAttempt = 3

export function apiHelper(retainSession = true, refreshToken = false, baseURL = API.BASE_URL, appendAuthHeader = true) {
  let attemptedCount = 0
  const JWTtoken = localStorage.getItem(SESSION.JWT_TOKEN) != null ? localStorage.getItem(SESSION.JWT_TOKEN) : sessionStorage.getItem(SESSION.JWT_TOKEN)
  const JWTrefreshToken = localStorage.getItem(SESSION.JWT_TOKEN_REFRESH) != null ? localStorage.getItem(SESSION.JWT_TOKEN_REFRESH) : sessionStorage.getItem(SESSION.JWT_TOKEN_REFRESH)
  const token = refreshToken != true ? JWTtoken : JWTrefreshToken
  const authHeader =
    token && appendAuthHeader
      ? {
          Authorization: 'Bearer ' + token
        }
      : {}

  const apiInstance = axios.create({
    baseURL,
    headers: authHeader
  })

  const responseHandler = (response) => {
    if (retainSession) {
      localStorage.setItem(SESSION.LAST_ACTIVITY_TIME, new Date().getTime())
    }

    return response.data
  }

  const errorHandler = (error) => {
    if (!error.response) {
      if (error.message === 'Network Error') {
        error.response.status = 503
        error.response.data = {
          success: false,
          code: '0.96',
          error: 'Network Error'
        }
      } else {
        error.response.data = {
          success: false,
          code: '0.99',
          error: 'Unknown Error'
        }
      }
    } else {
      switch (error.response.status) {
        case 401:
          if (attemptedCount < numOfAttempt) {
            // Wait 1 second
            setTimeout(() => {
              attemptedCount += 1
              const newToken = localStorage.getItem(SESSION.JWT_TOKEN)
              const newAuthHeader = newToken && appendAuthHeader ? { Authorization: 'Bearer ' + newToken } : {}

              const lastRequest = error.config
              lastRequest.headers = newAuthHeader

              return apiInstance.request(lastRequest).then((res) => {
                attemptedCount = 0
                return res
              })
            }, 1000)
          } else {
            attemptedCount = 0
            router.push({
              name: ROUTE_NAME.LOGOUT,
              params: {
                multipleLogin: true
              }
            })
          }
          break
        case 403:
          // router.push({
          //   name: ROUTE_NAME.LOGOUT,
          //   params: {
          //     multipleLogin: true
          //   }
          // })
          // console.log('do 403', error)
          // this.$store.dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
          break
        case 502:
          router.push({
            name: ROUTE_NAME.LOGOUT,
            params: {
              multipleLogin: true
            }
          })
          break
      }
    }

    throw error.response.data
  }

  apiInstance.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
  )

  return apiInstance
}
