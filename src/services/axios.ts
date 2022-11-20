import axios from 'axios'

const API_URL = process.env.REACT_APP_BASE_URL

const clearUserStorage = () => {
  localStorage.clear()
  window.location.reload()
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    if (error.response.status === 401) {
      return clearUserStorage()
    }
    return Promise.reject(error)
  },
)
export default api
