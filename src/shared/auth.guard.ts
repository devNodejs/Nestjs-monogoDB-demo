import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Next,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    if (!request.headers.authorization) {
      return false
    }
    let data = await this.validateToken(request.headers.authorization)
    console.log('data :--', data)
    return true
  }

  async validateToken(token: String): Promise<boolean> {
    const exe = token.split(' ')
    if (!exe) {
      throw new UnauthorizedException()
    }
    jwt.verify(exe[1], 'santosh', (err, result) => {
      if (err) {
        console.log('err:-------', err)
        throw new HttpException(err, HttpStatus.UNAUTHORIZED)
      }
    })
    return true
  }
}
