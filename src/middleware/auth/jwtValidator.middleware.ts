import express from 'express'
import { UserRole } from '../../common';
import { UserEntity } from '../../database/entities';
import { ApiResHelper, tokenHelper } from '../../helpers';

const jwtValidatorBuilder = (rols: Array<UserRole>) => {
  return (req: express.Request, res: express.Response, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
      return next(ApiResHelper.UnauthorizedError());
    }
    const accessToken = authHeader.split(" ")[1]; // Bearer token

    if (!accessToken) {
      return next(ApiResHelper.UnauthorizedError());
    }
    const userData: Partial<UserEntity> = tokenHelper.validateAccessToken(accessToken);

    if (!userData) {
      return next(ApiResHelper.ForbiddenError());
    }

    if (!userData.role) {
      return next(ApiResHelper.ForbiddenError());
    }

    const isApproach = rols.some(e => e === userData.role)

    if (isApproach) {
      // @ts-ignore: error message
      req.user = userData
      next()
    }
    return next(new ApiResHelper(400, 'Permissions are not enough'));

  }
}

const jwtValidationAdminMiddleware = jwtValidatorBuilder([UserRole.ADMIN]);

const jwtValidationUserMiddleware = jwtValidatorBuilder([UserRole.ADMIN, UserRole.USER]);

const jwtValidationGhostMiddleware = jwtValidatorBuilder([UserRole.ADMIN, UserRole.USER, UserRole.GHOST]);

export {
  jwtValidationAdminMiddleware,
  jwtValidationGhostMiddleware,
  jwtValidationUserMiddleware
}