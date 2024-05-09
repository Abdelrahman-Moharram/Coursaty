import React from 'react'
import { Divider, ImageSkeleton } from '@/Components/Common';
import { CardsSwiper } from '@/Components/Swipper';

interface courseType{
    id: string,
    name: string,
    image: string,
    price: number,
    description: string,
    created_at: Date
}
interface props{
    courses:courseType[];
    title:string
}

const CardsSwiperWithTitle = ({courses, title}:props) => {
  const handleImageSkeleton = ()=>{
    let total = [];
    for(let i=0; i < 4; i ++)
        total.push(<ImageSkeleton key={i} width='340px' height='504px' rounded='10px' />)
    return total
  }
  return (
    <div>
        <Divider title={title} />
        <div className="my-10 px-3">
          {
            courses?.length?
              <CardsSwiper courses={courses} />
            :
            <div className="flex gap-3">
              {handleImageSkeleton()}
            </div>
          }
        </div>
    </div>
  )
}

export default CardsSwiperWithTitle