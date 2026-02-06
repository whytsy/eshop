import { sequelize } from "../db";
import initActivated from "./Activated.model";
import initBasket from "./Basket.model";
import initBasketDevice from "./BasketDevice.model";
import initBrand from "./Brand.model";
import initDevice from "./Device.model";
import initDeviceImage from "./DeviceImage.model";
import initDeviceInfo from "./DeviceInfo.model";
import initEmailChangeRequest from "./EmailChangeRequest.model";
import initOrder from "./Order.model";
import initOrderItem from "./OrderItem.model";
import initToken from "./Token.model";
import initType from "./Type.model";
import initUser from "./User.model";
import initUserRecover from "./UserRecover.model";

const EmailChangeRequest = initEmailChangeRequest(sequelize)
const User = initUser(sequelize)
const Token = initToken(sequelize)
const Activated = initActivated(sequelize)
const UserRecover = initUserRecover(sequelize)
const Basket = initBasket(sequelize)
const BasketDevice = initBasketDevice(sequelize)
const Device = initDevice(sequelize)
const DeviceImage = initDeviceImage(sequelize)
const DeviceInfo = initDeviceInfo(sequelize)
const Type = initType(sequelize)
const Brand = initBrand(sequelize)
const Order = initOrder(sequelize)
const OrderItem = initOrderItem(sequelize)

User.hasOne(EmailChangeRequest, {
    foreignKey: "userId",
    onDelete: "CASCADE"
})
EmailChangeRequest.belongsTo(User, {
    foreignKey: "userId"
})

User.hasOne(Token, {
    foreignKey: "userId",
    onDelete: "CASCADE"
})
Token.belongsTo(User, {
    foreignKey: "userId"
})

User.hasOne(Activated, {
    foreignKey: "userId",
    onDelete: "CASCADE"
})
Activated.belongsTo(User, {
    foreignKey: "userId"
})

User.hasOne(UserRecover, {
    foreignKey: "userId",
    onDelete: "CASCADE"
})
UserRecover.belongsTo(User, {
    foreignKey: "userId"
})

User.hasOne(Basket, {
    foreignKey: "userId",
    onDelete: "CASCADE"
})
Basket.belongsTo(User, {
    foreignKey: "userId"
})

Basket.belongsToMany(Device, {
    through: BasketDevice,
    foreignKey: "basketId",
    otherKey: "deviceId",
    onDelete: "CASCADE"
})

Device.belongsToMany(Basket, {
    through: BasketDevice,
    foreignKey: "deviceId",
    otherKey: "basketId",
    onDelete: "CASCADE"
})

BasketDevice.belongsTo(Basket, {
    foreignKey: 'basketId',
    onDelete: 'CASCADE'
});

BasketDevice.belongsTo(Device, {
    foreignKey: 'deviceId',
    onDelete: 'CASCADE'
});

Type.hasMany(Device, {
    foreignKey: 'typeId',
    onDelete: 'RESTRICT'
})
Device.belongsTo(Type, {
    foreignKey: "typeId"
})

Brand.hasMany(Device, {
    foreignKey: "brandId",
    onDelete: "RESTRICT"
})
Device.belongsTo(Brand, {
    foreignKey: "brandId"
})

Device.hasMany(DeviceInfo, {
    foreignKey: "deviceId",
    onDelete: "CASCADE"
})
DeviceInfo.belongsTo(Device, {
    foreignKey: "deviceId"
})

Device.hasMany(DeviceImage, {
    foreignKey: "deviceId",
    onDelete: "CASCADE"
})
DeviceImage.belongsTo(Device, {
    foreignKey: "deviceId"
})

Order.hasMany(OrderItem, {
    foreignKey: "orderId",
    onDelete: "CASCADE"
})
OrderItem.belongsTo(Order, {
    foreignKey: "orderId"
})

User.hasMany(Order, {
    foreignKey: "userId"
})
Order.belongsTo(User, {
    foreignKey: "userId"
})

Device.hasMany(OrderItem, {
    foreignKey: "deviceId"
})
OrderItem.belongsTo(Device, {
    foreignKey: "deviceId"
})

export {
    EmailChangeRequest,
    User,
    Token,
    Activated,
    UserRecover,
    Basket,
    BasketDevice,
    Device,
    DeviceImage,
    DeviceInfo,
    Type,
    Brand,
    Order,
    OrderItem
}