'use client'
import { Divider } from '@/Components/Common';
import CategoriesSection from './_Components/CategoriesSection';
import Hero from './_Components/Hero';
import { useGetIndexPageQuery } from '@/redux/api/homeApi';
import { CardsSwiper } from '@/Components/Swipper';



export default function Home() {
  const {data, isLoading} = useGetIndexPageQuery(undefined)
 
  return (
    <div className="lg:w-[80%] w-full mx-auto bg-white rounded-lg my-3 overflow-hidden">
      <div>
        <Hero images={data?.images} isLoading={isLoading} />
      </div>

      <CategoriesSection industries={data?.industries} />

      <div>
        <Divider title={"Top Courses"} />
        <div className="my-10 px-3">
          <CardsSwiper courses={data?.lowPricesCourses} />
        </div>
        
      </div>
    </div>
  );
}
