import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { sendEmail } from "@/helper/mailer";
import { user } from "@/lib/model/user";

const connectDB = process.env.NEXT_PUBLIC_DATA_BASE;

export async function POST(request) {
  await mongoose.connect(connectDB);

  const payload = await request.json();
  const { email } = payload;
  try {
    const generateOtp = Math.floor(1000 + Math.random() * 9000); // Generate a random number between 1000 and 9999
    const otpString = generateOtp.toString().padStart(4, "0"); // Ensure the OTP is 4 digits by padding with leading zeros if necessary
    const User = await user.findOneAndUpdate(
      { email }, // Assuming email is the field to search for
      {
        resetOtp: otpString,
        resetOtpExpiry: Date.now() + 3600000,
      },
      { new: true } // To return the updated document
    );

    sendEmail(email, generateOtp);

    if (!User) {
      return NextResponse.json(
        {
          error: "User Not Found",
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        message: "Otp sent successfully",
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
