'use client'
import React from 'react'
import { useGetCourseStaticsPageQuery } from '@/redux/api/Instructor'
import { useParams } from 'next/navigation'
import BaseChart from '@/Components/charts/BaseChart'

const page = () => {
  const {id}:{id:string} = useParams()
  const {data} = useGetCourseStaticsPageQuery({id})
  
  return (
    <div>
      <div className="grid grid-cols-2 h-screen">
        <div className="">
          {data?.course?.name}
        </div>
        <div className="p-3">
          <BaseChart x_label='years' x={data?.purchasing_histroy?.years} y={data?.purchasing_histroy?.numbers} />
        </div>
      </div>
    </div>
  )
}

export default page
