'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Popular = ({ item }) => {
  return (
    <Link href='/blog'>
      <div className='w-[452px] h-[504px]'>
        <div className='w-full h-[325px] relative'>
          <Image src={item.image} alt='' className='w-full h-full object-cover' fill /> 
        </div>

        <div className='pt-2'>
          <div className='flex items-center gap-6'>
              <div className='flex items-center gap-2'>
                  <Image src='/assets/eye-icon.png' alt='eye-icon' width={19} height={19} priority />
                  <p className='font-medium text-sm text-[#626060]'>views</p>
              </div>

              <div className='flex items-center gap-2'>
                  <div className='w-[5px] h-[5px] rounded-full bg-[#26BDD2]'></div>
                  <p className='font-medium text-sm text-[#626060]'>4 mins read</p>
              </div>

              <p className='font-medium text-sm text-[#626060]'>9/09/2023</p>
          </div>

          <div className='mt-4'>
              <h3 className='font-semibold text-[25px] text-[#2B2A2A] leading-[30px] mb-2'>{item.title}</h3>
              <p className='text-sm text-[#2B2A2A] leading-[19.6px]'>
                  {item.body}
              </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Popular
