import Link from 'next/link'
import React from 'react'
import CardBadge from './CardBadge'

interface categoryType{
    id: string;
    name: string;
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
      category: categoryType;
  }
interface props{
    course: courseType
}
const WideCard = ({course}:props) => {
    const created_date = () => {
        const date = new Date(course.created_at)
        return date.toDateString()
    }
  return (
    <Link href={"/courses/"+course.id} className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
        <div className="flex items-start gap-4 lg:gap-7">
            <div
                className="w-[20%] min-w-[100px]"
            >
                <img 
                    src={process.env.NEXT_PUBLIC_HOST+course.image} 
                    width="100%"
                    alt="" 
                />
            </div>

            <div>
            <CardBadge title={course.category.name} href={'/Categories/'+course.id} />

            <h3 className="mt-4 text-lg font-medium sm:text-xl">
                {course.name}
            </h3>

            <p className="mt-1 text-sm text-gray-700">
                {course.description}
            </p>

            <div className="mt-2">
                <div className="flex items-center gap-1 text-gray-500">
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>

                    <p className="text-xs font-medium">{created_date()}</p>

                    <span className="hidden sm:block" aria-hidden="true">&middot;</span>

                    <p className="text-xs font-medium text-gray-500 sm:mt-0">
                        <Link href={'/instructors/'+course.instructor.id} className='underline hover:text-black'>
                            {course.instructor.first_name + " " + course.instructor.last_name}
                        </Link>
                    </p>
                </div>

            </div>
            <div className='block text-end font-bold mt-3'>{course.price} L.E</div>
            </div>
        </div>
    </Link>
  )
}

export default WideCard
