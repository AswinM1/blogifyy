"use client";
import React from 'react';
import Features from './Features';
import Hero from './Hero';

function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Hero />
      <Features></Features>
      
    </div>
  );
}

export default Home;