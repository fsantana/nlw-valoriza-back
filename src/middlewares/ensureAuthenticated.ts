import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import appConfig from "../config/AppConfig"
interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

  try {
    const authToken = request.headers.authorization;
    if (!authToken) {
      throw new Error("Token missing");
    }

    const [, token] = authToken.split(" ");
    const { sub } = verify(token, appConfig.jwtSalt) as IPayload;
    request.user_id = sub;
    return next();

  } catch (err) {
    return response.status(401).end();
  }

}