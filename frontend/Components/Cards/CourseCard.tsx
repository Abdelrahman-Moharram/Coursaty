import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

interface courseType{
    id: string,
    name: string,
    image: string,
    price: number,
    description: string,
    created_at: Date
}

interface props{
    course:courseType
}

const CourseCard = ({course}:props) => {
  return (
    <a href={"/courses/"+course.id} className="group relative block overflow-hidden h-auto rounded-lg">
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
            <span className="whitespace-nowrap bg-green-600 text-white px-2 rounded-md py-1 text-xs font-extralight"> New </span>

            <h3 className="mt-4 text-sm font-medium text-gray-900 truncate">{course.name}</h3>

            <p className="mt-1.5 text-sm text-gray-700">
                {
                    course.price >= 0?
                        course.price
                    : 
                        "Free"
                }
            </p>

            <form className="mt-4">
                <button
                    className="block w-full bg-primary text-white px-3 py-3 text-sm rounded-md font-medium transition hover:bg-transparent border-2 border-primary hover:text-primary"
                >
                    Add to Cart
                </button>
            </form>
        </div>
    </a>
  )
}

export default CourseCard