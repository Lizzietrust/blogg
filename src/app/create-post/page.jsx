'use client'

import React from 'react'
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Image from 'next/image'


const CreatePost = () => {
    const { data: session } = useSession();
    const router = useRouter();

    if (!session) router.replace("/");

    console.log(session);

  return (
    <div className={`mt-28 w-[90%] mx-auto mb-12 ${!session && 'hidden'}`}>
      <h1 className='font-semibold text-5xl text-[#2B2A2A]'>Create A New Blog</h1>

      <form className='w-full my-5 flex flex-col gap-6'>
        <div className='w-full flex flex-col gap-2'>
            <label htmlFor="" className='font-semibold text-lg text-[#2B2A2A]'>Title</label>
            <div className="flex w-full h-[52px] rounded border border-[#626060] items-center px-4 gap-2">
                <div className='w-7 flex items-center justify-center'>
                    <Image src="/assets/basil_edit-solid.png" alt="" width={24} height={24} />
                </div>
                <input type="text" className='calc_width h-full border-none outline-none placeholder:text-[#626060]' placeholder='Enter title here' />
            </div>
        </div>

        <div className='w-full flex flex-col gap-2'>
            <label htmlFor="" className='font-semibold text-lg text-[#2B2A2A]'>Tag</label>
            <div className="flex w-full h-[52px] rounded border border-[#626060] items-center px-4 gap-2">
                <div className='w-7 flex items-center justify-center'>
                    <Image src="/assets/mdi_tag.png" alt="" width={24} height={24} />
                </div>
                <input type="text" className='calc_width h-full border-none outline-none placeholder:text-[#626060]' placeholder='Enter tags here' />
            </div>
        </div>

        <div className='w-full flex flex-col gap-2'>
            <label htmlFor="" className='font-semibold text-lg text-[#2B2A2A]'>Image</label>
            <div className="flex w-full h-[52px] rounded border border-[#626060] items-center pl-4 gap-2">
                <div className='w-7 flex items-center justify-center'>
                    <Image src="/assets/ic_round-image.png" alt="" width={24} height={24} />
                </div>
                <div className="flex calc_width h-full relative">
                    <div className='w-[70%] h-full flex items-center text-[#626060]'>
                        Choose cover image from files
                    </div>
                    <div className='w-[30%] h-full flex items-center justify-center bg-[#26BDD2] font-medium text-lg text-white'>
                        Upload cover image 
                    </div>
                </div>
            </div>
        </div>

        <div className='w-full flex flex-col gap-2'>
            <label htmlFor="" className='font-semibold text-lg text-[#2B2A2A]'>Read Time</label>
            <div className="flex w-[229px] h-[52px] rounded border border-[#626060] items-center px-4 gap-2">
                <div className='w-7 flex items-center justify-center'>
                    <Image src="/assets/tdesign_time-filled.png" alt="" width={24} height={24} />
                </div>
                <input type="text" className='w-[160px] h-full border-none outline-none placeholder:text-[#626060]' placeholder='Enter read time' />
            </div>
        </div>

        <div className='w-full flex flex-col gap-2'>
            <label htmlFor="" className='font-semibold text-lg text-[#2B2A2A]'>Story</label>
            <textarea name="" id="" cols="30" rows="10" className='w-full h-[611px] rounded border border-[#626060] px-4 py-2 outline-none'>
            </textarea>
        </div>

        <div className="flex w-full gap-8">
            <button className='w-1/2 h-[50px] rounded-lg bg-[#26BDD2] font-medium text-lg text-white'>Publish</button>
            <button className='w-1/2 h-[50px] rounded-lg border border-[#26BDD2] font-medium text-lg'>Save to drafts</button>
        </div>
      </form>
    </div>
  )
}

export default CreatePost
