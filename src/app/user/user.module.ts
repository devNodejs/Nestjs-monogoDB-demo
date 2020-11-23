import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { UserModel } from './model/user.model'
import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserModel }]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
