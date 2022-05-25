import express from 'express'
import { ServerErrEnum, UserRole } from '../common';
import { cookieNameConstants } from "../common/constants";
import { lifeTimeConstants } from "../common/constants/lifeTime.constant";
import { UserEntity } from '../database/entities';
import { UserRepository } from '../database/repositories';
import { ApiResHelper, hashPassword, tokenHelper } from '../helpers';
import bcrypt from 'bcrypt'

export class AuthService {
  constructor() {

  }
  async registration(req: express.Request, res: express.Response, next) {
    try {
      const { email, password } = req.body

      //check is user already exists
      const candidate = await UserRepository.findOneBy({ email })

      if (candidate) {
        throw ApiResHelper.BadRequest(ServerErrEnum.USER_WITH_SAME_EMAIL_EXISTS)
      }

      const hashedPassword = hashPassword(password)

      const user: Partial<UserEntity> = await UserRepository.save({
        email,
        password: hashedPassword,
        role: UserRole.USER
      })


      const { accessToken, refreshToken } = await this.generateTokens(user)
      res.cookie(cookieNameConstants.REFRESH_TOKEN, refreshToken, {
        maxAge: lifeTimeConstants.COOKIE_LIFE_TIME,
        httpOnly: true,
      });

      // @ts-ignore: error message
      res.data = {
        user,
        accessToken
      };
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async login(req: express.Request, res: express.Response, next) {
    try {
      const { email, password } = req.body

      //check is user already exists
      const user: UserEntity = await UserRepository.findOneBy({ email })

      if (!user) {
        throw ApiResHelper.BadRequest(ServerErrEnum.USER_DOESNT_EXISTS)
      }

      const isEqualPasswords = await bcrypt.compare(password, user.password);
      if (!isEqualPasswords) {
        throw ApiResHelper.BadRequest(ServerErrEnum.USER_DOESNT_EXISTS)
      }
      const { accessToken, refreshToken } = await this.generateTokens(user)
      res.cookie(cookieNameConstants.REFRESH_TOKEN, refreshToken, {
        maxAge: lifeTimeConstants.COOKIE_LIFE_TIME,
        httpOnly: true,
      });

      // @ts-ignore: error message
      res.data = {
        user,
        accessToken
      };
      return next();
    } catch (err) {
      return next(err);
    }
  }

  protected async generateTokens(payload: Partial<UserEntity>) {
    const { accessToken, refreshToken } = tokenHelper.generateTokens({
      email: payload.email,
      role: payload.role,
      id: payload.id
    })

    await tokenHelper.saveToken(refreshToken, payload.id)

    return { accessToken, refreshToken }
  }
}