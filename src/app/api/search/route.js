import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { product } from "../../../lib/model/products";

const connectDB = process.env.NEXT_PUBLIC_DATA_BASE;

export async function GET(req) {
  await mongoose.connect(connectDB);

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  console.log(query);

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  const searchCriteria = {
    $or: [
      { title: new RegExp(query, "i") }, // case-insensitive search
      { brandName: new RegExp(query, "i") }, // case-insensitive search
      // Add other fields you want to search in the same way
    ],
  };

  try {
    const products = await product.find(searchCriteria);
    return NextResponse.json(products, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
