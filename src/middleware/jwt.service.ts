import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtMiddlewareService {
  constructor(public jwtService: JwtService) {}
}
