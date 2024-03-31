import mongoose from "mongoose";
import { NextResponse } from "next/server";

import { product } from "../../../lib/model/products";

const connectDB = process.env.NEXT_PUBLIC_DATA_BASE;
export async function POST(request) {
  await mongoose.connect(connectDB);

  const paylaod = await request.json();
  let products = [];
  products = new product(paylaod);
  let result = await products.save();
  return NextResponse.json(
    {
      message: "product successfully added",
      result: result,
    },
    { status: 200 }
  );
}
