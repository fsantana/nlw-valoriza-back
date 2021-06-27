import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../../repositories/UsersRepositories"
import appConfig from "../../config/AppConfig"

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({email, password} : IAuthenticateRequest)
  {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({ email });

    if (!user || !compare(password, user.password)) {
      throw new Error("Email/Password incorrect");
    }

    const token = sign({
      email: user.email
    }, appConfig.jwtSalt,
      {
        subject: user.id,
        expiresIn: "1d"
      })
    return token;
  }
}

export { AuthenticateUserService }