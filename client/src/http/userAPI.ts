import { api } from './index'
import { removeTokens, setTokens, TOKEN_KEYS } from './helper'
import type { Roles } from '../store/UserStore'
import type { DeviceCartDto } from '../types/device.types'
import type { UserDto, UserWithTokensDto } from '../types/user.types'
import { handleApiError } from './errors/ErrorHandler'

export const registration = async (email: string, password: string) => {
    try {
        const {data} = await api.post<UserDto>('/user/registration', {email, password})
        return data
    } catch (error) {
        return handleApiError(error)
    }
    
}

export const login = async (email: string, password: string) => {
    try {
        const {data} = await api.post<UserWithTokensDto>('/user/login', {email, password})
        setTokens(data.accessToken, data.refreshToken)
        return data
    } catch (error) {
        return handleApiError(error)
    }
}

export const check = async () => {
    try {
        const {data} = await api.get<UserDto>('/user/auth')

        return data
    } catch (error) {
        return handleApiError(error)
    }
}

export const activateProfile = async (activationLink: string) => {
    try {
        await api.get('/user/activate/' + activationLink)
    } catch (error) {
        return handleApiError(error)
    }
}

export const sendRecoverEmail = async (email: string) => {
    try {
        await api.post('/user/recover', {email})
    } catch (error) {
        return handleApiError(error)
    }
}

export const changePassword = async (link: string, password: string) => {
    try {
        await api.post('/user/recover/' + link, {password})
    } catch (error) {
        return handleApiError(error)
    }
}

export const addToCart = async (deviceId: number) => {
    try {
        await api.post("/user/cart/items/" + deviceId)
    } catch (error) {
        return handleApiError(error)
    }
}

export const getCart = async () => {
    try {
        const {data} = await api.get<DeviceCartDto[]>("/user/cart")
        return {data}
    } catch (error) {
        return handleApiError(error)
    }
}

export const changeCartItemAmount = async (deviceId: number, amount: number) => {
    try {
        await api.patch(`/user/cart/items/${deviceId}/amount`, {amount})
    } catch (error) {
        return handleApiError(error)
    }
}

export const deleteItemFromCart = async (deviceId: number) => {
    try {
        await api.delete('/user/cart/items/' + deviceId)
    } catch (error) {
        return handleApiError(error)
    }
}

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN)
    if (!refreshToken) {
        return null
    }
    
    const {data} = await api.post('/user/refresh', {refreshToken})

    setTokens(data.accessToken, data.refreshToken)
    
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken
    }
  } catch (error) {
   removeTokens()
   return null
  }
}

export const getAllUsers = async () => {
    try {
        const {data} = await api.get<UserDto[]>('/admin/users')

        return data
    } catch (error) {
        return handleApiError(error)
    }
}

export const setUserRole = async (id: number, role: Roles) => {
    try {
        await api.patch(`/admin/users/${id}/role`, {role})
    } catch (error) {
        return handleApiError(error)
    }
}

export const searchUser = async (query: string) => {
    try {
        const {data} = await api.get<UserDto[]>('/admin/users/' + query)

        return data
    } catch (error) {
        return handleApiError(error)
    }
}

interface ChangeEmailResponse {
    message: string
    expiresAt?: Date
}

export const changeEmail = async (newEmail: string) => {
    try {
        const {data} = await api.post<ChangeEmailResponse>('/user/email', {newEmail})

        return data
    } catch (error) {
        return handleApiError(error)
    }
}

export const sendEmailCode = async (code: string) => {
    try {
        const {data} = await api.post<ChangeEmailResponse>('/user/email/code', {code})

        return data
    } catch (error) {
        return handleApiError(error)
    }
}

export const confirmEmail = async (link: string) => {
    try {
        const {data} = await api.patch<ChangeEmailResponse>('/user/email/' + link)

        return data
    } catch (error) {
        return handleApiError(error)
    }
}