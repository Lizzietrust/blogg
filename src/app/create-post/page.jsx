'use client'

import React, { useState } from 'react'
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Form from '@/components/Form';
import Link from 'next/link';


const CreatePost = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [modal, setModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [draftText, setDraftText] = useState(false);
    const [post, setPost] = useState({
        title: '',
        tag: '',
        time: '',
        content: ''
    })

    if (!session) router.replace("/");

    console.log(session);
    console.log('UserId:', session?.user.id);

    const createPost = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const uploadedImage = localStorage.getItem('uploadedImage');

            const response = await fetch('/api/post/new', {
                method: 'POST',
                body: JSON.stringify({
                    title: post.title,
                    tag: post.tag,
                    time: post.time,
                    content: post.content,
                    userId: session?.user.id, 
                    imageUrl: uploadedImage
                })
            })

            if(response.ok) {
                setModal(true);
            }
        }
        catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }
    }

    const handleSave = async () => {
        setLoading(true);

        try {
            const uploadedImage = localStorage.getItem('uploadedImage');

            const response = await fetch('/api/drafts/new', {
                method: 'POST',
                body: JSON.stringify({
                    title: post.title,
                    tag: post.tag,
                    time: post.time,
                    content: post.content,
                    userId: session?.user.id, 
                    imageUrl: uploadedImage
                })
            })

            if(response.ok) {
                setModal(true);
                setDraftText(true);
            }
        }
        catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className={`mt-28 w-[90%] mx-auto mb-12 relative ${!session && 'hidden'}`}>
      <h1 className='font-semibold text-5xl text-[#2B2A2A]'>Create A New Blog</h1>

      <Form
        post={post}
        setPost={setPost}
        submitting={submitting}
        handlesubmit={createPost}
        handleSave={handleSave}
        loading={loading}
      />

      {modal && (
        <div className='absolute bottom-6 left-0 flex items-center justify-center w-full h-[80vh]'>
            <div className="w-[643px] h-[486px] rounded-[13px] bg-white shadow-2xl p-20 flex items-center justify-center flex-col gap-12">
                <Image src='/assets/image-removebg.png' alt='' width={233.72} height={143.96} />
                <span className='font-semibold text-[25px] leading-[30.48px] text-center'>{`${draftText ? 'Your work has been saved to drafts' : 'Your work has been successfully published'}`}</span>
                <div className="flex w-full gap-12">
                    <Link href='/profile' className='w-1/2 h-[49px] rounded bg-[#26BDD2] font-semibold text-[17px] text-white flex items-center justify-center'>Continue</Link>
                    <Link href='/' className='w-1/2 h-[49px] rounded bg-transparent font-semibold text-[17px] text-[#2B2A2A] flex items-center justify-center'>Back to Home</Link>
                </div>
            </div>
        </div>
      )}  
    </div>
  )
}

export default CreatePost
