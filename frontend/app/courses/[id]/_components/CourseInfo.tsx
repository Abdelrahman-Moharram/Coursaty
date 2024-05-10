import Breadcrumb from '@/Components/Common/Breadcrumb';
import ButtonLink from '@/Components/Common/ButtonLink';
import InfoSkeleton from '@/Components/Common/InfoSkeleton'
import { GrMoney } from "react-icons/gr";
import React from 'react'

interface IndustryType{
    id: string;
    name: string;
  }
  interface categoryType{
    id: string;
    name: string;
    industry:IndustryType
  }
interface subcategoryType{
    id: string;
    name: string;
    category:categoryType
  }
  
  interface userType{
    id: string;
    first_name: string;
    last_name: string;
  }
  interface courseType{
      id: string,
      name: string,
      image: string,
      price: number,
      description: string,
      created_at: Date,
      instructor: userType;
      subcategory: subcategoryType;
  }
interface props{
    course:courseType
}
interface item{
    href: string;
    title: string;
    icon?: string | undefined
}
const CourseInfo = ({course}:props) => {
    const BreadcrumbList = ():item[] | undefined =>{
        if(course)
            return[
                {href:"/industries/"+course.subcategory.category.industry.id, title:course.subcategory.category.industry.name},
                {href:"/categories/"+course.subcategory.category.id, title:course.subcategory.category.name},
                {href:"/subcategories/"+course.subcategory.id, title:course.subcategory.name},
            ]
    }   
    return (
        <div>
            
            {
                course?.name?
                    <div>
                        <h2 className='text-[20px] text-primary font-bold'>{course?.name}</h2>
                        <div className="flex text-gray-600 hover:text-gray-500 text-[13px] mb-3">
                            <Breadcrumb items={BreadcrumbList()} />
                        </div>
                        
                        {
                            course?.price?
                            <div className='mb-7'>
                                <p className='text-[17px]'> {course?.price} EGP</p>
                                <ButtonLink href=''> <GrMoney /> Buy Now</ButtonLink>
                            </div>
                            :null
                        }
                        
        
                        <p>
        
                            {course?.description}
                        </p>
                    </div>
                :
                <InfoSkeleton />
            }
            </div>
      )
}


export default CourseInfo