'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Popular = ({ item }) => {
    console.log('Image:', item.imageUrl);
  return (
    <div className='md:w-[452px] w-full md:h-[530px] h-[600px]'>
      <div className='w-full h-[325px] relative object-cover'>
        <Image src={item.imageUrl} alt='' className='w-full h-full' fill /> 
      </div>

      <div className='pt-2'>
        <div className='flex items-center gap-6'>
            <div className='flex items-center gap-2'>
                <Image src='/assets/eye-icon.png' alt='eye-icon' width={19} height={19} priority />
                <p className='font-medium text-sm text-[#626060]'>views</p>
            </div>

            <div className='flex items-center gap-2'>
                <div className='w-[5px] h-[5px] rounded-full bg-[#26BDD2]'></div>
                <p className='font-medium text-sm text-[#626060]'>{item.time} read</p>
            </div>

            <p className='font-medium text-sm text-[#626060]'>9/09/2023</p>
        </div>

        <div className='mt-4'>
            <h3 className='font-semibold text-[25px] text-[#2B2A2A] leading-[30px] mb-2'>{item.title}</h3>
            <p className='text-sm text-[#2B2A2A] leading-[19.6px]'>
                {item.content}
            </p>
        </div>
      </div>
    </div>
  )
}

export default Popular
