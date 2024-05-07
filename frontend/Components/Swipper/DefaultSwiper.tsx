import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Pagination, Navigation } from 'swiper/modules';

interface image{
  id: string
  image: string
  title: string | undefined
  description: string | undefined
}
interface props{
  isLoading: boolean
  images: image[]
}
const DefaultSwiper = ({isLoading, images}: props) => {
  return (
    <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
            clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"        
      >
          <>
            {
              images.map(({id, image, description, title})=>(
                <SwiperSlide key={id}>
                  <img 
                    className='inset-0 w-full object-cover h-[400px]'
                    src={process.env.NEXT_PUBLIC_HOST+image}
                  />
                </SwiperSlide>
              ))
            }
          </>        
      </Swiper>


  )
}

export default DefaultSwiper