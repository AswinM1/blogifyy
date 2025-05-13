"use client";
import React, { useState } from 'react';
import axios from 'axios';

function Blog() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

  const handlePublish = async () => {
    if (!title || !subtitle || !content) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.URL;

      const res = await axios.post(`/api/blog`, {
        title,
        subtitle,
        category,
        content,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.status === 200 || res.status === 201) {
        alert("Blog published successfully!");
        setTitle('');
        setSubtitle('');
        setCategory('');
        setContent('');
      }
    } catch (err) {
      console.error(err);
      alert("Error publishing blog.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="relative mb-8">
        <div className="absolute -top-3 -left-3 w-full h-full bg-black"></div>
        <h1 className="relative z-10 bg-white text-3xl font-bold tracking-tight p-4 border-2 border-black">
          Write Your Blog
        </h1>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-2 border-black p-3 shadow-[4px_4px_0px_#000] focus:outline-none"
          />
        </div>

        <div className="relative">
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
          <input
            id="subtitle"
            type="text"
            placeholder="Enter your subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full border-2 border-black p-3 shadow-[4px_4px_0px_#000] focus:outline-none"
          />
        </div>

        <div className="relative">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category (optional)</label>
          <input
            id="category"
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border-2 border-black p-3 shadow-[4px_4px_0px_#000] focus:outline-none"
          />
        </div>

        <div className="relative">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            id="content"
            placeholder="Write your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border-2 border-black p-4 min-h-[300px] shadow-[4px_4px_0px_#000] focus:outline-none"
          />
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={handlePublish}
            className="border-2 border-black px-8 py-3 bg-black text-white font-bold shadow-[5px_5px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition-all duration-200"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}

export default Blog;
