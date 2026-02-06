import { makeAutoObservable } from "mobx"
import type { DeviceCartDto } from "../types/device.types"

export class CartStore {
    private _devices: DeviceCartDto[]

    constructor() {
        this._devices = []
        makeAutoObservable(this)
    }

    get devices() {
        return this._devices
    }

    addDevice(device: DeviceCartDto) {
        this._devices.push(device)
    }

    setDevices(devices: DeviceCartDto[]) {
        this._devices = devices
    }

    deleteDevice(deviceId: number) {
        this._devices = this._devices.filter(device => device.id !== deviceId)
    }

    clearCart() {
        this._devices = []
    }
}