import { apiSlice } from "../services/apiSlice";


const InstructorsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
            getCourseStaticsPage:builder.query({
                query:({id}:{id:string})=>({
                    url:`instructor/courses/${id}/manage/`,
                    method:'GET',
                })
            }),

            getCourseSectionsAndContentPage:builder.query({
                query:({id}:{id:string})=>({
                    url:`instructor/courses/${id}/manage/sections/`,
                    method:'GET',
                })
            }),
        }) 
})
    
    
export const {
    useGetCourseStaticsPageQuery,
    useGetCourseSectionsAndContentPageQuery
} = InstructorsApiSlice