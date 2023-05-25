import mongoose from "mongoose";
import bcrypt from "bcrypt";

/* User의 형식(Schema) */
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  location: String,
});

/* Middleware : Password Encrypt when Create Account */
userSchema.pre("save", async function () {
  console.log("Users Password:", this.password);
  this.password = await bcrypt.hash(this.password, 5);
  console.log("Hashed Password:", this.password);
});

/* Middleware : Unique Check */

/* User Model */
const User = mongoose.model("User", userSchema);

export default User;
