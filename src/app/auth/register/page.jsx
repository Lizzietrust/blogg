'use client';

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

const Register = () => {
    const [error, setError] = useState('');
    const router = useRouter();

    const isValidEmail = (email) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target[0].value;
        const username = e.target[1].value;
        const password = e.target[2].value;

        console.log(email, username, password);

        if (!isValidEmail(email)) {
          setError("Email is invalid");
          return;
        }

        if (username.length < 6) {
          setError("Username should be 6 characters or more");
          return;
        }

        if (!password || password.length < 8) {
          setError("Password is invalid, password should be 8 characters or more");
          return;
        }
    
        try {
          const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              username,
              password,
            }),    
          })
          if (res.status === 400) {
            setError("This username is already registered");
          }
          if (res.status === 200) {
            setError("");
            router.push("/auth/login");
          }    
        } catch (error) {
          setError("Error, try again");
          console.log(error);
        }
    }
    
  return (
    <div className='w-[55%] overflow-y-auto'>
      <div className='w-[80%] mx-auto my-14 pr-10'>
        <div className='flex flex-col items-center mb-8'>
          <Link href='/'>
            <Image src="/assets/logo.png" alt="logo" width={267} height={97}  priority />
          </Link>

          <h3 className='mt-8 font-medium text-2xl mb-4'>Join Blogg</h3>

          <p className='text-[#1E1E1E]'>Enter your email address to create an account with us</p>
        </div>

        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='w-full flex flex-col gap-2'>
            <label htmlFor="email" className='text-[#3E3E3E]'>Email Address</label>
            <input type="text" placeholder='name@example.com' className='w-full h-[54px] rounded-[5px] border py-[17px] px-[15px] border-[#BABABA] outline-none placeholder:text-[#BABABA]'required />
          </div>

          <div className='w-full flex flex-col gap-2'>
            <label htmlFor="username" className='text-[#3E3E3E]'>Username</label>
            <input type="text" placeholder='enter username' className='w-full h-[54px] rounded-[5px] border py-[17px] px-[15px] border-[#BABABA] outline-none placeholder:text-[#BABABA]' required />
          </div>

          <div className='w-full flex flex-col gap-2'>
            <label htmlFor="password" className='text-[#3E3E3E]'>Password</label>
            <div className='relative'>
              <input type="password" placeholder='password' className='w-full h-[54px] rounded-[5px] border py-[17px] px-[15px] border-[#BABABA] outline-none placeholder:text-[#BABABA]' required />
              <Image src='/assets/closed-eye.png' alt='closed-eye' width={17} height={15.03} priority className='absolute top-[40%] right-5 cursor-pointer z-10' />
              </div>
          </div>

          {error && 
            <p className='text-red-600 text-sm'>{error}</p>
          }

          <button className='w-full h-[58.05px] rounded-lg bg-[#26BDD2] my-8 font-medium text-lg text-white hover:outline-2 hover:outline-blue-600 hover:outline-double focus:outline-2 focus:outline-double focus:outline-blue-600' type='submit'>
            Sign Up
          </button>
        </form>

        <div className=''>
          <div className='flex w-full items-center justify-between mb-6'>
            <hr className='w-[45%] border border-[#2B2A2A]' />
            <p className='text-[#2B2A2A]'>or</p>
            <hr className='w-[45%] border border-[#2B2A2A]' />
          </div>

          <p className='text-center mb-6'>Sign up with </p>

          <div className='flex items-center justify-between'>
            <Image src='/assets/facebook.png' alt='facebook-icon' width={108} height={72} priority className='cursor-pointer' />

            <Image src='/assets/apple.png' alt='apple-icon' width={108} height={72} priority className='cursor-pointer' />

            <Image src='/assets/google.png' alt='google-icon' width={108} height={72} priority className='cursor-pointer' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register



