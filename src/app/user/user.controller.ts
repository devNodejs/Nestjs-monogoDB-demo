import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  Query,
  NotFoundException,
  Delete,
  Param,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFiles,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { UserService } from './user.service'
import { createUserDTO } from './dto/create-user.dto'
import { AuthGuard } from '../../shared/auth.guard'
import { FilesInterceptor } from '@nestjs/platform-express'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // ####################------MONGOOSE--------CRUD-------############################################

  @Post('/signup')
  @UsePipes(ValidationPipe)
  async userSignup(
    @Res() res,
    @Body() createUserDT: createUserDTO,
    // Message: Message,
  ) {
    // return
    const user = await this.userService.userSignup(createUserDT)
    // console.log('Message :>> ', Message)
    // return
    res.status(201).send({
      code: 201,
      // message: Message.infoMessage.signupUser,
      // message: Custom_Msg.Message.infoMessage.signupUser,
      message : 'User has been created successfully',
      data: user,
      error: [],
    })
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post('/viewUserDetails')
  async getUserDetail(@Res() res, @Body() createUserDTO: createUserDTO) {
    // console.log("userId :----", createUserDTO);
    // return
    const user = await this.userService.getUserDetail(createUserDTO)
    res.status(200).send({
      code: 200,
      // message: Custom_Msg.Message.infoMessage.getUsers,
      message : 'Get Users successfully',
      data: user,
      error: [],
    })
  }

  // @UseGuards(new AuthGuard())
  @Post('/getAlluserDetails')
  async getAllUserDetails(@Res() res) {
    const allUserDetails = await this.userService.getAllUserDetails()
    res.status(200).send({
      code: 200,
      // message: Custom_Msg.Message.infoMessage.getDetails,
      message: 'Get details successfully',
      data: allUserDetails,
      error: [],
    })
  }

  @Post('/updateUserDetail')
  async updateUserDetail(@Res() res, @Body() createUserDTO: createUserDTO) {
    // return
    const userInformation = await this.userService.updateUserDetail(
      createUserDTO,
    )
    // // console.log('userInformation :>> ', userInformation);
    res.status(200).send({
      code: 200,
      // message: Custom_Msg.Message.infoMessage.editUser,
      message : 'User Update successfully.',
      data: userInformation,
      error: [],
    })
  }
}
