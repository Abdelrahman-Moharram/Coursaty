import SmallCard from '@/Components/Cards/SmallCard'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <Link
            
            className="block rounded-xl border border-gray-100 p-4 shadow-lg hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
            href={'courses'}
        >
            <span className="inline-block rounded-lg bg-gray-50 p-1">
                
            </span>

            <h2 className="mt-2 font-bold">See All Courses</h2>

            
        </Link>
    </div>
  )
}

export default page
