'use client'

import React from 'react'
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Image from 'next/image'


const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) router.replace("/");

  console.log(session?.user.email);
  
  
  return (
    <div className={`mt-28 w-[90%] mx-auto ${!session && 'hidden'}`}>
      <div className='flex items-center justify-between w-full'>
        <div className='flex items-center gap-3'>
          <Image src='/assets/profile-img.webp' alt='profile-image' width={228} height={228} className='rounded-full'  />
          <div>
            <h2 className='font-semibold text-[#2B2A2A] text-[41px]'>Jane Doe</h2>
            <p className='leading-[19.5px] text-[#2B2A2A] w-[70%]'>
              Lorem ipsum dolor sit amet consectetur. Ridiculus in tellus cras vitae donec pellentesque condimentum feugiat. Massa id vestibulum enim nunc netus aliquet id feugiat hac. Vel malesuada odio volutpat magna quis. Feugiat sodales cras diam dictum se
            </p>
          </div>
        </div>
        <button>Edit</button>
      </div>
    </div>
  )
}

export default Profile
