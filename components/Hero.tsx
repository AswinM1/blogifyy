"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';  // Fixed the import from motion/react to framer-motion

function Hero() {
  const router = useRouter();
  
  const handleClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push("/dashboard");
    } else {
      router.push('/login');
    }
  };
  
  return (
    <section className="py-20 items-center justify-centers min-h-screen flex min-w-screen self-center">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-10 md:mb-0">
         <div className="absolute -z-10 inset-0 h-full w-full bg-[linear-gradient(to_right,#73737320_2px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] bg-[size:20px_20px]" />
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-black mb-6">
            Share Your Story With The World
          </h1>
          <p className="text-lg md:text-xl text-slate-700 mb-8">
            Create, publish, and share your thoughts with our intuitive blogging platform designed for writers of all levels.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              className="border-2 border-black px-8 py-3 rounded-md shadow-[5px_5px_0px_#000] font-semibold hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition-all duration-200"
              onClick={handleClick}
            >
              Start Writing Today
            </button>
            <button
              className="border-2 border-black bg-black text-white px-8 py-3 rounded-md shadow-[5px_5px_0px_#555] font-semibold hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#555] transition-all duration-200"
              onClick={() => router.push('/blogs')}
            >
              Explore Blogs
            </button>
          </div>
        </div>
        
        <motion.div 
          className="md:w-5/12"
          animate={{ 
            y: [0, -30, 0]  
          }}
          drag
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        >
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full bg-black rounded-lg"></div>
            <div className="relative z-10 bg-white p-6 rounded-lg border-2 border-black">
              <div className="w-full h-64 bg-yellow-300 shadow-inner shadow-black mb-4 rounded"></div>
              <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;