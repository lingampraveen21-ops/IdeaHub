import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    default: "",
  },

  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", userSchema);
