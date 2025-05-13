import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/connect/db";
import blog from "../model/Blog";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const body = await request.json();
    const { title, subtitle, category, content } = body;

    const newBlog = new blog({
      title,
      subtitle,
      category,
      content,
      userId: decoded.id, 
    });

    await newBlog.save();

    return NextResponse.json({ message: "Blog created" }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get Authorization header
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify and decode token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decoded.id;

    // Find blogs created by this user
    const blogs = await blog.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json(blogs, { status: 200 });

  } catch (err) {
    console.error("Error in GET /api/blog:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
