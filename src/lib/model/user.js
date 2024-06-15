import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: [true, "Please provide a username"] },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: true,
    },
    mobileno: {
      type: Number,
      required: [true, "Please provide a mobile no"],
    },
    password: {
      type: String,
      required: [true, "[Please provide a password"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "[Please provide a password"],
      unique: true,
    },
   

    resetOtp: Number,
    resetOtpExpiry: Date,
  },
  { timestamps: true }
);

export const user =
  mongoose.models.users || mongoose.model("users", userSchema);
