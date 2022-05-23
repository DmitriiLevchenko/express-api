import express from "express";
import dotenv from 'dotenv'
import { AppDataSource } from "./database/data-source";
dotenv.config();

const app = express()
const PORT = process.env.port || 3000
app.use('/api',)
app.use(express.json())
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

