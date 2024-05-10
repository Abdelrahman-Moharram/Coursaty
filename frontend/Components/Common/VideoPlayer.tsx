import Link from 'next/link'
import React from 'react'

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
    <div>
      <video controls width="250">

            <source src={process.env.NEXT_PUBLIC_HOST+lecture} type="video/mp4" />

                Download the
            <Link href={process.env.NEXT_PUBLIC_HOST+lecture}>WEBM</Link>
            
        </video>
    </div>
  )
}

export default VideoPlayer
