import { apiSlice } from "../services/apiSlice";


const CourseApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
            getAllCoursesPage:builder.query({
                query:({page, size}:{page:number, size:number})=>({
                    url:"/courses/",
                    method:'GET',
                    params:{page:page, size:size}
                })
            }),

            getCourseDetailsPage:builder.query({
                query:(id:string)=>({
                    url:`/courses/${id}/`,
                    method:'GET',
                })
            }),

            getCourseContent:builder.query({
                query:(id:string)=>({
                    url:`/courses/${id}/learn`,
                    method:'GET',
                })
            }),

            getUserCourses:builder.query({
                query:()=>({
                    url:`courses/user`,
                    method:'GET',
                })
            }),

            createCourse: builder.mutation({
                query:(form)=>{
                    
                    return {
                        url: `courses/`,
                        method: 'POST',
                        body: form,
                    }
                }
            })
            
    }) 
})


export const {
    useGetAllCoursesPageQuery,
    useGetCourseDetailsPageQuery,
    useGetCourseContentQuery,
    useGetUserCoursesQuery,
    useCreateCourseMutation
} = CourseApiSlice