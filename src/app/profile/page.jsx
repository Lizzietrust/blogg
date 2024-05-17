'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import SavedPost from '@/components/SavedPost';
import { useSelector } from 'react-redux';


const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [tab, setTab] = useState('published')
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [userDrafts, setUserDrafts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const postsPerPage = 6;


  if (!session) router.replace("/");

  console.log(session);

  const profilePicture = useSelector((state) => state.profilePicture.profilePicture)

  useEffect(() => {
    const fetchUserPosts = async () => {
      setLoading(true);
      const response = await fetch(`/api/users/${session?.user.id}/posts`);

      const data = await response.json();
      setUserPosts(data);
      setLoading(false);
    }

    if (session?.user.id) fetchUserPosts();
  }, []);

  useEffect(() => {
    const fetchUserDrafts = async () => {
      setFetching(true);
      const response = await fetch(`/api/users/${session?.user.id}/drafts`);

      const data = await response.json();
      setUserDrafts(data);
      setFetching(false);
    }

    if (session?.user.id) fetchUserDrafts();
  }, []);

  const handlePublish = async (item) => {
    try {

      const response = await fetch('/api/post/new', {
          method: 'POST',
          body: JSON.stringify({
              title: item.title,
              tag: item.tag,
              time: item.time,
              content: item.content,
              userId: item.creator, 
              imageUrl: item.imageUrl
          })
      })

      if(response.ok) {
        router.push('/')
      }

      // if (response.ok) {
      //   const updatedResponse = await fetch(`/api/users/${session?.user.id}/posts`);
      //   const updatedData = await updatedResponse.json();
      //   console.log('data:', updatedData);
        
      //   setUserPosts(updatedData);
      //   router.push('/');
      // }
    }
    catch (error) {
        console.log(error);
    }
  }

  console.log('drafts:', userDrafts);

  const handleEdit = (item) => {
    router.push(`/edit-post?id=${item._id}`);
  }

  const handleDelete = async (item) => {
    const hasConfirmed = confirm('Are you sure you want to delete this post?');

    if (hasConfirmed) {
      try {
        await fetch(`/api/post/${item._id.toString()}`, {
          method: 'DELETE'
        })

        const filteredPosts = posts.filter((post) => post._id !== item._id);
        setPosts(filteredPosts);
        router.push('/');
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleDraftEdit = (item) => {
    router.push(`/edit-draft?id=${item._id}`);
  }

  const handleDraftDelete = async (item) => {
    const hasConfirmed = confirm('Are you sure you want to delete this post?');

    if (hasConfirmed) {
      try {
        await fetch(`/api/drafts/${item._id.toString()}`, {
          method: 'DELETE'
        })

        const filteredPosts = posts.filter((post) => post._id !== item._id);
        setPosts(filteredPosts);
        router.push('/');
      } catch (error) {
        console.log(error);
      }
    }
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userPosts.slice(indexOfFirstPost, indexOfLastPost);
  console.log('posts:', userPosts);
  console.log('posts:', currentPosts);

  const pagesNum = Math.ceil(userPosts.length / postsPerPage);
  const numbers = [...Array(pagesNum + 1).keys()].slice(1);

  // if (currentPosts.length === 0 && userDrafts.length === 0) {
  //   setLoading(false)
  // }

  const prevPage = () => {
    if(currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const changePage = (num) => {
    setCurrentPage(num)
  }

  const nextPage = () => {
    if(currentPage !== pagesNum) {
      setCurrentPage(currentPage + 1)
    }
  }

  
  return (
    <div className={`mt-28 md:w-[90%] px-6 md:px-0 mx-auto mb-12 ${!session && 'hidden'}`}>
      <div className='md:flex items-center justify-between w-full'>
        <div className='flex md:flex-row flex-col items-center gap-4'>
          {profilePicture ? (
            <Image src={profilePicture} alt='profile-image' width={228} height={228} className='rounded-full' />
          ) : (
            <Image src='/assets/profile-img.webp' alt='' width={228} height={228} className='rounded-full' />
          )}
          <div className='flex flex-col gap-3 md:items-start items-center'>
            <h2 className='font-semibold text-[#2B2A2A] text-[41px]'>{session?.user.name}</h2>
            <p className='leading-[19.5px] text-[#2B2A2A] md:w-3/5'>
              Lorem ipsum dolor sit amet consectetur. Ridiculus in tellus cras vitae donec pellentesque condimentum feugiat. Massa id vestibulum enim nunc netus aliquet id feugiat hac. Vel malesuada odio volutpat magna quis. Feugiat sodales cras diam dictum se
            </p>
            <div className="flex items-center gap-2">
              <span className='font-medium text-lg text-[#808080]'>15,000 views</span>
              <div className='w-[3px] h-[3px] bg-[#26BDD2] rounded-full'></div>
              <span className='font-medium text-lg text-[#808080]'>{currentPosts.length} Published</span>
            </div>
          </div>
        </div>
        <button className='md:w-28 w-full mt-6 md:mt-0 md:h-8 h-12 rounded-lg border border-[#26BDD2] font-medium text-[#2B2A2A]'>Edit</button>
      </div>

      <div>
        <div className="flex my-10 items-center pb-2 border-b-[3px] border-[rgb(38,189,210)] w-[322px]">
          <div className={`h-[45px] cursor-pointer w-[161px] rounded-tl-[15px] rounded-tr-[15px] flex items-center justify-center text-[#2B2A2A] font-semibold text-2xl ${tab === 'published' && 'bg-[#26BDD2] text-white'}`} onClick={() => setTab('published')}>
            Published
          </div>

          <div className={`h-[45px] cursor-pointer w-[161px] rounded-tl-[15px] rounded-tr-[15px] flex items-center justify-center text-[#2B2A2A] font-semibold text-2xl ${tab === 'drafts' && 'bg-[#26BDD2] text-white'}`} onClick={() => setTab('drafts')}>
            Drafts
          </div>
        </div>

        {tab === 'published' && (
          <div>
            {loading ? (
              'Loading...'
            ) : (
              <div className='flex flex-col gap-10'>
                {currentPosts.map((item) => (
                  <SavedPost item={item} key={item._id}  
                    handleEdit={() => handleEdit(item)}
                    handleDelete={() =>handleDelete(item)}
                  />
                ))}
              </div>
            )}

            {!loading || currentPosts && (
              <ul className='flex list-none items-center justify-center mt-10 gap-8'>
                <li onClick={prevPage} className={`cursor-pointer font-semibold text-[25px] ${currentPage === 1 &&'text-[#808080] cursor-default'}`}>
                  Previous
                </li>
                <div className='flex items-center justify-center gap-3'>
                  {numbers.map((num, i) => (
                    <li key={i} className={`${currentPage === num && 'text-black cursor-default'} cursor-pointer text-[25px] text-[#808080]`} onClick={() => changePage(num)}>
                      {num}
                    </li>
                  ))}
                </div>
                <li onClick={nextPage} className={`cursor-pointer font-semibold text-[25px] ${currentPage === pagesNum &&'text-[#808080] cursor-default'}`}>
                  Next
                </li>
              </ul>
            )}
          </div>
        )}

        {tab === 'drafts' && (
          <div>
            {fetching ? (
              'Loading...'
            ) : (
              <div className='flex flex-col gap-10'>
                {userDrafts.map((item) => (
                  <SavedPost item={item} key={item._id} 
                    addPublish
                    handlePublish={() => handlePublish(item)}
                    handleEdit={() => handleDraftEdit(item)}
                    handleDelete={() =>handleDraftDelete(item)}
                  />
                ))}
              </div>
            )}

            {/* {!loading && (
              <ul className='flex list-none items-center justify-center mt-10 gap-8'>
                <li onClick={prevPage} className={`cursor-pointer font-semibold text-[25px] ${currentPage === 1 &&'text-[#808080] cursor-default'}`}>
                  Previous
                </li>
                <div className='flex items-center justify-center gap-3'>
                  {numbers.map((num, i) => (
                    <li key={i} className={`${currentPage === num && 'text-black cursor-default'} cursor-pointer text-[25px] text-[#808080]`} onClick={() => changePage(num)}>
                      {num}
                    </li>
                  ))}
                </div>
                <li onClick={nextPage} className={`cursor-pointer font-semibold text-[25px] ${currentPage === pagesNum &&'text-[#808080] cursor-default'}`}>
                  Next
                </li>
              </ul>
            )} */}
          </div>
        )}
      </div> 
    </div>
  )
}

export default Profile


// {publishedPosts.map((item, i) => (
//   <SavedPost item={item} key={i} />
// ))}

