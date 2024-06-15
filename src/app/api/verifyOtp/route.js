import { user } from "@/lib/model/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const connectDB = process.env.NEXT_PUBLIC_DATA_BASE;

export async function POST(request) {
  await mongoose.connect(connectDB);

  const payload = await request.json();
  const { otp } = payload;
  try {
    let otpUserExisting = await user.findOne({
      resetOtp: otp,
      resetOtpExpiry: { $gt: Date.now() },
    });

    if (!otpUserExisting) {
      return NextResponse.json({ message: "Invalid Otp" }, { status: 500 });
    }
    otpUserExisting.resetOtp = undefined;
    otpUserExisting.resetOtpExpiry = undefined;
    const verfiedOtpUser = await otpUserExisting.save();

    return NextResponse.json({ message: "Otp Verified", userId: verfiedOtpUser. _id  }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
