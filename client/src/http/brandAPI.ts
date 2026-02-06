import { api } from "."
import type { BrandDto } from "../types/brand.types"
import { handleApiError } from "./errors/ErrorHandler"

export const getBrand = async (id: number) => {
    try {
        const {data} = await api.get<BrandDto>("/brand/" + id)
        return data
    } catch (error) {
        return handleApiError(error)
    }
}

export const getAllBrands = async () => {
    try {
        const {data} = await api.get<BrandDto[]>("/brand/")
        return data
    } catch (error) {
        return handleApiError(error)
    }
}

export const createBrand = async (brand: string) => {
    try {
        const {data} = await api.post<BrandDto>("/admin/brand/", {name: brand})
        return data
    } catch (error) {
        return handleApiError(error)
    }
}

export const changeBrand = async (id: number, name: string) => {
    try {
        const {data} = await api.patch("/admin/brand/" + id, {name})
        return data
    } catch (error) {
        return handleApiError(error)
    }
}

export const deleteBrand = async (id: number) => {
    try {
        const {data} = await api.delete("/admin/brand/" + id)
        return data
    } catch (error) {
        return handleApiError(error)
    }
}