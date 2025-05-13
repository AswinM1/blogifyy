"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function Dashboard() {
 type Blog = {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
  category?: string;
};

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const baseURL = process.env.URL;

        const res = await axios.get(`${baseURL}/myblog`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBlogs(res.data);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Blogs</h1>
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <ul className="flex flex-row flex-wrap gap-6">
          {blogs.map((blog) => (
            <li
              key={blog._id}
              onClick={() => router.push(`/dashboard/${blog._id}`)}
              className="cursor-pointer border p-4 rounded w-80 h-80 bg-amber-200 shadow-[4px_4px_0px_#000] hover:scale-105 transition-transform"
            >
              <h2 className="text-xl font-bold">{blog.title}</h2>
              <p className="text-gray-600">{blog.subtitle}</p>
              <p className="text-sm mt-2">{blog.category}</p>
              <p className="mt-2 text-sm text-gray-500">
                {blog.content.slice(0, 100)}...
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
