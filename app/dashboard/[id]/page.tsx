"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlog(res.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="min-h-screen flex justify-center  p-6">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-2 text-center">{blog.title}</h1>
        <h2 className="text-lg text-gray-700 mb-2 text-center">{blog.subtitle}</h2>
        <p className="text-sm mb-4 text-gray-600 text-center">{blog.category}</p>
        <p className="text-base text-gray-800 text-justify">{blog.content}</p>
      </div>
    </div>
  );
}
export default BlogDetail;
