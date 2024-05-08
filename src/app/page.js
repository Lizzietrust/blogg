'use client'

import { mostRead, popularEnt, popularHealth, popularSports } from "@/constants";
import Image from "next/image";
import Link from "next/link"

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css'
import Popular from "@/components/Popular";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/post');

      const data = await response.json();
      setPosts(data);
    }
    
    fetchPosts();
  }, [])

  return (
    <div className="mt-28 overflow-x-hidden">
      <div className='w-full border-b border-b-[#26BDD2] mb-10'>
        <div className='w-[90%] mx-auto flex items-center justify-between pb-10'>
          <div className='flex-1'>
            <h1 className='font-bold text-[68px] leading-[81.6px] text-[#2B2A2A] mb-2 '>
              From You <br className='hidden lg:block' /> To The World
            </h1>
            <p className='text-lg leading-[25.2px] text-[#2B2A2A] mb-8 w-4/5'>
              Lorem ipsum dolor sit amet consectetur. Elementum diam volutpat ultrices nisi. Ligula eu aliquet sagittis sit. In justo lectus at rhoncus faucibus nulla sapien.
            </p>
            <Link 
              href='/register' className='w-[149px] h-[50px] rounded-lg bg-[#26BDD2] flex
                items-center justify-center font-medium text-lg text-white'
            >
              Get Started
            </Link>
          </div>

          <div className='w-[599px] h-[532.82px] relative flex items-center'>
            <Image src='/assets/Frame-10.png' alt='top-image' className='w-full h-full object-cover' fill />
          </div>
        </div>
      </div>

      <div className='w-full mb-10'>
        <div className='w-[90%] mx-auto flex justify-between gap-10'>
          <div className='flex-1'>
            <h2 className='font-semibold text-[34px] text-[#2B2A2A] mb-4'>Trending</h2>

            <div className='w-[634px] h-[439.14px] relative'>
              <Image src='/assets/Frame-13.png' alt='trending-image' className='w-full h-full' fill />
            </div>

            <div className='flex items-center gap-6 mt-4'>
              <div 
                className='w-[104px] h-[31px] rounded-[5px] bg-[#D22697] text-sm text-white flex items-center
                justify-center'
              >
                Self defence
              </div>

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
              <h3 className='font-semibold text-[25px] text-[#2B2A2A] mb-3'>The importance  of self defense: In teenagers</h3>
              <p className='text-sm text-[#2B2A2A] leading-[18.62px]'>
                Lorem ipsum dolor sit amet consectetur. Rhoncus magna porttitor sed et vitae dolor. Duis nunc lectus suspendisse accumsan consequat id. Commodo scelerisque urna donec volutpat imperdiet.
              </p>
            </div>
          </div>

          <div className='flex-1'>
            <h2 className='font-semibold text-[34px] text-[#2B2A2A] mb-4'>Most Read</h2>

            <div className='flex flex-col gap-10'>
              {
                mostRead.map(({image, tag, title, body, color, i}) => (
                  <div className='flex gap-6' key={i}>
                    <Image src={image} alt={tag} width={190} height={165} priority /> 
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

      <div className='w-full mb-10'>

        <div className='w-[90%] mx-auto mb-8'>
          <div className='flex items-center justify-start gap-6 mb-6'>
              <h2 className='font-semibold text-[34px] text-[#2B2A2A]'>Popular</h2>
              <div className='bg-[#6726D2] w-[111px] flex items-center justify-center h-[35px] rounded-[5px] text-sm text-white'>
                Sports
              </div>
          </div>
          <Swiper 
            slidesPerView={2.5}
            spaceBetween={20}
          >
            {
              popularSports.map((item, i) => (
                <SwiperSlide>
                  <Popular item={item} key={item.id} />
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
          >
            {
              popularHealth.map((item) => (
                <SwiperSlide>
                  <Popular item={item} key={item.id} />
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
          >
            {
              popularEnt.map((item, i) => (
                <SwiperSlide>
                  <Popular item={item} key={item.id} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>
    </div>
  );
}
