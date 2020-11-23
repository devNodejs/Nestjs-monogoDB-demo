import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { user } from './interfaces/user.interface'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<user>) {}

  // ####################------MONGOOSE--------CRUD-------############################################

  async userSignup(createUserDTO): Promise<user> {
    // req.password = await bcrypt.hash(req.password, 10);
    createUserDTO.password = await bcrypt.hash(createUserDTO.password, 10)
    const user = await this.userModel(createUserDTO)
    return user.save()
  }

  async userFindForLogin(loginData): Promise<user> {
    // console.log("loginData :----",loginData);
    const data = await this.userModel.findOne({ email: loginData.email }).exec()
    // console.log("data res :---",data);
    // return
    if (data && bcrypt.compareSync(loginData.password, data.password)) {
      return data
    } else {
      throw new UnauthorizedException()
    }
  }

  async getUserDetail(userId): Promise<user> {
    const user = await this.userModel.findById(userId).exec()
    return user
  }

  async getAllUserDetails(): Promise<user[]> {
    const users = await this.userModel.find().exec()
    return users
  }

  async updateUserDetail(createUserDTO): Promise<user> {
    let id = createUserDTO._id
    const updateUserInformation = await this.userModel
      .findByIdAndUpdate(id, createUserDTO, { new: true })
      .exec()
    return updateUserInformation
  }
}
