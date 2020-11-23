import * as mongoose from 'mongoose'
import * as mongooseTimestamp from 'mongoose-timestamp'

export const UserModel = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mobile: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}).plugin(mongooseTimestamp)
