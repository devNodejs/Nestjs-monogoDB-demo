import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class createUserDTO {
  @IsString()
  @IsNotEmpty()
  readonly firstName: String

  @IsString()
  @IsNotEmpty()
  readonly lastName: String

  @IsString()
  @IsNotEmpty()
  readonly email: String

  @IsString()
  @IsNotEmpty()
  readonly mobile: String

  @IsString()
  @IsNotEmpty()
  readonly password: String
}
