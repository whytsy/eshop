export const hostURL = 'http://localhost:5000'
export const apiURL = hostURL + "/api"

export const TOKEN_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken'
} as const

export const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`
})

export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken)
  localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refreshToken)
}

export const removeTokens = () => {
  localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN)
  localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN)
}