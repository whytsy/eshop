import { type SeederInterface } from "./index"
import logger from "../../logger/logger"
import { Brand } from "../models/index"
import { brandsData } from "./sampleData/brands"

export class BrandSeeder implements SeederInterface {
    async run() {

        logger.info("Seeding brands...")

        await Brand.bulkCreate(brandsData, {ignoreDuplicates: true})

        logger.info("Seeded brands successfully")
    }
}