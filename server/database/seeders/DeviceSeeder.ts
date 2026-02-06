import { Device, DeviceImage, DeviceInfo, Brand, Type } from '../models/index';
import { sequelize } from '../db';
import path from 'path';
import fs from 'fs';
import logger from '../../logger/logger';
import { devicesData } from './sampleData/devices';
import { type SeederInterface } from './index';

export class DeviceSeeder implements SeederInterface {
  private IMAGES_BASE_PATH: string
  private STATIC_PATH: string
  private DEFAULT_IMAGE: string

  constructor() {
    this.IMAGES_BASE_PATH = path.resolve(process.cwd(), 'database', 'seeders', 'sampleData', 'deviceImages')
    this.STATIC_PATH = path.resolve(process.cwd(), 'static', 'devices')
    this.DEFAULT_IMAGE = 'default.png'

    logger.info(this.IMAGES_BASE_PATH)
    logger.info(this.STATIC_PATH)
  }
    
  async run() {
    logger.info('Starting DeviceSeeder...');

    const transaction = await sequelize.transaction();

    try {

      for (const deviceData of devicesData) {
        const existingDevice = await Device.findOne({
          where: { name: deviceData.name },
          transaction
        });

        if (existingDevice) {
          logger.warn(`Device "${deviceData.name}" already exists, skipping...`);
          continue;
        }

        const brand = await Brand.findOne({
          where: { name: deviceData.brand },
          transaction
        });

        const type = await Type.findOne({
          where: { name: deviceData.type },
          transaction
        });

        if (!brand || !type) {
          logger.error(`Brand "${deviceData.brand}" or Type "${deviceData.type}" not found`);
          continue;
        }

        const device = await Device.create({
          name: deviceData.name,
          price: deviceData.price,
          brandId: brand.id,
          typeId: type.id,
          quantityInStock: deviceData.quantityInStock
        }, { transaction });

        for (const [index, info] of deviceData.info.entries()) {
          await DeviceInfo.create({
            deviceId: device.id,
            title: info.title,
            description: info.description
          }, { transaction });
        }

        const imageUrls = await this.getDeviceImageUrls(deviceData.brand, deviceData.imagesFolder || deviceData.name, device.id);
        
        for (const [index, imageUrl] of imageUrls.entries()) {
          await DeviceImage.create({
            deviceId: device.id,
            imageUrl,
            isMain: index === 0,
            orderIndex: index
          }, { transaction });
        }
      }

      await transaction.commit();

    } catch (error) {
      await transaction.rollback();
      logger.error('DeviceSeeder failed:', error);
      throw error;
    }
  }

  private async getDeviceImageUrls(brandFolder: string, modelFolder: string, deviceId: number) {
    const destPath = path.resolve(this.STATIC_PATH, deviceId.toString())

    try {
        const imagePath = path.join(this.IMAGES_BASE_PATH, brandFolder, modelFolder);
        
        if (!fs.existsSync(imagePath)) {
            logger.warn(`Images folder not found: ${imagePath}, using default`);
            return this.getDefaultImages(destPath);
        }

        const imageUrls = fs.readdirSync(imagePath)
            .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
            .sort()
            .map(file => `/static/devices/${deviceId}/${file}`);
        
        if (imageUrls.length > 0) {
            const sourcePath = path.resolve(this.IMAGES_BASE_PATH, brandFolder, modelFolder)
            fs.cpSync(sourcePath, destPath, {recursive: true})

            return imageUrls
        }

        return this.getDefaultImages(imagePath)
        
    } catch (error) {
      logger.warn(`Error reading images for ${brandFolder}/${modelFolder}:`, error);
      return this.getDefaultImages(destPath);
    }
  }

  private getDefaultImages(sourcePath: string) {
    return [`${sourcePath}/${this.DEFAULT_IMAGE}`];
  }
}