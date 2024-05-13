'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const Form = ({ post, setPost, submitting, handlesubmit, handleSave, loading }) => {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const pathName = usePathname();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleUploadImage = () => {
        if (image) {
          localStorage.setItem('uploadedImage', imageUrl);
        }
    };

  return (
    <form className='w-full my-5 flex flex-col gap-6' onSubmit={handlesubmit}>
        <div className='w-full flex flex-col gap-2'>
            <label htmlFor="" className='font-semibold text-lg text-[#2B2A2A]'>Title</label>
            <div className="flex w-full h-[52px] rounded border border-[#626060] items-center px-4 gap-2">
                <div className='w-7 flex items-center justify-center'>
                    <Image src="/assets/basil_edit-solid.png" alt="" width={24} height={24} />
                </div>
                <input type="text" className='calc_width h-full border-none outline-none placeholder:text-[#626060]' placeholder='Enter title here' value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value})}  />
            </div>
        </div>

        <div className='w-full flex flex-col gap-2'>
            <label htmlFor="" className='font-semibold text-lg text-[#2B2A2A]'>Tag</label>
            <div className="flex w-full h-[52px] rounded border border-[#626060] items-center px-4 gap-2">
                <div className='w-7 flex items-center justify-center'>
                    <Image src="/assets/mdi_tag.png" alt="" width={24} height={24} />
                </div>
                <input type="text" className='calc_width h-full border-none outline-none placeholder:text-[#626060]' placeholder='Enter tags here' value={post.tag} onChange={(e) => setPost({ ...post, tag: e.target.value})}  />
            </div>
        </div>

        <div className={`${pathName === '/edit-post' || pathName === '/edit-draft' && 'hidden'} w-full flex flex-col gap-2`}>
            <label htmlFor="" className='font-semibold text-lg text-[#2B2A2A]'>Image</label>
            <div className="flex w-full h-[52px] rounded border border-[#626060] items-center pl-4 gap-2">
                <div className='w-7 flex items-center justify-center'>
                    <Image src="/assets/ic_round-image.png" alt="" width={24} height={24} />
                </div>
                <div className="flex calc_width h-full relative">
                    <div className='w-[70%] h-full flex items-center text-[#626060]'>
                        Choose cover image from files
                    </div>
                    <div className='w-[30%] h-full flex items-center justify-center bg-[#26BDD2] font-medium text-lg text-white cursor-pointer hover:bg-opacity-25 focus:bg-opacity-50' onClick={handleUploadImage}>
                        Upload cover image 
                    </div>

                    <input type="file" accept="image/*" className='absolute top-0 left-0 w-[70%] h-full z-50 opacity-0' onChange={handleImageChange} />
                </div>
            </div>
        </div>

        <div className='w-full flex flex-col gap-2'>
            <label htmlFor="" className='font-semibold text-lg text-[#2B2A2A]'>Read Time</label>
            <div className="flex w-[229px] h-[52px] rounded border border-[#626060] items-center px-4 gap-2">
                <div className='w-7 flex items-center justify-center'>
                    <Image src="/assets/tdesign_time-filled.png" alt="" width={24} height={24} />
                </div>
                <input type="text" className='w-[160px] h-full border-none outline-none placeholder:text-[#626060]' placeholder='Enter read time' value={post.time} onChange={(e) => setPost({ ...post, time: e.target.value})}  />
            </div>
        </div>

        <div className='w-full flex flex-col gap-2'>
            <label htmlFor="" className='font-semibold text-lg text-[#2B2A2A]'>Story</label>
            <textarea name="" id="" cols="30" rows="10" className='w-full h-[611px] rounded border border-[#626060] px-4 py-2 outline-none' value={post.content} onChange={(e) => setPost({ ...post, content: e.target.value})}  >
            </textarea>
        </div>

        <div className="flex w-full gap-8">
            <button type='submit' className={`${pathName === '/edit-post' || pathName === '/edit-draft' && 'w-full'} w-1/2 h-[50px] rounded-lg bg-[#26BDD2] font-medium text-lg text-white`}>{submitting ? 'Loading...' : pathName === '/edit-post' || pathName === '/edit-draft' ? 'Edit': 'Publish'}</button>
            <button type='button' className={`${pathName === '/edit-post' || pathName === '/edit-draft' && 'hidden'} w-1/2 h-[50px] rounded-lg border border-[#26BDD2] font-medium text-lg`} onClick={handleSave}>{submitting ? 'Loading...' : pathName === '/edit-post' ? 'Edit': 'Save to drafts'}</button>
        </div>
    </form>
  )
}

export default Form
