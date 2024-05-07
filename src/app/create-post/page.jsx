'use client'

import React, { useState } from 'react'
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Form from '@/components/Form';


const CreatePost = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        title: '',
        tag: '',
        time: '',
        content: ''
    })

    // image: null,

    if (!session) router.replace("/");

    console.log(session);
    console.log('UserId:', session?.user.id);

    const createPost = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('/api/post/new', {
                method: 'POST',
                body: JSON.stringify({
                    title: post.title,
                    tag: post.tag,
                    time: post.time,
                    content: post.content,
                    userId: session?.user.id, 
                })
            })

            if(response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }
    }

  return (
    <div className={`mt-28 w-[90%] mx-auto mb-12 ${!session && 'hidden'}`}>
      <h1 className='font-semibold text-5xl text-[#2B2A2A]'>Create A New Blog</h1>

      <Form
        post={post}
        setPost={setPost}
        submitting={submitting}
        handlesubmit={createPost}
      />
    </div>
  )
}

export default CreatePost
