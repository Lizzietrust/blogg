'use client'

import React, { useState } from 'react'
import Image from 'next/image'

const SavedPost = ({ item }) => {
    const [actionModal, setActionModal] = useState(false);

    const showActionModal = () => {
        setActionModal(!actionModal)
    }

  return (
    <div className='flex items-end w-full gap-4 relative'>
        <Image src={item.image} alt='' width={451} height={371} className='rounded-[6px] object-cover' />
        <div className='w-full'>
            <div className='w-full flex justify-end mb-10 absolute top-0 left-0'>
                <Image src='/assets/quill_meatballs.png' alt='' width={40} height={40} className='object-cover cursor-pointer' onClick={showActionModal} />
            </div>

            <div className='flex items-center gap-4 mb-5'>
                <div className='py-[7px] px-[9px] rounded-[5px] bg-[#26BDD2] text-white text-sm'>{item.tag}</div>
                <div className='flex items-center gap-1'>
                    <Image src='/assets/eye-icon.png' alt='eye-icon' width={19} height={19} priority />
                    <p className='font-medium text-sm text-[#626060]'>views</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className='w-[5px] h-[5px] bg-[#26BDD2] rounded-full'></div>
                    <span className='font-medium text-sm text-[#626060]'>4 mins read</span>
                </div>
                <span className='font-medium text-sm text-[#626060]'>9/09/2023</span>
            </div>

            <div>
                <h3 className='font-semibold text-[25px] text-[#2B2A2A] mb-4'>{item.title}</h3>
                <p className='text-[#626060] leading-[22.4px] mb-1'>{item.content}</p>
            </div>
        </div>

        {actionModal && (
            <div className='absolute top-12 right-0 w-[128px] h-[149.47px] rounded-[6px] p-4 flex flex-col gap-5 bg-white shadow-xl'>
                <div className='flex items-center gap-3 cursor-pointer'>
                    <Image src='/assets/fa_send.png' width={24} height={24} />
                    <p>Publish</p>
                </div>
                <div className='flex items-center gap-3 cursor-pointer'>
                    <Image src='/assets/basil_edit.png' width={24} height={24} />
                    <p>Edit</p>
                </div>
                <div className='flex items-center gap-3 cursor-pointer'>
                    <Image src='/assets/mdi_delete.png' width={21.47} height={21.47} />
                    <p>Delete</p>
                </div>
            </div>
        )}
    </div>
  )
}

export default SavedPost
