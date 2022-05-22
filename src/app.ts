import express from "express";
import dotenv from 'dotenv'
import { User } from "./database/entities";
import { AppDataSource } from "./database/data-source";


dotenv.config();
const app = express()


AppDataSource.initialize().then(async () => {

  /*console.log("Inserting a new user into the database...")
  const user = new User()
  user.firstName = "Timber"
  user.lastName = "Saw"
  await AppDataSource.manager.save(user)
  console.log("Saved a new user with id: " + user.id)

  console.log("Loading users from the database...")
  const users = await AppDataSource.manager.find(User)
  console.log("Loaded users: ", users)

  console.log("Here you can setup and run express / fastify / any other framework.")*/

}).catch((error: any) => console.log(error))

app.get('/', (req, res) => {
  res.send('Hi')
})
const init = () => {
  AppDataSource.initialize()
    .then(() => {
      app.listen(3000)

    })
    .catch((error: any) => console.log(error))
}

