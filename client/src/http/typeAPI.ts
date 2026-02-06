import { api } from "."
import type { TypeDto } from "../types/type.types"
import { handleApiError } from "./errors/ErrorHandler"

export const getType = async (id: number) => {
    try {
        const {data} = await api.get<TypeDto>("/type/" + id)
        return data
    } catch (error) {
        return handleApiError(error)
    }
    
}

export const getAllTypes = async () => {
    try {
        const {data} = await api.get<TypeDto[]>("/type/")
        return data
    } catch (error) {
        return handleApiError(error)
    }
    
}

export const createType = async (type: string) => {
    try {
        const {data} = await api.post<TypeDto>("/admin/type/", {name: type})
        return data
    } catch (error) {
        return handleApiError(error)
    }
}

export const changeType = async (id: number, name: string) => {
    try {
        const {data} = await api.patch<TypeDto>("/admin/type/" + id, {name})
        return data
    } catch (error) {
        return handleApiError(error)
    }
}

export const deleteType = async (id: number) => {
    try {
        await api.delete("/admin/type/" + id)
    } catch (error) {
        return handleApiError(error)
    }
}