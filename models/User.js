import mongoose from "mongoose"
const { Schema } = mongoose

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
  }
})

const userModel = mongoose.model("Users", UserSchema)

export default userModel