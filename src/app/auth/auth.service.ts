import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { LoginUserDto } from '../user/dto/login-user.dto'
import { UserService } from '../user/user.service'
import { JwtPayload } from './interface/jwt-payload.interface'
import { user } from '../user/interfaces/user.interface'
import { JwtStrategy } from './strategies/jwt.strategy'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async createJwtPayload(user) {
    let data: JwtPayload = {
      email: user.email,
      id: user._id,
    }

    let jwt = this.jwtService.sign(data)
    return {
      expiresIn: 3600,
      token: 'JWT ' + jwt,
    }
  }

  async login(loginData) {
    let user = await this.userService.userFindForLogin(loginData)
    if (user) {
      return {
        token: await this.createJwtPayload(user),
        user: user,
      }
    } else {
      throw new UnauthorizedException()
    }
  }
}
