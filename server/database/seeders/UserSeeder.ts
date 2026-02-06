import bcrypt from "bcryptjs";
import { Activated, Basket, User } from "../models/index";
import { type ROLE, ROLES } from "../../middleware/roleMiddleware";
import logger from "../../logger/logger";
import * as uuid from 'uuid'
import { sequelize } from "../db";
import { usersData } from "./sampleData/users";
import { type SeederInterface } from "./index";

export class UserSeeder implements SeederInterface {
    async run() {

        logger.info("Seeding users")

        for (const userData of usersData) {
            try {
                await this.createUser(userData)
            } catch (error) {
                logger.error("Failed to create user", userData.email, error)
                throw error
            }
        }

        await User.bulkCreate(usersData, {ignoreDuplicates: true})
    
        logger.info(`Seeded users successfully`)
    }

    private async createUser(user: {
        email: string,
        password: string,
        role?: ROLE
    }) {
        try {

            const existingUser = await User.findOne({where: {email: user.email}})

            if (existingUser) {
                return logger.warn(`User ${user.email} already exists, skipping...`)
            }

            const hashPassword = await bcrypt.hash(user.password, 7)
            const activationLink = uuid.v4()

            await sequelize.transaction(async (transaction) => {
                const createdUser = await User.create({
                    email: user.email,
                    password: hashPassword,
                    role: user.role || ROLES.USER
                }, {transaction})

                await Activated.create({
                    userId: createdUser.id,
                    activated: true,
                    activationLink
                }, {transaction})

                await Basket.create({
                    userId: createdUser.id
                }, {transaction})
            })
        } catch (error) {
            logger.error(`Failed to create user ${user.email}:`, error)
        }
    }
}