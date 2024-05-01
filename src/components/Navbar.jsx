'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { navLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from "next-auth/react";
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const pathName = usePathname();
  const [dropdown, setDropdown] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { data: session } = useSession();
  
  console.log(session);
  
  const showDropdown = () => {
    setDropdown(!dropdown)
  }

  const profilePicture = useSelector((state) => state.profilePicture.profilePicture);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0])
  }

  return (
    <div className={`${pathName === '/auth/login' && 'hidden'} ${pathName === '/auth/register' && 'hidden'} w-full h-20 fixed top-0 left-0 bg-white border-b border-[#26BDD2] flex items-center z-50`}>
      <div className="flex h-full mx-auto w-[90%] items-center justify-between">
        <Link href='/'> 
            <Image src="/assets/nav-logo.png" alt="logo" priority width={166} height={60} className='object-cover w-auto h-auto' />
        </Link>

        <ul className='flex items-center gap-12'>
            {
                navLinks.map(({link, i, name}) => (
                    <li className={`text-lg font-medium text-[#2B2A2A] ${pathName === link && 'border-b border-b-[#2B2A2A]'}`} key={link}>
                        <Link href={link}>{name}</Link>
                    </li>
                ))
            }
        </ul>

        {session ? (
          <div className='flex items-center gap-2'>
            <Link href='/profile'>
              {profilePicture ? (
                <Image src={profilePicture} alt='profile-image' width={46} height={46} className='rounded-full border-2 border-[#26BDD2]'/>
              ) : (
                <Image src='/assets/profile-img.webp' alt='profile-image' width={46} height={46} className='rounded-full border-2 border-[#26BDD2]'/>
              )}
            </Link>
            <Image src='/assets/Expand_down.png' alt='dropdown' width={24} height={24} className={`${pathName !== '/profile' && 'hidden'} cursor-pointer`}  onClick={showDropdown} />
          </div>
        ) : (
          <div className='flex items-center gap-12'>
            <Link 
                href='/auth/register' className='w-[149px] h-[50px] rounded-lg bg-[#26BDD2] flex
                  items-center justify-center font-medium text-lg text-white'
            >
                Get Started
            </Link>
            <Link href='/auth/login' className='mr-12 text-[#2B2A2A] font-medium text-lg'>Sign In</Link>
          </div>
        )}
      </div>
      
      {dropdown && session && pathName === '/profile'  && (
        <div className='absolute top-[90px] right-[10%] w-[198px] h-[130px] rounded-[6px] shadow-xl bg-white p-3 flex flex-col items-start justify-start gap-3'>
          <div className='flex items-center gap-2 cursor-pointer w-full'>
            <Image src='/assets/camera-icon.png' alt='camera-image' width={21.47} height={21.47} />
            <p className='text-[#292929]'>Edit Profile Picture</p>
          </div>

          <div className='flex items-center gap-2 cursor-pointer w-full'>
            <Image src='/assets/delete-icon.png' alt='camera-image' width={21.47} height={21.47} />
            <p className='text-[#E00017]'>Log Out</p>
          </div>

          <Link href='create-post' className='flex items-center gap-2 cursor-pointer w-full'>
            <Image src='/assets/create-post.png' alt='plus-image' width={21.47} height={21.47} className='object-cover' />
            <p>Create Post</p>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Navbar
