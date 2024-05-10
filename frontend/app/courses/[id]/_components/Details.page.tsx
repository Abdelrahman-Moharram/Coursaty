'use client'
import { useGetCourseDetailsPageQuery } from '@/redux/api/Courses'
import React from 'react'
import CourseBanner from './CourseBanner'
import CourseInfo from './CourseInfo'
import Breadcrumb from '@/Components/Common/Breadcrumb'
import CourseContentList from '@/Components/Lists/CourseContentList'
import { Divider } from '@/Components/Common'

interface props{
    id:string
}

const DetailsPage = ({id}:props) => {

    const {data, isLoading} = useGetCourseDetailsPageQuery(id)
   console.log(data?.course?.section_set);
   
  return (
    <div className="px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 gap-5 place-items-center mb-5">
            <CourseBanner image={data?.course?.image} />
            <CourseInfo course={data?.course} />
        </div>
        <hr className='w-[80%] mx-auto my-14'/>
        <div className='w-[80%] mx-auto'>
            <CourseContentList sections={data?.course?.section_set} />
        </div>
    </div>
  )
}

export default DetailsPage
