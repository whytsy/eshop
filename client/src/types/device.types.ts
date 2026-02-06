import type { BrandDto } from "./brand.types"
import type { TypeDto } from "./type.types"

interface DeviceImageDto {
    id: number
    imageUrl: string
    isMain: boolean
    orderIndex: number
}

interface DeviceInfoDto {
    id: number
    title: string
    description: string
}

interface DeviceDto {
    id: number
    name: string
    price: number
    type: TypeDto
    brand: BrandDto
    quantityInStock: number
    images: DeviceImageDto[]
    info?: DeviceInfoDto[]
}

interface AllDevicesDto {
    rows: DeviceDto[]
    count: number
}

interface FullDeviceDto extends DeviceDto {
    info: DeviceInfoDto[]
}

interface AllFullDevicesDto extends AllDevicesDto {
    rows: FullDeviceDto[]
}

interface DeviceCartDto extends DeviceDto {
    amount: number
}

export type {
    DeviceImageDto,
    DeviceInfoDto,
    DeviceDto,
    AllDevicesDto,
    FullDeviceDto,
    AllFullDevicesDto,
    DeviceCartDto
}