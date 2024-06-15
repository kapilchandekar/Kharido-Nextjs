import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

import { user } from "../../../lib/model/user";

const connectDB = process.env.NEXT_PUBLIC_DATA_BASE;

export async function POST(request) {
  const paylaod = await request.json();
  const { userId, oldPassword, newPassword } = paylaod;

  try {
    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        {
          error: "Bad Request",
          message: "Please enter both old password and new password",
        },
        { status: 400 }
      );
    }
    await mongoose.connect(connectDB);

    let existingUser = await user.findOne({ _id: userId });

    if (!existingUser) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 400 }
      );
    }

    const validPassword = await bcryptjs.compare(oldPassword, existingUser.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Old password is not correct" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedNewPassword = await bcryptjs.hash(newPassword, salt);
    existingUser.password = hashedNewPassword;
    await existingUser.save();
    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
