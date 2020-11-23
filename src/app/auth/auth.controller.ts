import {
  Req,
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginUserDto } from '../user/dto/login-user.dto'
import { AuthGuard } from '@nestjs/passport'
import { emailValidation } from '../../validation/custome-validation'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // @UseGuards(AuthGuard('local'))
  @UsePipes(ValidationPipe, emailValidation)
  @Post('/login')
  async login(@Res() res, @Body() loginUserDto: LoginUserDto) {
    // return
    let lodinData = await this.authService.login(loginUserDto)
    res.status(200).send({
      code: 200,
      message: 'user login sucessfully from mongoose database :----',
      data: lodinData,
      error: [],
    })
  }
}
