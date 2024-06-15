import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

import { user } from "../../../lib/model/user";

const connectDB = process.env.NEXT_PUBLIC_DATA_BASE;

export async function POST(request) {
  await mongoose.connect(connectDB);

  try {
    const paylaod = await request.json();

    const { username, email, password, mobileno } = paylaod;

    //check if user already exists
    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new user({
      username,
      email,
      mobileno,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
