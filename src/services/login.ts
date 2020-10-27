import apiConfig from './api'

interface Login {
  email: string
  password: string
}

const login = {
  logar: (data: Login) => {
    return apiConfig.post('login', data)
  }
}

export default login
