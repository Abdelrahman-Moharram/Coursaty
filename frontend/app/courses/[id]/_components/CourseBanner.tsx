import { ImageSkeleton } from '@/Components/Common';
import React from 'react'

interface props{
    image:string;
}
const CourseBanner = ({image}:props) => {
    
    return (
        <div className='w-[440px] h-auto'>
            {
            image?
                <img 
                    src={process.env.NEXT_PUBLIC_HOST+image}
                />
            :
                <ImageSkeleton width={'400px'} height={'225px'} />
            }
        </div>
      )
}

export default CourseBanner
