  'use client';
  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import Link from 'next/link';

  interface BlogType {
    _id: string;
    title: string;
    subtitle: string;
    category: string;
    content: string;
  }

  function Display() {
    const [data, setData] = useState<BlogType[]>([]);
    const [filteredData, setFilteredData] = useState<BlogType[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
       const res = await axios.get(`/api/blog`, {

          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTimeout(() => {
          setData(res.data);
          setFilteredData(res.data);
        }, 3000);
      } catch (err) {
        console.log('Error fetching blogs:', err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    useEffect(() => {
      const term = search.toLowerCase();
      const filtered = data.filter((blog) =>
        blog.title.toLowerCase().includes(term) ||
        blog.subtitle.toLowerCase().includes(term)
      );
      setFilteredData(filtered);
    }, [search, data]);

    const SkeletonCard = () => (
      <div className="border p-4 rounded animate-pulse space-y-2">
        <div className="h-5 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>
    );

    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Blogs</h2>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search blogs by title or subtitle..."
          className="mb-4 w-full px-3 py-2 border border-gray-300 rounded"
        />

        {loading ? (
          <div className="space-y-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <ul className="space-y-4">
            {filteredData.map((blog) => (
              <Link key={blog._id} href={`/blogs/${blog._id}`}>
                <li className="border p-4 rounded cursor-pointer hover:bg-gray-50 transition">
                  <h3 className="text-lg font-semibold">{blog.title}</h3>
                  <p className="text-gray-600">{blog.subtitle}</p>
                  <p className="text-sm mt-2">{blog.category}</p>
                  <p className="mt-2 text-sm text-gray-500">
                    {blog.content.length > 100
                      ? blog.content.slice(0, 100) + '...'
                      : blog.content}
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    );
  }

  export default Display;
