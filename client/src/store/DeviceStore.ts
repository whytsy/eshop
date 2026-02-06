import { makeAutoObservable } from "mobx"
import type { TypeDto } from "../types/type.types"
import type { BrandDto } from "../types/brand.types"
import type { DeviceDto, DeviceImageDto, DeviceInfoDto } from "../types/device.types"

export class DeviceStore {
    private _types: TypeDto[]
    private _brands: BrandDto[]
    private _devices: DeviceDto[]
    private _selectedType: TypeDto | null
    private _selectedBrand: BrandDto | null
    private _page: number
    private _totalCount: number
    private _limit: number
    private _info?: DeviceInfoDto[]
    private _images?: DeviceImageDto[]
    private _query?: string

    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._selectedType = null
        this._selectedBrand = null
        this._page = 1
        this._totalCount = 1
        this._limit = 6
        this._info = []
        this._images = []
        makeAutoObservable(this)
    }

    setTypes(types: TypeDto[]) {
        this._types = types
    }
    setBrands(brands: BrandDto[]) {
        this._brands = brands
    }
    setDevices(devices: DeviceDto[]) {
        this._devices = devices
    }

    setSelectedType(type: TypeDto | null) {
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBrand(brand: BrandDto | null) {
        this.setPage(1)
        this._selectedBrand = brand
    }
    setPage(page: number) {
        this._page = page
    }
    setTotalCount(count: number) {
        this._totalCount = count
    }
    setLimit(limit: number) {
        this._limit = limit
    }
    setInfo(info: DeviceInfoDto[]) {
        this._info = info
    }
    setImages(images: DeviceImageDto[]) {
        this._images = images
    }

    setQuery(query: string | undefined) {
        this._query = query
    }

    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
    get info() {
        return this._info
    }
    get images() {
        return this._images
    }

    get query() {
        return this._query
    }

    getBrandNameById(id: number) {
        return this._brands.find(brand => brand.id === id)?.name
    }

    getTypeNameById(id: number) {
        return this._types.find(type => type.id === id)?.name
    }

    getDeviceById(id: number) {
        return this._devices.find(device => device.id === id)
    }

    deleteType(id: number) {
        this._types = this._types.filter(type => type.id !== id)
    }

    deleteBrand(id: number) {
        this._brands = this._brands.filter(brand => brand.id !== id)
    }

    deleteDevice(id: number) {
        this._devices = this._devices.filter(device => device.id !== id)
    }
}

export const deviceStore = new DeviceStore()