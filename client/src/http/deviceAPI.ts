import { api } from "."
import type { AllDevicesDto, AllFullDevicesDto, DeviceImageDto, FullDeviceDto } from "../types/device.types"
import { handleApiError } from "./errors/ErrorHandler"

interface InfoProps {
    title: string,
    description: string
}

interface DeviceCreationAttrs {
    name: string,
    price: number,
    quantityInStock: number,
    info: InfoProps[],
    brandId: number,
    typeId: number,
    images: FileList
}

interface DeviceUpdateAttrs {
    name: string,
    price: number,
    quantityInStock: number,
    info: InfoProps[],
    brandId: number,
    typeId: number,
    images?: FileList,
    oldImages?: DeviceImageDto[]
}

export const getDevice = async (id: number) => {
    try {
        const {data} = await api.get<FullDeviceDto>("/device/" + id)
        return data
    } catch (error) {
        return handleApiError(error)
    }
}

export const getAllDevices = async (page: number, limit=5, typeId?: number, brandId?: number, query?: string) => {
    try {
        const {data} = await api.get<AllDevicesDto>("/device/", {params: {
            page, limit, typeId, brandId, query
        }})
        return data
    } catch (error) {
        return handleApiError(error)
    }
}

export const getAllDevicesAdmin = async () => {
    try {
        const {data} = await api.get<AllFullDevicesDto>("/admin/device")
        return data
    } catch (error) {
        return handleApiError(error)
    }
}

export const createDevice = async (device: DeviceCreationAttrs) => {
    try {
        const formData = new FormData();

        formData.append("name", device.name)
        formData.append("price", `${device.price}`)
        formData.append("quantityInStock", `${device.quantityInStock}`)
        formData.append("brandId", `${device.brandId}`)
        formData.append("typeId", `${device.typeId}`)
        formData.append("info", JSON.stringify(device.info))

        Array.from(device.images).forEach(file => {
            formData.append("images", file)
        })

        const {data} = await api.post<FullDeviceDto>("/admin/device/", formData)
        return data
    } catch (error) {
        return handleApiError(error)
    }
}

export const updateDevice = async (id: number, device: DeviceUpdateAttrs) => {
    try {
        const formData = new FormData()

        formData.append("name", device.name)
        formData.append("price", `${device.price}`)
        formData.append("quantityInStock", `${device.quantityInStock}`)
        formData.append("brandId", `${device.brandId}`)
        formData.append("typeId", `${device.typeId}`)
        formData.append("info", JSON.stringify(device.info))
        formData.append("oldImages", JSON.stringify(device.oldImages))

        if (device.images) {
            Array.from(device.images).forEach(file => {
                formData.append("images", file)
            })
        }

        const {data} = await api.put<FullDeviceDto>("/admin/device/" + id, formData)
        return data
    } catch (error) {
        return handleApiError(error)
    }
}

export const deleteDevice = async (id: number) => {
    try {
        await api.delete("/admin/device/" + id)
    } catch (error) {
        return handleApiError(error)
    }
}