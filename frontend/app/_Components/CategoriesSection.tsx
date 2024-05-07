import Link from 'next/link';
import React from 'react'

interface industry{
    id:string;
    image: string;
    name:string;
    description:string
}

const CategoriesSection = ({industries}:{industries:industry[]}) => {
  return (
    <section>
    <div className="w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
        <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
            <h2 className="text-3xl font-bold sm:text-4xl">Learn without limits</h2>

            <p className="mt-4 text-gray-600">
                Start, switch, or advance your career with more than 7000 courses, Professional Certificates, and degrees from world-class universities and companies.
            </p>

            <a
                href="#"
                className="mt-8 inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-primary-hover focus:outline-none focus:ring focus:ring-yellow-400"
            >
                Get Started Today
            </a>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {
                industries && industries.length?
                    industries.map(industry=>(
                        <Link
                            key={industry.id}
                            className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                            href={"/industries/"+industry.id}
                        >
                            <span className="inline-block rounded-lg bg-gray-50 p-1">
                                <img 
                                    width={"40px"}
                                    src={process.env.NEXT_PUBLIC_HOST + industry.image} 
                                    alt={industry.name} 
                                />
                            </span>

                            <h2 className="mt-2 font-bold">{industry.name}</h2>

                            <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                                {industry.description}
                            </p>
                        </Link>
                    ))
                :
                    null
            }
            

            
        </div>
        </div>
    </div>
    </section>
  )
}

export default CategoriesSection