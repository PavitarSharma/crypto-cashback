import jwt from "jsonwebtoken";

class TokenService {
  async generateTokens(payload) {
    const accessToken = await jwt.sign(
      payload,
      process.env.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const refreshToken = await jwt.sign(
      payload,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}

const tokenService = new TokenService();

export default tokenService;
