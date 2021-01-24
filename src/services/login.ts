import apiConfig from './api'

interface Login {
  email: string
  password: string
}

const login = {
  logar: (data: Login): Promise<void> => {
    return apiConfig.post('/auth/login', data)
  }
}

export default login
