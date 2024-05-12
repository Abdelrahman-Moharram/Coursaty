import Link from 'next/link'
import React from 'react'
import ImageSkeleton from './ImageSkeleton';

interface lectureType{
    id: string;
    name: string;
    file: string;
    video: string
  }
  interface props{
    lecture: lectureType
  }

const VideoPlayer = ({lecture}:props) => {
  
  return (
    <div className='px-6'>
      <video controls width="100%">
            {
              process.env.NEXT_PUBLIC_HOST?
                <>
                  <source src={process.env.NEXT_PUBLIC_HOST+lecture.video} type="video/mp4" />
                  Download the
                  <Link href={process.env.NEXT_PUBLIC_HOST+lecture.video}>WEBM</Link>
                </>
              :
              null
            }

            
        </video>
    </div>
  )
}

export default VideoPlayer
