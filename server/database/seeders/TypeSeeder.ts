import { type SeederInterface } from "./index"
import logger from "../../logger/logger"
import { Type } from "../models/index"
import { typesData } from "./sampleData/types"

export class TypeSeeder implements SeederInterface {
    async run() {

        logger.info("Seeding types...")

        await Type.bulkCreate(typesData, {ignoreDuplicates: true})

        logger.info("Seeded types successfully")
    }
}