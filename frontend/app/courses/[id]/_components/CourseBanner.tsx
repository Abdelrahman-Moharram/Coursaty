import { ImageSkeleton } from '@/Components/Common';
import Image from 'next/image';
import React from 'react'

interface props{
    image:string;
}
const CourseBanner = ({image}:props) => {
    
    return (
        <div className='w-[440px] h-auto'>
            {
            image?
                <Image
                    width="0"
                    height="0"
                    sizes="100vw"
                    alt='banner image'
                    src={process.env.NEXT_PUBLIC_HOST+image}
                />
            :
                <ImageSkeleton width={'400px'} height={'225px'} />
            }
        </div>
      )
}

export default CourseBanner
