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
            addCourseContent:builder.mutation({
                query:({course_id, section_id, name}:{course_id:string, section_id:string, name:string})=>({
                    url:`instructor/courses/${course_id}/manage/sections/${section_id}/`,
                    method:'POST',
                    body: {name: name}
                })
            }),

            editCourseContent:builder.mutation({
                query:({content_id, form}:{content_id:string, form:FormData})=>({
                    url:`instructor/contents/${content_id}/edit/`,
                    method:'POST',
                    body: form
                })
            }),
        }) 
})
    
    
export const {
    useGetCourseStaticsPageQuery,
    useGetCourseSectionsAndContentPageQuery,
    useDeleteCourseContentMutation,
    useAddCourseContentMutation,
    useEditCourseContentMutation
} = InstructorsApiSlice