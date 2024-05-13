'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

const SavedPost = ({ item, handleEdit, handleDelete, addPublish, handlePublish }) => {
    const [actionModal, setActionModal] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    const showActionModal = () => {
        setActionModal(!actionModal)
    }

    const timestamp = item.createdAt;

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();
    
        const paddedDay = day < 10 ? `0${day}` : day;
        const paddedMonth = month < 10 ? `0${month}` : month;
    
        const formattedDate = `${paddedDay}/${paddedMonth}/${year}`;
    
        return formattedDate;
    };
    
    const formattedDate = formatDate(timestamp);

    const editPostLogic = () => {
        setActionModal(false);
        handleEdit()
    }

    const deletePostLogic = () => {
        setActionModal(false);
        handleDelete()
    }

  return (
    <div className='flex items-end w-full gap-6 relative'>
        <div className="w-[35%] h-[371px] object-cover relative">
            <Image src={item.imageUrl} alt='' className='rounded-[6px] w-full h-full' fill />
        </div>

        <div className='w-[65%]'>
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
                    <span className='font-medium text-sm text-[#626060]'>{item.time} read</span>
                </div>
                <span className='font-medium text-sm text-[#626060]'>{formattedDate}</span>
            </div>

            <div>
                <h3 className='font-semibold text-[25px] text-[#2B2A2A] mb-4'>{item.title}</h3>
                <p className='text-[#626060] leading-[22.4px] mb-1'>{item.content}</p>
            </div>
        </div>
        
        {actionModal && (
            <div className={`${addPublish && 'h-[149.47px]'} absolute top-14 right-0 w-[128px] h-28 rounded-[6px] p-4 flex flex-col gap-5 bg-white shadow-xl`}>
                {addPublish && (
                    <div className='flex items-center gap-3 cursor-pointer' onClick={handlePublish}>
                        <Image src='/assets/fa_send.png' width={24} height={24} />
                        <p>Publish</p>
                    </div>
                )}
                <div className='flex items-center gap-3 cursor-pointer' onClick={editPostLogic}>
                    <Image src='/assets/basil_edit.png' width={24} height={24} />
                    <p>Edit</p>
                </div>
                <div className='flex items-center gap-3 cursor-pointer' onClick={deletePostLogic}>
                    <Image src='/assets/mdi_delete.png' width={21.47} height={21.47} />
                    <p>Delete</p>
                </div>
            </div>
        )}
    </div>
  )
}

export default SavedPost



