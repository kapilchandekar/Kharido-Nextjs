import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
  const token = request.cookies.get("token");
  const jwt_key = process.env.JWT_SECRET;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "No token found" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token.value, jwt_key);
    return NextResponse.json({ success: true, user: decoded });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 401 }
    );
  }
}
