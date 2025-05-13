"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../Ellipse 1.svg';
import { motion } from 'framer-motion';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('/api/signup', {
        email,
        password,
        confirmPassword,
      });

      console.log(res.data);

      router.push('/login');
      if (res.data.status === 'ok' || res.data.status === 200) {
      }
    } catch (error) {
      console.error(error);
      alert("Signup failed. Check console.");
    }
  };

  return (
    <div className='grid md:grid-cols-2'>
      {/* Left Side */}
      <div className='bg-neutral-900 h-screen flex justify-center items-center'>
        <div className='flex flex-col items-center'>
          <h1 className='text-white font-bold tracking-tight text-2xl mb-4'>Signup</h1>
          <input
            type='text'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='focus border border-white text-amber-50 mt-2 mb-4 py-1 px-2 rounded-sm bg-transparent'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='focus border border-white text-amber-50 py-1 px-2 rounded-sm bg-transparent mb-4'
          />
          <input
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='focus border border-white text-amber-50 py-1 px-2 rounded-sm bg-transparent mb-2'
          />
          <button
            onClick={handleSignup}
            className='text-black bg-white font-bold py-2 px-4 rounded mt-4 cursor-pointer'
          >
            Signup
          </button>
          <div className='text-white mt-3'>
            Already have an account?{' '}
            <Link href='/login'>
              <span className='underline ml-2 cursor-pointer'>Login</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='hidden md:flex flex-col items-center justify-center bg-gray-100 h-screen'>
        <motion.img
          src={logo.src}
          alt='Logo'
          className='w-30 h-30 mb-6 bg-blue-500'
          whileHover={{ rotate: 360 }}
          transition={{ duration: 1 }}
        />
        <p className='text-gray-700 text-lg italic font-bold text-center px-4'>
          "same same but different"
        </p>
      </div>
    </div>
  );
}

export default Signup;
