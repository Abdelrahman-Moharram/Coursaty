import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import CardBadge from './CardBadge';

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
    course:courseType
}

const CourseCard = ({course}:props) => {
  return (
    <a href={"/courses/"+course.id} className="shadow-xl group relative block overflow-hidden h-auto rounded-lg">
        <button
            className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
        >
            <span className="sr-only">Wishlist</span>
            {
                true?
                    <FaRegHeart />
                :
                    <FaHeart />
            }
        </button>

            <img
                src={process.env.NEXT_PUBLIC_HOST+course.image}
                alt={course.name}
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
            />

        <div className="relative border border-gray-100 bg-white p-6">
            <CardBadge title={course.category.name} href={'/categories/'+course.category.id} />

            <h3 className="mt-4 text-sm font-medium text-gray-900 truncate">{course.name}</h3>

            <p className="mt-1.5 text-xs text-gray-700 truncate-2 ">
            {
                course.description
            }
            </p>

            <div className="flex justify-between mt-4">
                <span className='text-sm text-right block my-4 font-bold'>
                {
                    course.price > 0?
                        course.price + " L.E"
                    : 
                        "Free"
                }
                </span>

                <button
                    className="flex gap-2 transition-all bg-primary hover:bg-primary-hover text-sm p-3 items-center text-white rounded-md"
                >
                    <FaCartPlus />
                    <span>
                        Add to Cart
                    </span>
                </button>
            </div>
        </div>
    </a>
  )
}

export default CourseCard