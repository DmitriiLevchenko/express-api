import { Router } from "express"
import { init as InitAuthRouter } from "./Auth.routes"
export const init = () => {
  const router = Router()
  router.use('/auth', InitAuthRouter())

  return router
}