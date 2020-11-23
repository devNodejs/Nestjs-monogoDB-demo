import { Document } from 'mongoose'

export interface user extends Document {
  readonly firstName: String
  readonly lastName: String
  readonly email: String
  readonly mobile: String
  readonly password: String
}
