'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { signIn, useSession } from "next-auth/react";

const Login = () => {
    const [error, setError] = useState('');
    const router = useRouter();

    const { data: session, status: sessionStatus } = useSession();

    useEffect(() => {
      if (sessionStatus === "authenticated") {
        router.replace("/");
      }
    }, [sessionStatus, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const password = e.target[1].value;

        if (name.length < 6) {
          setError("Name should be 6 characters or more");
          return;
        }

        if (!password || password.length < 8) {
          setError("Password is invalid, password should be 8 characters or more");
          return;
        }

        const res = await signIn('credentials', {
          redirect: false,
          name,
          password,
        })

        if (res?.error) {
          setError("Invalid name or password");
          console.log(error);
          if (res?.url) router.replace("/");
        } else {
          setError("");
          console.log('User successfully logged in',);
        }
    }


  return (
    <div className='w-[55%] overflow-y-auto'>
      <div className='w-[80%] mx-auto my-14 pr-10'>
        <div className='flex flex-col items-center mb-8'>
          <Link href='/'>
            <Image src="/assets/logo.png" alt="logo" width={267} height={97}  priority />
          </Link>

          <h3 className='mt-8 font-medium text-2xl mb-4'>Welcome Back</h3>

          <p className='text-[#1E1E1E]'>Enter your name and password to log in with us</p>
        </div>

        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='w-full flex flex-col gap-2'>
            <label htmlFor="name" className='text-[#3E3E3E]'>Username</label>
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
            Sign In
          </button>
        </form>

        <div className=''>
          <div className='flex w-full items-center justify-between mb-6'>
            <hr className='w-[45%] border border-[#2B2A2A]' />
            <p className='text-[#2B2A2A]'>or</p>
            <hr className='w-[45%] border border-[#2B2A2A]' />
          </div>

          <p className='text-center mb-6'>Sign in with </p>

          <div className='flex items-center justify-between'>
            <Image src='/assets/facebook.png' alt='facebook-icon' width={108} height={72} priority className='cursor-pointer' onClick={() => {
              signIn("facebook");
            }} />

            <Image src='/assets/apple.png' alt='apple-icon' width={108} height={72} priority className='cursor-pointer'  />

            <Image src='/assets/google.png' alt='google-icon' width={108} height={72} priority className='cursor-pointer' onClick={() => {
              signIn("google");
            }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
