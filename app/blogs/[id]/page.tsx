'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface BlogType {
  _id: string;
  title: string;
  subtitle: string;
  category: string;
  content: string;
}

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get<BlogType>(`http://localhost:3000/api/blog/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (!blog) return <p className="p-6 text-center">Blog not found</p>;

  return (
    <div className=" flex max-w-4xl mx-auto p-6 text-center justify-center border-dotted">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-lg text-gray-600 mb-2">{blog.subtitle}</p>
      <p className="text-sm mb-4 text-gray-500 italic">{blog.category}</p>
      <div className="text-md text-gray-800 whitespace-pre-wrap">{blog.content}</div>
    </div>
  );
}
