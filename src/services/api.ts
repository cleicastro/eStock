import axios from 'axios'

const apiConfig = axios.create({
  // baseURL: 'http://api.ryatec.com.br/estock/v1/',
  baseURL: 'https://estock.webcrp.com/api/estock/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default apiConfig
