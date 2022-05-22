import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from 'dotenv'
dotenv.config();

export const AppDataSource = new DataSource({
    // @ts-ignore: error message
    type: process.env.dbType,
    host: process.env.dbHost,
    // @ts-ignore: error message
    port: process.env.dbPort,
    username: process.env.dbUsername,
    password: process.env.dbPassword,
    database: process.env.dbDatabase,
    synchronize: false,
    logging: false,
    entities: [__dirname + '/entities/**/*.ts'],
    migrations: [__dirname + '/migrations/**/*.ts'],
    subscribers: [],
    migrationsDir: "migration",
})
