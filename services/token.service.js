import jwt from "jsonwebtoken";

class TokenService {
  async generateTokens(payload) {
    const accessToken = await jwt.sign(
      payload,
      process.env.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );

    return {
      accessToken,
    };
  }
}

const tokenService = new TokenService();

export default tokenService;
