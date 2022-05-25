import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { TokenRepository } from "../../database/repositories";
import { lifeTimeConstants } from "../../common/constants/lifeTime.constant";


dotenv.config();
class TokenHelper {
  generateTokens(payload: any) {

    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY_SALT, {
      expiresIn: process.env.ACCESS_TOKEN_LIFE_TIME || lifeTimeConstants.ACCESS_TOKEN_LIFE_TIME,
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY_SALT, {
      expiresIn: process.env.REFRESH_TOKEN_LIFE_TIME || lifeTimeConstants.REFRESH_TOKEN_LIFE_TIME,
    });

    return {
      refreshToken,
      accessToken,
    };
  }

  async saveToken(refreshToken: string, userId: string) {
    const tokenData = await TokenRepository.findOneBy({ userId });
    return TokenRepository.save({
      ...tokenData,
      refreshToken,
    });
  }
  async removeToken(refreshToken: string) {
    const response = await TokenRepository.delete({ refreshToken });
    return response;
  }

  validateAccessToken(token: string) {

    const userData = jwt.verify(token, process.env.JWT_ACCESS_KEY_SALT);
    return userData;

  }
  validateRefreshToken(token: string) {

    const userData = jwt.verify(token, process.env.JWT_REFRESH_KEY_SALT);
    return userData;

  }
}

export const tokenHelper = new TokenHelper()