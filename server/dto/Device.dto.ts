import { type DeviceInstance } from "../database/models/Device.model"
import { BrandDto } from "./Brand.dto"
import { DeviceImageDto } from "./DeviceImage.dto"
import { DeviceInfoDto } from "./DeviceInfo.dto"
import { TypeDto } from "./Type.dto"

export class DeviceDto {
    id: number
    name: string
    price: number
    quantityInStock: number
    type?: TypeDto
    brand?: BrandDto
    images?: DeviceImageDto[]
    info?: DeviceInfoDto[]
    amount?: number
    
    constructor(device: DeviceInstance) {
        this.id = device.id
        this.name = device.name
        this.price = device.price
        this.quantityInStock = device.quantityInStock

        if (device.type) this.type = new TypeDto(device.type)
        
        if (device.brand) this.brand = new BrandDto(device.brand)

        if (device.device_images) {
            this.images = device.device_images.map(deviceImage =>
                new DeviceImageDto(deviceImage)
            )
        }

        if (device.device_infos) {
            this.info = device.device_infos.map(deviceInfo => 
                new DeviceInfoDto(deviceInfo)
            )
        }

        if (device.basket_device) {
            this.amount = device.basket_device.amount
        }
    }
}