import { apiSlice } from "../services/apiSlice";


const InstructorsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
            getCourseStaticsPage:builder.query({
                query:({id}:{id:string})=>({
                    url:`instructor/courses/${id}/manage/`,
                    method:'GET',
                })
            }),
        }) 
})
    
    
export const {
    useGetCourseStaticsPageQuery
} = InstructorsApiSlice