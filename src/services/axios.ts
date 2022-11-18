import axios from 'axios'

const API_URL = process.env.REACT_APP_BASE_URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Ocorreu um erro.'),
)

export default api
