import mongoose from "mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import { user } from "../../../lib/model/user";

const connectDB = process.env.NEXT_PUBLIC_DATA_BASE;
const jwt_key = process.env.JWT_SECRET;

export async function POST(request) {
  await mongoose.connect(connectDB);
  try {
    const paylaod = await request.json();
    const { email, password } = paylaod;

    //check if user exists
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    //check if password is correct
    const validPassword = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    //create token data
    const tokenData = {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
    };
    //create token
    const token = await jwt.sign(tokenData, jwt_key, { expiresIn: "24hr" });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
