'use client'

import { mostRead, popularEnt, popularHealth, popularSports } from "@/constants";
import Image from "next/image";
import Link from "next/link"

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, A11y,Navigation } from "swiper/modules";
import 'swiper/swiper-bundle.css'
import Popular from "@/components/Popular";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await fetch('/api/post');

  //     const data = await response.json();
  //     setPosts(data);
  //   }
    
  //   fetchPosts();
  // }, [])

  // console.log(posts);

  return (
    <div className="mt-28 overflow-x-hidden">
      <div className='w-full border-b border-b-[#26BDD2] mb-10'>
        <div className='md:w-[90%] mx-auto flex items-center justify-between pb-10 px-6 md:px-0'>
          <div className='flex-1'>
            <h1 className='font-bold md:text-[68px] text-[36px] md:leading-[81.6px] leading-[48px] text-[#2B2A2A] mb-2 text-center md:text-left'>
              From You <br className='hidden lg:block' /> To The World
            </h1>
            <p className='text-lg leading-[25.2px] text-[#2B2A2A] mb-8 md:w-4/5 text-center md:text-left'>
              Lorem ipsum dolor sit amet consectetur. Elementum diam volutpat ultrices nisi. Ligula eu aliquet sagittis sit. In justo lectus at rhoncus faucibus nulla sapien.
            </p>
            {!session &&(
            <Link 
              href='/auth/register' className='md:w-[149px] w-full h-[50px] rounded-lg bg-[#26BDD2] flex
                items-center justify-center font-medium text-lg text-white'
            >
              Get Started
            </Link>)}
          </div>

          <div className='w-[599px] h-[532.82px] relative md:flex items-center hidden'>
            <Image src='/assets/Frame-10.png' alt='top-image' className='w-full h-full object-cover' fill />
          </div>
        </div>
      </div>

      <div className='w-full md:mb-10 mb-16'>
        <div className='md:w-[90%] px-6 md:px-0 mx-auto md:flex justify-between gap-10'>
          <div className='flex-1'>
            <h2 className='font-semibold text-[34px] text-[#2B2A2A] mb-4 text-center md:text-left'>Trending</h2>

            <div className='md:w-[634px] w-full md:h-[439.14px] h-[300px] relative object-cover'>
              <Image src='/assets/Frame-13.png' alt='trending-image' className='w-full h-full' fill />
            </div>

            <div className='flex items-center gap-6 mt-4'>
              <div 
                className='w-[104px] h-[31px] rounded-[5px] bg-[#D22697] text-sm text-white flex items-center
                justify-center'
              >
                Self defence
              </div>

              <div className='md:flex items-center gap-2 hidden'>
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
              <h3 className='font-semibold text-[25px] text-[#2B2A2A] mb-3 text-center md:text-left'>The importance  of self defense: In teenagers</h3>
              <p className='text-sm text-[#2B2A2A] leading-[18.62px] text-center md:text-left'>
                Lorem ipsum dolor sit amet consectetur. Rhoncus magna porttitor sed et vitae dolor. Duis nunc lectus suspendisse accumsan consequat id. Commodo scelerisque urna donec volutpat imperdiet.
              </p>
            </div>
          </div>

          <div className='flex-1 mt-10 md:mt-0'>
            <h2 className='font-semibold text-[34px] text-[#2B2A2A] mb-4 text-center md:text-left'>Most Read</h2>

            <div className='flex flex-col gap-10'>
              {
                mostRead.map(({image, tag, title, body, color, i}) => (
                  <div className='flex flex-col md:flex-row gap-6' key={i}>
                    <div className='md:w-[190px] w-full md:h-[190px] h-[300px] relative object-cover md:hidden block'>
                      <Image src={image} alt={tag} className='w-full h-full' fill />
                    </div>
                    <Image src={image} alt={tag} width={190} height={165} priority className="hidden md:block" /> 
                    <div>
                      <div className='flex items-center justify-between gap-8 mb-3'>
                        <div 
                          className='w-[110px] h-[31px] rounded-[5px] text-sm text-white flex items-center
                          justify-center'
                          style={{backgroundColor: `${color}`}}
                        >
                          {tag}
                        </div>

                        <div className='flex items-center gap-2'>
                          <div className='w-[5px] h-[5px] rounded-full bg-[#26BDD2]'></div>
                          <p className='font-medium text-sm text-[#626060]'>4 mins read</p>
                        </div>

                        <p className='font-medium text-sm text-[#626060]'>9/09/2023</p>
                      </div>

                      <h4 className='font-semibold text-lg leading-[21.94px] text-[#2B2A2A] mb-2'>{title}</h4>

                      <p className='text-sm leading-[18.62px] text-[#2B2A2A]'>
                        {body}
                      </p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>

      {/* <div className='w-full mb-10'>
        <div className='md:w-[90%] mx-auto mb-8 px-6 md:px-0'>
          <h2 className='font-semibold text-[34px] text-[#2B2A2A]'>Posts</h2>
          <Swiper 
            slidesPerView={2.5}
            spaceBetween={20}
            grabCursor={true}
            modules={[Pagination, Navigation, A11y]}
            pagination={{ clickable: true }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              480: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              1600: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
            }}
          >
            {
              posts.map((item, i) => (
                <SwiperSlide key={i}>
                  <Popular item={item} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div> */}

      <div className='w-full mb-10'>

        <div className='md:w-[90%] mx-auto mb-8 px-6 md:px-0'>
          <div className='flex items-center justify-start gap-6 mb-6'>
              <h2 className='font-semibold text-[34px] text-[#2B2A2A]'>Popular</h2>
              <div className='bg-[#6726D2] w-[111px] flex items-center justify-center h-[35px] rounded-[5px] text-sm text-white'>
                Sports
              </div>
          </div>
          <Swiper 
            slidesPerView={2.5}
            spaceBetween={20}
            grabCursor={true}
            modules={[Pagination, Navigation, A11y]}
            pagination={{ clickable: true }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              480: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              1600: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
            }}
          >
            {
              popularSports.map((item, i) => (
                <SwiperSlide key={i}>
                  <Popular item={item} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>

        <div className='w-[90%] mx-auto mb-8'>
          <div className='flex items-center justify-start gap-6 mb-6'>
              <h2 className='font-semibold text-[34px] text-[#2B2A2A]'>Popular</h2>
              <div className='bg-[#26D22D] w-[111px] flex items-center justify-center h-[35px] rounded-[5px] text-sm text-white'>
                Health Care
              </div>
          </div>
          <Swiper 
            slidesPerView={2.5}
            spaceBetween={20}
            grabCursor={true}
            modules={[Pagination, Navigation, A11y]}
            pagination={{ clickable: true }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              480: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              1600: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
            }}
          >
            {
              popularHealth.map((item) => (
                <SwiperSlide key={item.id}>
                  <Popular item={item} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>

        <div className='w-[90%] mx-auto'>
          <div className='flex items-center justify-start gap-6 mb-6'>
              <h2 className='font-semibold text-[34px] text-[#2B2A2A]'>Popular</h2>
              <div className='bg-[#D2A126] w-[158px] font-medium flex items-center justify-center h-[35px] rounded-[5px] text-sm text-white'>
                Entertainment
              </div>
          </div>
          <Swiper 
            slidesPerView={2.5}
            spaceBetween={20}
            grabCursor={true}
            modules={[Pagination, Navigation, A11y]}
            pagination={{ clickable: true }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              480: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              1600: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
            }}
          >
            {
              popularEnt.map((item, i) => (
                <SwiperSlide key={item.id} >
                  <Popular item={item}/>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>
    </div>
  );
}
