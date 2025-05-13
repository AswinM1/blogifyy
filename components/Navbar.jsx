'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

function Navbar() {
  const router = useRouter()
  const [login, setLogin] = useState(false)

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    setLogin(!!token)
  }, [])

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    localStorage.removeItem('token') // Clear token from localStorage
    setLogin(false)
    router.push('/login')
  }

  const handleLogin = () => {
    router.push('/login')
  }

  return (
    <motion.nav
    
      className="border-dashed  border-gray-300   text-black  w-full  bg-white border-2 px-6 py-4 flex  flex-row justify-between items-center"
    >
      <motion.div
      transition={{
        duration:0.4
      }}
      whileHover={
        {
            rotate:360
        }
       
      }
       className='font-extrabold  text-2xl tracking-tight cursor-pointer bg-amber-200'
      >
        BLOGIFY
      </motion.div>

      <motion.ul
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        className="flex space-x-6 text-sm font-sans items-center"
      >
        {/* Home & Write shown to all */}
        {['Home', 'create blog'].map((item) => (
          <motion.li
            key={item}
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Link
              href={item === 'Home' ? '/' : '/create'}
              className="text-neutral-800  hover:text-gray-500 transition text-xl py-2 px-2"
            >
              {item}
            </Link>
          </motion.li>
        ))}

       
        
          <motion.li
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Link
              href="/dashboard"
              className="text-black flex text-xl font-sm items-center space-x-2 hover:text-gray-800 transition"
            >
              <span>Profile</span>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600"
              />
            </Link>
          </motion.li>
    

        {/* Login or Logout button */}
        <motion.li
          variants={{
            hidden: { opacity: 0, y: -10 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {login ? (
            <button
              onClick={handleLogout}
              className="text-black hover:translate-x-2 transition hover:scale-90 font-semibold bg-amber-300 py-2 px-4 border border-black shadow-[4px_4px_0px_#000]" 
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="text-black  font-semibold text-xl  rounded-sm border px-3 py-2  bg-amber-300 shadow-[4px_4px_0px_#000] hover:scale-80 transition"
            >
              Login
            </button>
          )}
        </motion.li>
      </motion.ul>
    </motion.nav>
  )
}

export default Navbar
