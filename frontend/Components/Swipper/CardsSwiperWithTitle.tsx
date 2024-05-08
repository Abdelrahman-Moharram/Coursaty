import React from 'react'
import { Divider } from '@/Components/Common';
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

  return (
    <div>
        <Divider title={title} />
        <div className="my-10 px-3">
          <CardsSwiper courses={courses} />
        </div>
    </div>
  )
}

export default CardsSwiperWithTitle