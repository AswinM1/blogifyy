import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/app/connect/db';
import blog from '../model/Blog';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decoded.id;

    const userBlogs = await blog.find({ userId });

    return NextResponse.json(userBlogs, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Failed to fetch blogs' }, { status: 500 });
  }
}
