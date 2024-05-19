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

            deleteCourseContent:builder.mutation({
                query:({content_id}:{content_id:string})=>({
                    url:`instructor/contents/${content_id}/delete/`,
                    method:'DELETE',
                })
            }),
        }) 
})
    
    
export const {
    useGetCourseStaticsPageQuery,
    useGetCourseSectionsAndContentPageQuery,
    useDeleteCourseContentMutation
} = InstructorsApiSlice