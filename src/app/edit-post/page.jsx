'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@/components/Form';
import { useSession } from 'next-auth/react';

const EditPost = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [submitting, setSubmitting] = useState(false);
    const { data: session } = useSession();
    const [post, setPost] = useState({
        title: '',
        tag: '',
        time: '',
        content: ''
    })

    const postId = searchParams.get('id');
    console.log('postId:', postId);

    useEffect(() => {
        const getPostDetails = async () => {
            const response = await fetch(`/api/post/${postId}`);
            const data = await response.json();

            setPost({
                title: data.title,
                content: data.content,
                tag: data.tag,
                time: data.time
            })
        }
        
        if(postId) getPostDetails()
    }, [postId]);

    const editPost = async (e) => {
        e.preventDefault();
        setSubmitting(true);
  
        if(!postId) return alert('Post ID not found!')
  
        try {
          const response = await fetch(`/api/post/${postId}`, {
              method: "PATCH",
              body: JSON.stringify({
                title: post.title,
                content: post.content,
                tag: post.tag,
                time: post.time,
              }),
          });
    
          if (response.ok) {
            router.push("/profile");
          }
        } catch (error) {
          console.log(error);
        } finally {
          setSubmitting(false);
        }
      }

  return (
    <div className={`mt-28 w-[90%] mx-auto mb-12 ${!session && 'hidden'}`}>
      <h1 className='font-semibold text-5xl text-[#2B2A2A]'>Edit Blog</h1>

      <Form
        post={post}
        setPost={setPost}
        submitting={submitting}
        handlesubmit={editPost}
      />
    </div>
  )
}

export default EditPost
