import { connectToDB } from "../db";
import { BrandSeeder } from "./BrandSeeder";
import { DeviceSeeder } from "./DeviceSeeder";
import { OrderSeeder } from "./OrderSeeder";
import { TypeSeeder } from "./TypeSeeder";
import { UserSeeder } from "./UserSeeder";
import "reflect-metadata"

export interface SeederInterface {
    run(): Promise<void>
}

class SeederRunner {
    private seeders: SeederInterface[] 

    constructor() {
        const userSeeder = new UserSeeder()
        const brandSeeder = new BrandSeeder()
        const typeSeeder = new TypeSeeder()
        const deviceSeeder = new DeviceSeeder()
        const orderSeeder = new OrderSeeder()

        this.seeders = [
            userSeeder,
            brandSeeder,
            typeSeeder,
            deviceSeeder,
            orderSeeder
        ]
    }

    async runAll() {
        for(const seeder of this.seeders) {
            await seeder.run()
        }
    }
}

const start = async () => {
    await connectToDB()
    const seederRunner = new SeederRunner()
    await seederRunner.runAll()
}

start()