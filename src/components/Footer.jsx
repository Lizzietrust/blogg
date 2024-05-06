'use client'

import { navLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

const Footer = () => {
    const pathName = usePathname();
    
  return (
    <div className={`bg-[#2B2A2A] w-full ${pathName === '/auth/login' && 'hidden'} ${pathName === '/auth/register' && 'hidden'}`}>
      <div className='w-[90%] mx-auto'>
        <div className='pt-10 pb-20 border-b border-b-[#26BDD2] flex justify-between'>
            <div className='w-4/12'>
                <Link href='/'>
                    <Image src="/assets/BLOGG.png" alt="logo" priority width={166} height={60} className=' object-cover' />
                </Link>

                <p className='mt-8  text-sm leading-[17.07px] text-white mb-5'>
                    Lorem ipsum dolor sit amet consectetur. Rhoncus magna porttitor sed et vitae dolor. Duis nunc  lectus suspendisse accumsan consequat id. Commodo scelerisque urna donec volutpat imperdiet.
                </p>

                <form>
                    <div className='flex items-center w-[379px] h-[54px] rounded-[39px] border border-[#26BDD2] p-2 justify-between'>
                        <input 
                            type="text" 
                            placeholder='Email'
                            className='border-none outline-none bg-transparent placeholder:text-white placeholder:font-medium placeholder:text-lg'
                        />
                        <button 
                            className='w-[129px] h-10 rounded-3xl bg-[#26BDD2] font-medium text-lg text-white'
                        >
                            Subscribe
                        </button>
                    </div>
                </form>
            </div>

            <div className='flex justify-between w-2/5'>
                <div className='text-white'>
                    <p className='mb-3'>Quick Links</p>
                    <ul className='flex flex-col gap-1'>
                        {
                            navLinks.map(({link, name, i}) => (
                                <li key={i}>
                                    <Link href={link}>{name}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='text-white'>
                    <p className='mb-3'>Quick Links</p>
                    <ul className='flex flex-col gap-1'>
                        {
                            navLinks.map(({link, name, i}) => (
                                <li key={i}>
                                    <Link href={link}>{name}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>

        <div className='flex items-center justify-center pt-3 pb-6'>
            <Image src='/assets/ph_copyright-light.png' alt='copyright' width={18} height={18} priority className='mr-1' />
            <p className='text-white text-sm flex items-center gap-3'>
                <span className='font-medium'>2023</span> 
                <span className='font-semibold -ml-1 mr-2'>BLOGG</span>
                <span>All rights reserved</span>
                <a href="#" className='underline'>Privacy Policy</a>
                <a href="#" className='underline'>Terms of Service</a>
            </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
