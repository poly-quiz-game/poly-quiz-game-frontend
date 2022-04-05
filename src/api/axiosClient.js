import { message } from 'antd'
import axios from 'axios'

export const baseURL = process.env.ENDPOINT ? `${process.env.ENDPOINT}/api` : 'http://localhost:3005/api'

const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export const getToken = () => {
  return localStorage.getItem('access_token')
}

export const authHeader = () => ({
  Authorization: `Bearer ${getToken()}`,
})

axiosClient.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    console.log(error)
    const { status } = error.toJSON()
    if (status === 401) {
      // return console.log("401");
      return (location.href = '/auth/login')
    }

    if (status === 400) {
      if (error.response.data.error === "This user doesn't exist") {
        return (location.href = '/auth/regist')
      }
      if (error.response.data.error === 'Your account is locked') {
        const error = () => {
          message.error(`Tài khoản của bạn đã bị khóa, hay liên hệ admin để mở khóa`)
        }
        error()
      }
    }
    return Promise.reject(error)
  }
)

export default axiosClient
