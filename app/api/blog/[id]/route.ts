import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../connect/db'; // Adjust path if necessary
import Blog from '../../model/Blog';             // Adjust path if necessary

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    await connectDB();

    const { id } = context.params;
    
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ message: 'Invalid blog ID' }, { status: 400 });
    }
    
    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    
    // More specific error handling
    if (error instanceof Error && error.name === 'CastError') {
      return NextResponse.json({ message: 'Invalid blog ID format' }, { status: 400 });
    }
    
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}