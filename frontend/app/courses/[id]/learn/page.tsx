'use client'
import { ImageSkeleton, Spinner } from '@/Components/Common'
import CustomedSpinner from '@/Components/Common/CustomedSpinner'
import VideoPlayer from '@/Components/Common/VideoPlayer'
import CourseContentList from '@/Components/Lists/CourseContentList'
import { useGetCourseContentQuery } from '@/redux/api/Courses'
import { useParams, usePathname, useSearchParams, useRouter, notFound } from 'next/navigation'

import React from 'react'

interface contentType{
  id: string;
  name: string;
  file: string;
  video: string
}

interface sectionType{
  id: string;
  content_set: contentType[]
}

const page = () => {
    const {id}:{id:string} = useParams()
    const searchParams = useSearchParams()
    const {data} = useGetCourseContentQuery(id)
    const router = useRouter()
    const pathname = usePathname()
    
    if(!searchParams.get('lecture') || !searchParams.get('section')){
      setTimeout(()=>{
        router.push(pathname + `?section=${data?.sections[0].id}&lecture=${data?.sections[0].content_set[0].id}`)
        if(!data?.sections[0].content_set[0].id)
          notFound();
      },1000)      
    }
    const section = data?.sections.filter((section:sectionType)=>(
      section.id === searchParams.get('section')
    ))[0]
    
    const lecture = section?.content_set?.filter((content:contentType)=>content.id === searchParams.get('lecture'))[0] 

    
    
  return (
    <div>
      <div className="grid grid-cols-10  h-[calc(100vh-64px)]">
        <div className="md:col-span-8 col-span-10 sm:col-span-10"> 
        {
          lecture?
            <VideoPlayer lecture={lecture} />
          :
            <CustomedSpinner />
        }
        </div>
        {
          section?.id ?
            <div className="md:col-span-2 block mx-3">
                <CourseContentList section_id={section?.id} sections={data?.sections} />
            </div>
          :null
        }
      </div>
    </div>
  )
}

export default page
