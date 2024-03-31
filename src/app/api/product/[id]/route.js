import mongoose from "mongoose";
import { NextResponse } from "next/server";

import { product } from "../../../../lib/model/products";

const connectDB = process.env.NEXT_PUBLIC_DATA_BASE;

export async function GET(req, content) {
  await mongoose.connect(connectDB);
  const data = await product.findOne({ _id: content.params.id });
  return NextResponse.json({ result: data }, { status: 200 });
}
