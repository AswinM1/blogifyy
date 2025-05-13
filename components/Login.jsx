import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../Ellipse 1.svg';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  const fetchdata = async () => {
    try {
      const res = await axios.post('/api/login', {email, password});
      console.log(res.data);
      
      if(res.data.jwttoken) {
        localStorage.setItem('token', res.data.jwttoken);
      }
      router.push('/');
    }
    catch (error) {
      console.error(error);
      alert("Login failed. Check console.");
    }
  }   
  
  return (
    <div className="grid md:grid-cols-2 min-h-screen">
      {/* Left Side */}
      
      <div className="bg-yellow-300 h-screen flex justify-center items-center relative">
        <div className="relative bg-white p-8 border-2 border-black shadow-[6px_6px_0px_#000] w-80">
          <h1 className="text-black font-bold tracking-tight text-3xl mb-6">Login</h1>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="text"
              placeholder="Enter your email"
              className="w-full border-2 border-black py-2 px-3 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full border-2 border-black py-2 px-3 focus:outline-none"
              value={password}    
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button 
            onClick={fetchdata} 
            className="w-full border-2 border-black bg-black text-white font-bold py-3 px-4 shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition-all duration-200"
          >
            Login
          </button>
          
          <div className="mt-4 text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <a href="/signup" className="font-bold text-black underline">Sign up</a>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-white to-gray-100 h-screen">
        <motion.div
          className="relative mb-10"
          animate={{ 
            y: [0, -15, 0]  
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        >
          <div className="absolute -top-3 -left-3 w-full h-full bg-black rounded-full"></div>
          <div className="relative z-10">
            <Image
              src={logo.src}
              alt="Logo"
              width={120}
              height={120}
              className="bg-yellow-500 rounded-full border-2 border-black"
            />
          </div>
        </motion.div>
        
        <div className="relative ">
          <div className="absolute -top-2 -left-2 w-full h-full bg-black"></div>
          <p className="relative z-10 text-gray-800 text-xl italic font-bold text-center px-8 py-4 bg-white border-2 border-black">
            "A day without sunshine is like, you know, night"
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;