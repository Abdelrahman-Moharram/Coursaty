import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Pagination, Navigation } from 'swiper/modules';

import { CourseCard } from '@/Components/Cards';
import { Divider } from '@/Components/Common';

interface courseType{
    id: string,
    name: string,
    image: string,
    price: number,
    description: string,
    created_at: Date
}

interface props{
    courses: courseType[],
}
const ScrollableCoursesList = ({courses}: props) => {
  return (
    <>
      
      {
        courses && courses.length > 0
            ?
          <Swiper
              slidesPerView={3.5}
              breakpoints={{
                      480: {
                      slidesPerView: 1,
                      spaceBetween: 30
                      },
                  
                      640: {
                      slidesPerView: 2,
                      spaceBetween: 40
                      },
                      1024:{
                      slidesPerView: 3,
                      spaceBetween: 40
                      }
                      ,
                      1280:{
                      slidesPerView: 4,
                      spaceBetween: 40
                      }
                      
              }}
              spaceBetween={30}
              loop={true}
              pagination={{
                  clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"        
              >
              
              { 
              courses.map((course)=>(
                  <SwiperSlide key={course?.id}>
                      <CourseCard course={course}  />
                  </SwiperSlide>
                  ))
              }
          </Swiper>
      :null
    }
    </>


  )
}

export default ScrollableCoursesList