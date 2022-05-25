import { Router } from "express";
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { body } from "express-validator";
import { reqValidationMiddleware, responseMiddlware } from "../middleware";
import { authService } from "../services";

export const init = () => {
  const router = Router()
  router.post(
    "/registration",
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    reqValidationMiddleware,
    (req, res, next) => authService.registration(req, res, next),
    responseMiddlware
  );
  router.post(
    "/login",
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    reqValidationMiddleware,
    (req, res, next) => authService.login(req, res, next),
    responseMiddlware
  );

  return router
}

