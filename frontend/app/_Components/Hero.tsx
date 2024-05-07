import React from 'react'
import DefaultSwiper from '@/Components/Swipper/Swiper'
interface props{
  isLoading: boolean,
  images: string[]
}

const Hero = ({isLoading, images}: props) => {
  return (
    <div className="relative bg-hero-gradiant ">
        <DefaultSwiper isLoading={isLoading} images={images} />
    </div>
  )
}

export default Hero
