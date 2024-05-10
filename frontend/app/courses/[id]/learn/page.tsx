'use client'
import VideoPlayer from '@/Components/Common/VideoPlayer'
import CourseContentList from '@/Components/Lists/CourseContentList'
import { useGetCourseContentQuery } from '@/redux/api/Courses'
import { useParams, usePathname, useSearchParams, useRouter } from 'next/navigation'

import React from 'react'

interface contentType{
  id: string;
  name: string;
  file: string;
  video: string
}
const page = () => {
    const {id}:{id:string} = useParams()
    const searchParams = useSearchParams()
    const {data, isLoading} = useGetCourseContentQuery(id)
    const router = useRouter()
    const pathname = usePathname()
    
    if(!searchParams.get('lecture_id') && data?.sections.length > 0){      
     router.push(pathname + '?lecture_id=' + data?.sections[0].content_set[0].id)
    }
    const lecture = data?.sections?.content_set?.filter((content:contentType)=>(
          content.id === searchParams.get('lecture_id')
        )
    )
    console.log(searchParams.get('lecture_id'));
    console.log(lecture);
    
  return (
    <div>
      <div className="grid grid-cols-10 h-screen">
        <div className="md:col-span-8 col-span-10 sm:col-span-10 bg-green-300"> 
        {
          lecture?
            <VideoPlayer lecture={lecture} />
          :null
        }
        </div>
        
        <div className="md:col-span-2 block bg-green-10 mx-3">
            <CourseContentList sections={data?.sections} />
        </div>
      </div>
    </div>
  )
}

export default page
