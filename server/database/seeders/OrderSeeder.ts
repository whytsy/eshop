import { Order, OrderItem, User, Device } from '../models/index';
import { sequelize } from '../db';
import logger from '../../logger/logger';
import { ordersData } from './sampleData/orders'
import { type SeederInterface } from './index';

export class OrderSeeder implements SeederInterface {
  async run() {
    logger.info('Starting OrderSeeder...');

    const transaction = await sequelize.transaction();

    try {
      const regularUsers = await User.findAll({
        where: { 
          role: 'USER' 
        },
        transaction
      });

      if (regularUsers.length === 0) {
        logger.warn('No regular users found for creating orders');
        await transaction.rollback();
        return;
      }

      const devices = await Device.findAll({
        include: ['type', 'brand'],
        transaction
      });

      if (devices.length === 0) {
        logger.warn('No devices found for creating order items');
        await transaction.rollback();
        return;
      }

      for (const orderData of ordersData) {
        const user = regularUsers.find(u => u.email === orderData.userEmail);
        if (!user) {
          logger.warn(`User ${orderData.userEmail} not found, skipping order`);
          continue;
        }

        const order = await Order.create({
          userId: user.id,
          status: orderData.status,
          deliveryAddress: orderData.deliveryAddress,
          phone: orderData.phone,
          createdAt: orderData.createdAt || new Date()
        }, { transaction });

        for (const itemData of orderData.items) {
          const device = devices.find(d => d.name === itemData.deviceName);
          
          if (!device) {
            logger.warn(`Device ${itemData.deviceName} not found, skipping item`);
            continue;
          }

          if (device.quantityInStock < itemData.quantity) {
            logger.warn(`Not enough stock for ${device.name} (need ${itemData.quantity}, have ${device.quantityInStock})`);
          }

          await OrderItem.create({
            orderId: order.id,
            deviceId: device.id,
            quantity: itemData.quantity,
            price: device.price
          }, { transaction });
        }
      }

      await transaction.commit();

      logger.info('OrderSeeder completed successfully!');

    } catch (error) {
      await transaction.rollback();
      logger.error('OrderSeeder failed:', error);
      throw error;
    }
  }
}