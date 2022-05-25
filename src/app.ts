import express from "express";
import dotenv from 'dotenv'
import { AppDataSource } from "./database/data-source";
import { init as ApiInit } from './routes'
import { responseMiddlware } from "./middleware";
dotenv.config();

const app = express()
const PORT = process.env.port || 3000
app.use(express.json())
app.use('/api', ApiInit())
app.use(responseMiddlware)
console.log("server started")
const init = () => {
  AppDataSource.initialize()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`server started in port ${PORT}`)
      })

    })
    .catch((error: any) => console.log("AppDataSource initialize error", error))
}

init()

